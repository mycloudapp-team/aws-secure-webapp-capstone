# cost-management

# Cost Management

Status: **Planned, not yet configured** (update to "Active" once the budget and alerts are verified, see Section 4)
Owner: <name>  |  Reviewer: <name>  |  Last updated: <date>

Related documents: [Architecture](architecture.md) · [Network Plan](network-plan.md) · [Decision Log](decisions-log.md) · `docs/cost-estimate.md` (to be created)

## 1. Purpose

This document explains how the team keeps the AWS Secure Web App Capstone within budget: what costs money, how spending is monitored, who responds to alerts, and how resources are shut down when the project ends.

No prices are quoted in this document. AWS prices and Free Tier rules change by Region, account type and date. Every figure used for a decision must come from the AWS Pricing Calculator or the account's Billing console, be recorded in `docs/cost-estimate.md`, and carry the date it was checked.

## 2. Principles

1. **Create the budget before any billable resource.** Budgets is task one of Phase 1 infrastructure work.
2. **Do not assume Free Tier.** Verify eligibility, the Free Tier end date and account-specific limits in the Billing console.
3. **Prefer the cheaper design when it meets the requirement.** Record the trade-off in the decision log.
4. **Every resource is tagged** so its cost can be traced to the project and an owner.
5. **Anything that can run up cost needs human confirmation** from the owner and reviewer before it is created.
6. **Delete what is no longer needed**, using the teardown checklist in Section 8.

## 3. Cost drivers

Based on the planned architecture. "Charged?" means "check current pricing for this Region and account", not a confirmed amount.

| Resource | Charged? | Notes / how to keep it low |
|---|---|---|
| VPC, subnets, route tables, Internet Gateway, security groups | No charge | |
| NAT Gateway | **Avoided** | Not in the design (D-001 network plan). Do not add one without approval |
| Application Load Balancer | Yes (hourly and usage) | Required by the project. One ALB only; delete after the demo |
| EC2 instance(s) | Yes, unless covered by Free Tier | Smallest suitable instance type; one instance unless availability is required (open decision O-2). Stop or terminate when idle |
| EBS volumes | Yes | Smallest size that works; delete unattached volumes and old snapshots |
| Public IPv4 addresses | Yes | Applies to EC2 public IPs and to ALB addresses. Check current pricing |
| CloudFront | Usage-based, possibly a free allowance | Low traffic expected; check data transfer and request pricing |
| ACM public certificates | No charge | Only if a custom domain is used |
| Custom domain (Route 53 or other registrar) | Yes | Domain registration and any hosted zone. Decision pending (O-3) |
| CloudWatch logs, metrics, alarms | Yes beyond free allowances | Set log retention (for example 7 days); avoid high-resolution metrics and unneeded custom metrics |
| Systems Manager Session Manager | No additional charge for basic use | Replaces SSH |
| S3 (only if the optional artifact bucket is used) | Yes, small | Enable lifecycle expiry on old artifacts |
| AWS Budgets | Check current pricing | Confirm whether the number of budgets you create is free |
| Data transfer out | Yes beyond allowances | Mostly via CloudFront; avoid unneeded cross-AZ traffic |

## 4. Budget and alerts setup

**Where:** AWS Console → Billing and Cost Management → Budgets. Run by: the cost-management owner, using an IAM identity that has billing access. Billing access for IAM users may need to be activated by the root user in Account settings.

### 4.1 Steps

1. Enable billing alerts and Cost Explorer if not already enabled.
2. Create a **monthly cost budget** with a fixed amount agreed by the team: `<budget amount, USD>`.
3. Add alerts on **actual** spend at `<threshold 1>%`, `<threshold 2>%` and `<threshold 3>%` of the budget.
4. Add one alert on **forecasted** spend exceeding 100%.
5. Send alerts to at least **two** email addresses (owner and reviewer), not a single person.
6. Activate the cost allocation tag `Project` (Billing → Cost allocation tags) so reports can be filtered by it. Tags can take time to appear after activation.

### 4.2 Verification

- [x] Budget visible in the Budgets console with the agreed amount
- [x] Both recipients confirmed the subscription / received a test or real alert
- [x] Forecast alert is configured
- [x] Tag `Project` is activated for cost allocation

Evidence (screenshots or links): `<to be added>`

## 5. Tagging standard

Apply these tags to every resource that supports tags:

| Tag key | Value | Purpose |
|---|---|---|
| `Project` | `aws-secure-web-app-capstone` | Filter all project cost |
| `Owner` | Name of the responsible team member | Who to ask before deleting |
| `Phase` | `1` to `5` | Which phase created it |
| `Environment` | `demo` | Distinguish from anything else in the account |

Untagged resources found during review are treated as defects: tag them or investigate why they exist.

## 6. Review routine

| When | Who | What to check |
|---|---|---|
| After creating any new billable resource | Resource owner | Add it to `docs/cost-estimate.md`; confirm it is tagged |
| Twice a week during active building | Cost owner | Billing console / Cost Explorer filtered by `Project`; compare against the estimate |
| Before each phase is marked done | Reviewer | Any resources left running that the next phase does not need |
| Before the final demo | Cost owner | Expected cost of keeping everything up until the demo date |
| After the final demo | Cost owner | Run the teardown checklist (Section 8) |

Cost Explorer data can lag; do not treat a low number on a given day as proof that nothing is running. Check the resource lists directly as well.

## 7. When an alert fires

1. The recipient posts in the team channel and creates a Trello card labelled **High priority** and **Blocked**, recording the alert, the time and the current spend.
2. The cost owner opens Cost Explorer, groups by **Service** and then by tag `Owner`, and identifies the driver.
3. Check the usual suspects first: an extra ALB or instance, unattached EBS volumes, unreleased public IPs, CloudWatch log ingestion, an unexpected Region.
4. Fix the smallest thing that stops the spend. **Do not delete resources that are part of a working environment without confirming with the owner and reviewer** and recording what was removed.
5. Record cause, action and result in the card, and add a lesson to the retrospective.

## 8. Teardown checklist (after the demo)

Do this in order, only after the team confirms evidence (screenshots, logs, workflow runs) has been saved. Deleting resources removes the ability to demo them again.

- [x] Take final screenshots and export evidence to the repository or Trello
- [x] Delete the CloudFront distribution (disable first, wait until deployed, then delete)
- [x] Delete the ALB, listeners and target group
- [x] Terminate EC2 instance(s)
- [x] Delete unattached EBS volumes and snapshots
- [x] Release any Elastic IP addresses
- [x] Delete CloudWatch alarms and log groups
- [x] Delete the S3 artifact bucket, if one was created (empty it first)
- [x] Delete ACM certificates and any Route 53 hosted zone or records created for the project
- [x] Remove the GitHub OIDC IAM role and the EC2 instance profile
- [x] Delete the VPC (delete dependent resources first: subnets, route tables, IGW, security groups)
- [x] Keep AWS Budgets active for at least a billing cycle to catch stragglers
- [x] Check the Billing console the following days for unexpected charges

Order matters: for example, a VPC cannot be deleted while an ALB or instance still uses it, and a CloudFront distribution must be disabled before deletion.

## 9. Preliminary cost risk register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| C-1 | Resources left running after the project | Medium | Ongoing charges | Teardown checklist; budget kept active | <name> |
| C-2 | Free Tier assumed but not applicable | Medium | Unexpected charges | Verify eligibility in Billing before launch | <name> |
| C-3 | Public IPv4 charges overlooked | Medium | Small but recurring | Include in estimate; release unused addresses | <name> |
| C-4 | Second EC2 instance added for availability without review | Low | Cost roughly doubles for compute | Requires decision-log entry (O-2) | <name> |
| C-5 | NAT Gateway added to fix a connectivity issue | Low | High recurring | Prefer VPC endpoints or fix the root cause; require approval | <name> |
| C-6 | CloudWatch log volume grows | Low | Small to moderate | Retention limit; no debug logging in production | <name> |
| C-7 | Resources created in the wrong Region | Low | Hidden charges | Work in us-east-1 (D-001); review other Regions in Cost Explorer | <name> |
| C-8 | Budget alerts go to a single unattended mailbox | Low | Alert missed | Two recipients; test the alert | <name> |

## 10. Open items

- [ ] Agree the monthly budget amount and alert thresholds as a team
- [ ] Assign the cost owner and reviewer
- [x] Build the estimate in the AWS Pricing Calculator and save it as `docs/cost-estimate.md` with the date checked
- [x] Resolve open decisions that affect cost: number of instances (O-2), custom domain (O-3), S3 artifact bucket (O-4). See [architecture.md](architecture.md)
- [ ] Record actual spend per phase for the final presentation and retrospective
