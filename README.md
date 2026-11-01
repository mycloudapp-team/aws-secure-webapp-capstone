# aws-secure-webapp-capstone

MyCloudApp: a secure web application on AWS served through CLoudFront -> Application Load Balancer -> EC2, deployed with GitHub Actions.

> Status: Phase 1 (setup). Nothing is deployed yet.

## Architecture
_To be added ( Mermaid diagram in docs/architecture.md)._

## Team
| Name | Role |
|----|---|
| Philipa | Project Manager |
| Michael | Frontend Egineer |
| Philip | Cloud Insfrastructure Engineer |
| Bright | DevOps / CI/CD Engineer, AWS Account Owner |
| Sandra | Monitoring, Cost and Documentation Engineer |

## Contributing
1. Branch from 'main': 'feature/<trello-card#>-<short-name>'
2. Commit in small steps and open a pull request that links the Trello card.
3. Wait for review. Never push directly to 'main'.
4. Never commit secrets, keys or tokems.

## Phase 1
## Project Setup & Environment Configuration
This phase covers the foundational infrastructure, network setup, version control, and security group configurations for the application.

### 1. Architecture & Networking
* **VPC:** `mycloudapp-vpc` configured with public and private subnets.
* **Internet Gateway:** Attached (`MyCloudApp-igw`) to enable routing to the public internet.

### 2. Security Group Configuration
To maintain strict least-privilege security principles, traffic flow is tightly controlled across tiers:
* **`mycloudapp-sg` (Application Load Balancer Security Group):**
  * **HTTP (Port 80):** Open to `0.0.0.0/0` (Redirects to HTTPS).
  * **HTTPS (Port 443):** Open to `0.0.0.0/0` (Secure public entry point).
* **`mycloudapp-sg` (EC2 Application Servers Security Group):**
  * **HTTP (Port 80):** Restricted strictly to source `mycloudapp-sg`. No direct public or SSH access from the internet.

### 3. Version Control & Tracking
* **GitHub:** Main repository initialized with a structured branching strategy (`main`, `develop`, feature branches).
* **Trello:** Project management board configured with lists for *Backlog*, *In Progress*, *Review*, and *Done*.



## Sections to complete later
Prerequistes, setups, deployments, CI/CD, security controls, monitoring, cost management, troubleshooting, cleanup, screenshots, live URL.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) files.
