# MyCloudApp

MyCloudApp is a React web application hosted on AWS. Requests are served through
CloudFront, an Application Load Balancer (ALB), and an EC2 instance running Nginx.

> **Project status (5 November 2026):** The application is deployed and accessible
> through CloudFront, and the automated deployment pipeline is working. Security
> hardening, monitoring, cost controls, final testing, and documentation remain.

## Architecture and completed work

- **Networking:** `MyCloudApp-vpc` (`10.0.0.0/16`), two public and two private
  subnets, Internet Gateway, route tables, and NAT Gateway.
- **Compute and web serving:** EC2 application server running Nginx, managed
  through Systems Manager (SSM).
- **Load balancing and delivery:** ALB and target group, with CloudFront providing
  HTTPS access to the website.
- **Deployment:** GitHub Actions uses OIDC to authenticate to AWS, uploads build
  artifacts to a private S3 bucket, deploys through SSM, reloads Nginx, and
  invalidates CloudFront content.
- **Application:** The React production build has been deployed and the website
  has been confirmed working.

### Current traffic encryption

Browser-to-CloudFront traffic uses HTTPS. At the time of this assessment,
CloudFront-to-ALB and ALB-to-EC2 traffic use HTTP; EC2 HTTP ingress is restricted
to the ALB security group. Review and harden origin encryption as part of the
remaining security work.

## Remaining work

### Security hardening

- Review security group ingress and egress rules.
- Review IAM roles and policies for least privilege.
- Evaluate moving EC2 to a private subnet and removing its public IP.
- Decide and implement appropriate encryption between CloudFront, ALB, and EC2.

### Monitoring and cost management

- Create CloudWatch dashboards and alarms for EC2 and ALB health, traffic,
  latency, and errors.
- Review application and Nginx logs.
- Review EC2, ALB, NAT Gateway, and CloudFront costs.
- Configure an AWS Budget and billing alert; identify resources to stop or remove
  after testing.

### Testing and reliability

- Verify the application through CloudFront and check ALB target health.
- Test the deployment workflow after a code change and verify rollback behavior.
- Verify Nginx and EC2 recovery after a restart.
- Perform basic application load testing.

### Documentation and acceptance

- Add the architecture diagram to [`docs/architecture.md`](docs/architecture.md).
- Document network, security group, IAM, and deployment configuration.
- Add relevant AWS and deployment screenshots.
- Complete team review and final acceptance testing.

## Team

| Name | Role |
|---|---|
| Philipa | Project Manager |
| Michael | Frontend Engineer |
| Philip | Cloud Infrastructure Engineer |
| Bright | DevOps / CI/CD Engineer, AWS Account Owner |
| Sandra | Monitoring, Cost, and Documentation Engineer |

## Contributing

1. Branch from `main` using `feature/<trello-card#>-<short-name>`.
2. Commit in small steps and open a pull request.
3. Wait for review; do not push directly to `main`.
4. Never commit secrets, keys, or tokens.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
