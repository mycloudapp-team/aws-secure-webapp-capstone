# Security

Status: **Built** 

Related documents: [Architecture](architecture.md) · [Network Plan](network-plan.md) · [Decision Log](decisions-log.md) · [Deployment](deployment.md) · [Cost Management](cost-management.md) · [Test Matrix](test-matrix.md)

## 1. Purpose and scope

This document defines the security controls for the MyCloudApp Restaurant Ordering System on AWS, explains why each exists, and records how each will be verified.

In scope: AWS account access, network exposure, TLS, origin protection, EC2 hardening, IAM, the GitHub-to-AWS deployment path, secrets handling, logging and incident response.

Out of scope: backend, database, real authentication and real payments. These are excluded from the project (Decision 001). Because the application collects no real payment or sensitive personal data, the main security goals are **protecting the infrastructure, preventing unauthorised access to the origin, and keeping credentials out of the repository.**

A control is described here as a requirement. It is not claimed as working until tested.

## 2. Security objectives

1. Users reach the site only through CloudFront over HTTPS.
2. The ALB accepts traffic only from our CloudFront distribution.
3. EC2 instances accept traffic only from the ALB, and have no inbound SSH.
4. No long-lived AWS credentials exist in GitHub, the repository or on instances.
5. Every IAM identity has the minimum permissions it needs.
6. Security-relevant events are logged and unusual behaviour raises an alarm.
7. Security claims in the application UI and presentation are backed by tests.

## 3. Assets and trust boundaries

| Asset | Why it matters |
|---|---|
| AWS account (root and IAM users) | Full control of all resources and billing |
| GitHub repository and Actions workflows | Source of code that is deployed; can assume the AWS deploy role |
| IAM deploy role (GitHub OIDC) | Can change what runs on EC2 |
| EC2 instances | Serve the application; hold an instance role |
| CloudFront secret header value | Proves a request came through our distribution |
| Customer-entered demo data | Stored only in the visitor's browser (localStorage); not sent to a server |

Trust boundaries: Internet → CloudFront → ALB → EC2, and GitHub → AWS (OIDC). Each crossing has an access control described below.

## 4. Account and identity

| Control | Requirement |
|---|---|
| Root user | MFA enabled; no access keys; not used for daily work. Credentials held by the project coordinator only |
| Team access | Individual IAM users or IAM Identity Center users, one per person. No shared logins |
| MFA | Required for every human user |
| Permissions | Grant per role (for example infrastructure vs read-only) rather than administrator for everyone. If broad access is needed during setup, record it and remove it later |
| Access keys | Avoid creating them. If one is unavoidable, record why, store it outside Git, and delete it after use |
| Group membership | Changes recorded in the [decision log](decisions-log.md) (for example `capstone-infra`, `capstone-monitoring`) |
| Billing access | Limited to the cost owner and reviewer |

## 5. Network and edge controls

Exact rules are in [network-plan.md](network-plan.md). Summary of intent:

| Layer | Control | Purpose |
|---|---|---|
| CloudFront | Redirect HTTP to HTTPS for viewers; minimum TLS version set to a current policy | Encrypt user traffic |
| CloudFront | Response headers policy adding security headers (for example HSTS, X-Content-Type-Options, X-Frame-Options or CSP frame-ancestors, Referrer-Policy) | Reduce common browser-side risks. Test the CSP so the React app still works |
| ALB security group | Inbound only from the CloudFront origin-facing managed prefix list | Block direct internet access to the ALB |
| ALB listener rule | Forward only requests carrying the secret CloudFront header; default action returns 403 | Stop other CloudFront distributions using our origin |
| EC2 security group | Inbound TCP 80 only from `alb-sg`; no inbound SSH | Only the ALB can reach Nginx |
| Admin access | AWS Systems Manager Session Manager | No open port 22, no SSH keys to manage |
| Subnets | Public subnets with no NAT Gateway (cost decision) | Instances have public IPs, so the security group is the main protection. See risk S-3 |

**Open decision O-1 (see [architecture.md](architecture.md)):** the CloudFront → ALB protocol. If HTTP is used, traffic on that hop is not encrypted and `alb-sg` inbound must be TCP 80 rather than 443 as currently written in network-plan.md. If HTTPS is used, a custom domain and an ACM certificate on the ALB are required. Whichever is chosen must be stated honestly in the presentation and the status cards.

### 5.1 TLS and certificates

- CloudFront viewer certificate for a custom domain: ACM, **us-east-1**.
- ALB listener certificate (only if the origin uses HTTPS): ACM, in the ALB's Region (also us-east-1 here).
- Without a custom domain, viewers use the default `*.cloudfront.net` certificate.
- ACM public certificates renew automatically when DNS validation remains in place.

### 5.2 Secret origin header

- CloudFront adds a custom origin header with a long random value, for example one generated with `openssl rand -hex 32` (run locally).
- The ALB listener rule matches that header; requests without it get 403.
- The value is **never committed to Git** and is not shown in slides or screenshots.
- Rotation: add a second accepted value on the ALB, update CloudFront, then remove the old value. Rotate if the value is exposed.

## 6. EC2 hardening

| Control | Requirement |
|---|---|
| IMDSv2 | Require IMDSv2 (`HttpTokens=required`) on every instance |
| Instance role | Attached role grants only what is needed: Systems Manager core access and CloudWatch agent logging/metrics. No S3, IAM or admin permissions |
| Patching | Use a current Amazon Linux AMI; apply updates at launch and before the demo |
| EBS | Encryption enabled |
| Nginx | Serve the static build only; `server_tokens off`; no directory listing; run as the non-root `nginx` user |
| Services | Install only what is needed; no database or application server on the instance |
| Outbound | `ec2-sg` allows outbound TCP 443 only (updates, SSM, CloudWatch). If package installs from HTTP repositories fail, fix the cause rather than opening all outbound traffic |
| SSH | Not installed or enabled for access; no key pair attached unless there is a recorded reason |

## 7. CI/CD security (GitHub to AWS)

| Control | Requirement |
|---|---|
| Authentication | GitHub Actions assumes an IAM role through **OIDC**. No `AWS_ACCESS_KEY_ID` or secret key stored in GitHub |
| Trust policy | Restricted to this repository and the deployment branch (see example below) |
| Permissions | Deploy role may only do what deployment needs (for example send SSM commands to tagged instances, read target health). No `*` on all resources |
| Workflow permissions | Set `permissions:` explicitly in each workflow; grant `id-token: write` only to the deploy job |
| Branch protection | Require pull request review and passing checks before merge to `main`; restrict who can push to `main` |
| Environments | Use a GitHub Environment with required reviewers for the production deploy job if practical |
| Third-party actions | Prefer official actions; pin versions (a full commit SHA is the strictest option) |
| Dependencies | Enable Dependabot or equivalent, and run `npm audit` in the pipeline; triage findings rather than ignoring them |
| Secret scanning | Enable GitHub secret scanning and push protection if available for the repository |
| Logs | Do not echo secrets or tokens in workflow output |

### 7.1 Example trust policy (replace placeholders)

Filename: stored in AWS IAM (not in a secrets file). Keeping a copy in `infra/iam/github-oidc-trust.json` is fine because it contains no secrets. Account ID, organisation and repository must be filled in from your real values.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:<ORG_OR_USER>/<REPO>:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

The `sub` condition is what stops other repositories or branches from assuming the role. If you use a GitHub Environment, the `sub` value takes the environment form instead; confirm the exact format in the GitHub documentation before applying. The permissions policy and workflow will be provided in [deployment.md](deployment.md).

## 8. Secrets and data handling

- No passwords, AWS credentials, private keys, API keys, tokens or the secret header value in source code, issues, Trello cards, screenshots or chat.
- `.gitignore` excludes `.env*`, `*.pem`, `*.key` and local build credentials before the first commit.
- Frontend code is public once served. Anything placed in a Vite environment variable that is bundled into the build is visible to every visitor, so never put a secret there.
- If a secret is committed: treat it as compromised, revoke or rotate it immediately, then remove it from the repository. Deleting it in a later commit does not remove it from history.
- Checkout data is demo-only and stays in the visitor's browser. The UI must state that checkout and tracking are simulated (Decision 001).

## 9. Logging and monitoring

| Source | What | Where |
|---|---|---|
| CloudFront | Standard or access logs (optional; requires an S3 bucket and has a cost) | Decide with [cost-management.md](cost-management.md) |
| ALB | Access logs (optional; requires an S3 bucket) | As above |
| Nginx | Access and error logs | CloudWatch Logs via the agent, limited retention |
| CloudTrail | Management events (the default event history is available without extra setup) | Review for IAM and security group changes |
| CloudWatch alarms | Unhealthy targets, ALB 5xx, EC2 status checks | Notifications to at least two team emails |

Logging that needs an S3 bucket adds a bucket to the architecture. Do that only if the team decides it is worth it, and record it in the decision log.

## 10. Incident response (basic)

1. **Detect:** alarm, budget alert, GitHub notification or a team member's observation.
2. **Report:** post in the team channel and create a Trello card labelled Security and High priority.
3. **Contain:** the smallest safe step. Examples: remove an exposed rule from a security group, disable a compromised IAM user or access key, disable the deploy role's trust policy, rotate the secret header.
4. **Investigate:** use CloudTrail event history, ALB and Nginx logs.
5. **Recover:** redeploy a known-good commit; restore the original rules.
6. **Record:** cause, timeline, fix and lessons in the card and the retrospective.

Do not delete logs or resources that are needed for investigation until the reviewer agrees.

## 11. Verification checklist (complete in Phase 3)

| # | Check | Expected | Evidence |
|---|---|---|---|
| 1 | Root user MFA enabled; no root access keys | Confirmed in IAM console | |
| 2 | Every human IAM user has MFA | Confirmed in IAM credential report | |
| 3 | `curl -I http://<cloudfront-domain>` | Redirects to HTTPS | |
| 4 | Request to the ALB DNS name without the secret header | 403 or connection refused | |
| 5 | Request to the ALB DNS name with the correct header, bypassing CloudFront | Success only in the controlled test, then not repeatable by the public | |
| 6 | Request to EC2 public IP on port 80 | Times out | |
| 7 | `ec2-sg` has no inbound rule from 0.0.0.0/0 and no port 22 rule | Confirmed in console | |
| 8 | Instance metadata options | IMDSv2 required | |
| 9 | Session Manager connects to an instance | Works with no inbound SSH | |
| 10 | Deploy role trust policy | Role cannot be assumed from another repository or branch | |
| 11 | Repository secret scan | No credentials or keys found in history | |
| 12 | Security headers present on a CloudFront response | Headers returned as configured | |
| 13 | Alarm for unhealthy target tested | Alarm fires and notification received | |

## 12. Risk register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| S-1 | Credentials committed to GitHub | Medium | High | `.gitignore`, secret scanning, review, OIDC instead of keys | <name> |
| S-2 | Other CloudFront distributions reach the ALB (prefix list is shared) | Medium | Medium | Secret header check on the ALB | <name> |
| S-3 | EC2 has a public IP, so a mistake in `ec2-sg` exposes it directly | Low | High | Security group review and test 6 and 7 before sign-off; consider private subnets plus NAT or VPC endpoints later if budget allows | <name> |
| S-4 | CloudFront to ALB traffic unencrypted (if HTTP chosen) | Depends on O-1 | Medium | Use HTTPS with a custom domain, or document the limitation | <name> |
| S-5 | Over-broad IAM permissions granted during setup and left in place | Medium | High | Review before each phase closes; remove temporary admin access | <name> |
| S-6 | GitHub OIDC role assumable from unintended repos or branches | Low | High | Strict `sub` condition; test 10 | <name> |
| S-7 | Unpatched instance | Medium | Medium | Current AMI, update before demo | <name> |
| S-8 | Secret header value leaked | Low | Medium | Keep out of Git and slides; rotation procedure | <name> |
| S-9 | Status cards in the UI claim security features that were not tested | Medium | Medium (credibility) | Cards show "verified" only after the matching check passes | <name> |
| S-10 | Vulnerable npm dependencies | Medium | Low to medium | `npm audit`, Dependabot, review | <name> |
| S-11 | Single person holds the only copy of account access | Medium | High | Document recovery paths; reviewer has access to critical items | <name> |

## 13. Open items

- [ ] Resolve O-1 (CloudFront to ALB protocol) and update network-plan.md and this document together
- [ ] Assign security owner and reviewer
- [ ] Decide whether CloudFront/ALB access logs are worth the extra S3 bucket and cost
- [ ] Decide on a custom domain (O-3), which affects TLS options
- [ ] Write the deploy role permissions policy in [deployment.md](deployment.md), scoped to the instances by tag
- [ ] Complete the verification checklist and attach evidence
- [ ] Hold a security review meeting before Phase 3 is marked done

