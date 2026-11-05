# MyCloudApp

A secure web application hosted on AWS. The planned request path is CloudFront -> Application Load Balancer -> EC2.

> **Status:** Phases 1 and 2 are complete. Phase 3 (Application Load Balancer) is next.

## Project phases

### Phase 1 — AWS network infrastructure

**Completed**

VPC, public and private subnets, Internet Gateway, route tables, and network configuration.

### Phase 2 — EC2 and application deployment

**Completed**

EC2, IAM role, Systems Manager, Nginx, and successful application deployment.

### Phase 3 — Application Load Balancer

**Next**

- Create an ALB across two Availability Zones.
- Create a target group for EC2.
- Configure health checks.
- Connect the ALB to EC2 securely.

### Phase 4 — HTTPS and content delivery

**Pending**

- Configure AWS Certificate Manager (ACM).
- Add an HTTPS listener to the ALB.
- Create a CloudFront distribution.
- Configure secure origin communication.

### Phase 5 — CI/CD automation

**Pending**

- Connect the GitHub repository.
- Configure a build and deployment pipeline.
- Automate deployment to EC2.
- Test updates through Git pushes.

### Phase 6 — Monitoring, testing, and documentation

**Pending**

- Configure CloudWatch metrics and alarms.
- Test the application and infrastructure.
- Set up cost monitoring.
- Add an architecture diagram and technical documentation.

## Architecture

The architecture diagram will be added to [`docs/architecture.md`](docs/architecture.md).

## Team
| Name | Role |
|----|---|
| Philipa | Project Manager |
| Michael | Frontend Engineer |
| Philip | Cloud Insfrastructure Engineer |
| Bright | DevOps / CI/CD Engineer, AWS Account Owner |
| Sandra | Monitoring, Cost and Documentation Engineer |

## Contributing
1. Branch from 'main': 'feature/<trello-card#>-<short-name>'
2. Commit in small steps and open a pull request.
3. Wait for review. Never push directly to 'main'.
4. Never commit secrets, keys or tokems..

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
