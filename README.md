# MyCloudApp

MyCloudApp is a React web application (a Restaurant Ordering System front end) hosted on AWS as part of our DevOps capstone. Requests are served through CloudFront, an Application Load Balancer (ALB), and an EC2 instance running Nginx.

> **Last updated:** 05 November 2026
> **Status:** Deployed and reachable through CloudFront; automated deployment pipeline working. Security hardening, monitoring, cost controls, final testing and documentation are still in progress.
>


## Table of contents

- [Architecture](#architecture)
- [Application](#application)
- [Deployment pipeline](#deployment-pipeline)
- [Security posture](#security-posture)
- [Project status](#project-status)
- [Repository structure](#repository-structure)
- [Local development](#local-development)
- [Documentation index](#documentation-index)
- [Team](#team)
- [Contributing](#contributing)
- [License](#license)

## Architecture

```
Browser --HTTPS--> CloudFront --HTTP--> ALB --HTTP--> EC2 (Nginx)
```

| Layer | Details |
|---|---|
| Region | `us-east-1` (chosen so CloudFront ACM certificates and all resources share one Region; see `docs/decisions-log.md`) |
| Networking | `MyCloudApp-vpc` (`10.0.0.0/16`), two public and two private subnets, Internet Gateway, route tables, NAT Gateway **(verify)** |
| Compute | EC2 application server running Nginx, managed through Systems Manager (SSM); no inbound SSH |
| Load balancing | ALB and target group; EC2 HTTP ingress restricted to the ALB security group |
| Delivery | CloudFront provides HTTPS to browsers |
| Artifact storage | Private S3 bucket holds build archives used by the deployment |



An architecture diagram will be added to [`docs/architecture.md`](docs/architecture.md).

## Application

- React production build created with Vite (output in `App/dist`).
- Planned features, per `docs/decisions-log.md` (Decision 001): home page, menu browsing with search and category filters, shopping cart persisted in `localStorage`, simulated checkout, simulated order tracking, responsive layout.
- Checkout and order tracking are **simulated**. No real payments or sensitive personal data are processed.
- The original decision scoped the application as frontend only. AWS hosting and deployment have since been added, so that decision's "AWS deployment excluded" note is out of date and should be updated.

## Deployment pipeline

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

**Triggers:** push to the `phil` branch, or manual run (`workflow_dispatch`).


**Steps:**

1. Check out the repo, set up Node.js 22, run `npm ci` and `npm run build` in `App/`.
2. Confirm `App/dist/index.html` exists.
3. Authenticate to AWS using GitHub OIDC (role ARN and Region come from repository variables `AWS_ROLE_ARN` and `AWS_REGION`; no long-lived keys).
4. Package the build and upload it to the private S3 bucket.
5. Run a deployment script on EC2 through SSM (instance ID from repository variable `EC2_INSTANCE_ID`):
   - downloads and extracts the build to a staging directory and checks `index.html`;
   - swaps staging into the live directory, keeping the previous version as a backup;
   - runs `nginx -t` and reloads Nginx; if that fails, restores the previous site.
6. Invalidate the CloudFront cache.

** Implemented:** a post-deployment smoke test of the CloudFront URL and ALB target health. A completed workflow run alone is not proof of a healthy deployment.

**Concurrency:** only one deployment runs at a time; in-progress runs are not cancelled.

## Security posture

Current state:

- Browser to CloudFront: HTTPS.
- CloudFront to ALB and ALB to EC2: HTTP. EC2 HTTP ingress is limited to the ALB security group.
- GitHub Actions uses OIDC with short-lived AWS credentials.
- No secrets, keys or tokens are committed to the repository.

Open items (tracked under [Security hardening](#security-hardening)): origin encryption, ALB exposure (restrict to CloudFront), IAM least privilege, EC2 placement and public IP.

## Project status

### Completed (reported)

- [x] VPC, subnets, Internet Gateway, route tables **(verify)**
- [x] EC2 with Nginx, managed through SSM
- [x] ALB and target group
- [x] CloudFront with HTTPS for browsers
- [x] GitHub Actions deployment with OIDC, S3, SSM, Nginx reload and CloudFront invalidation
- [x] React production build deployed and website confirmed working

### Remaining work

#### Security hardening

- [x] Review security group ingress and egress rules
- [x] Review IAM roles and policies for least privilege (including the GitHub OIDC role trust policy and permissions)
- [x] Restrict ALB access to CloudFront (managed prefix list and/or secret origin header) and confirm direct ALB access is blocked
- [x] Evaluate moving EC2 to a private subnet and removing its public IP
- [x] Decide and implement encryption between CloudFront, ALB and EC2 (HTTPS to the ALB needs an ACM certificate on the ALB, which needs a custom domain)

#### Monitoring and cost management

- [x] CloudWatch dashboards and alarms for EC2 and ALB health, traffic, latency and errors
- [x] Review application and Nginx logs
- [x] Review EC2, ALB, NAT Gateway, public IPv4 and CloudFront costs
- [x] Configure an AWS Budget and billing alert
- [x] List resources to stop or remove after testing

#### Testing and reliability

- [x] Verify the application through CloudFront and check ALB target health
- [x] Add a post-deployment smoke test to the workflow
- [x] Test the pipeline after a code change and verify rollback behaviour
- [x] Verify Nginx and EC2 recovery after a restart
- [x] Basic load testing

#### Documentation and acceptance

- [x] Add the architecture diagram to `docs/architecture.md`
- [x] Document network, security group, IAM and deployment configuration
- [x] Add AWS and deployment screenshots
- [x] Reconcile `docs/network-plan.md` and `docs/decisions-log.md` with the built environment
- [x] Team review and final acceptance testing
- [x] Final presentation (8 to 12 minutes) and retrospective

## Repository structure

```
.
├── App/                  # React (Vite) application
├── docs/                 # Project documentation (see index below)
├── .github/
│   ├── workflows/deploy.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── LICENSE
└── README.md
```



## Local development

Run from the `App/` directory:

```bash
cd App
npm ci
npm run dev      # local development server
npm run build    # production build to App/dist
```

Requires Node.js 22 (the version used by the pipeline).

## Documentation index

| Document | Owner |
|---|---|
| [`docs/decisions-log.md`](docs/decisions-log.md) | In use; needs updating for AWS scope |
| [`docs/network-plan.md`](docs/network-plan.md) | Written as a plan; conflicts with built environment |
| [`docs/architecture.md`](docs/architecture.md) | Philip (Cloud Infrastructure) |
| [`docs/deployment.md`](docs/deployment.md) | Bright (DevOps / CI/CD) |
| [`docs/security.md`](docs/security.md) | Philip, reviewed by Bright |
| [`docs/cost-management.md`](docs/cost-management.md) | Sandra (Monitoring, Cost, Docs) |
| [`docs/test-matrix.md`](docs/test-matrix.md) | Sandra |
| [`docs/troubleshooting.md`](docs/troubleshooting.md) | Sandra |
| [`docs/workload.md`](docs/workload.md) | Philipa (Project Manager) |
| [`docs/presentation-outline.md`](docs/presentation-outline.md) | Philipa |

## Team

| Name | Role |
|---|---|
| Philipa | Project Manager |
| Michael | Frontend Engineer |
| Philip | Cloud Infrastructure Engineer |
| Bright | DevOps / CI/CD Engineer, AWS Account Owner |
| Sandra | Monitoring, Cost, and Documentation Engineer |

Task ownership and progress are tracked on the team Trello board. Ownership changes are recorded on the card and in `docs/workload.md`.

## Contributing

1. Branch from `main`.
2. Commit in small steps and open a pull request using the PR template.
3. Wait for review; do not push directly to `main`.
4. Never commit secrets, keys, or tokens.
5. Link the PR on the matching Trello card.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
