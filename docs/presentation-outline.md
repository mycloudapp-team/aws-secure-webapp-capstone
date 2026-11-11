# Presentation Outline

Status: ** Done**


Related documents: [Architecture](architecture.md) · [Cost Management](cost-management.md) · [Decision Log](decisions-log.md) · [Test Matrix](test-matrix.md) · [Troubleshooting](troubleshooting.md)

## 1. Format

| Item | Value |
|---|---|
| Length | 8 to 12 minutes plus questions. Target **10 minutes** to leave a margin |
| Presenters | Philipa, Bright, Michael, Philip, Sandra. Each person presents at least one section |
| Audience | William, Brian, Azubi Cohort 6 |
| Date and venue | 06-11-2026 |
| Live demo | Yes, with a recorded fallback (Section 5) |
| Slide deliverable | Slides plus speaker notes, stored in the repository or linked from Trello |

## 2. Ground rules

1. **Only present what was built and tested.** Every claim on a slide must point to evidence (screenshot, workflow run, command output, console view).
2. **Label proposed work as proposed.** Use the heading "Future improvements" so it cannot be mistaken for something delivered.
3. **Show real problems.** The challenges slide uses issues from the actual project, recorded in Trello or the troubleshooting guide, not invented ones.
4. **No secrets on screen.** Check slides, terminals and screenshots for account IDs you do not want public, access keys, tokens, the CloudFront secret header value and email addresses.
5. **Do not overclaim.** If the application's status cards show HTTPS, load balancing, CDN or CI/CD as working, each must have been tested.

## 3. Slide plan

Total target: 10 minutes, 11 slides. Adjust timings after the first rehearsal.

| # | Slide | Time | Presenter | Key message |
|---|---|---|---|---|
| 1 | Title and team | 0:15 | Philipa | Project name, team members and roles, date |
| 2 | Problem and goal | 0:45 | Philipa | Restaurants need an easy online ordering experience; the project is also about running a web app securely and affordably on AWS |
| 3 | The application | 0:45 | Michael | Restaurant Ordering System: React frontend, menu, cart, simulated checkout, local order history. Frontend only; no real payments (Decision 001) |
| 4 | Architecture | 1:30 | Bright | Browser → HTTPS → CloudFront → ALB → EC2 (Nginx). Why each component is there; what was left out (NAT Gateway, S3 serving, backend) |
| 5 | Security | 1:30 | Bright | CloudFront-only access to the ALB (prefix list plus secret header), ALB-only access to EC2, no SSH, Session Manager, least-privilege IAM, no secrets in Git |
| 6 | CI/CD | 1:30 | Bright | GitHub Actions with OIDC (no stored keys), build, deploy, smoke test. Success means the endpoint and target health were checked, not just that the workflow finished |
| 7 | Monitoring and cost control | 1:00 | Sandra | CloudWatch alarms, log retention, Budgets alerts, tagging. `[EVIDENCE]` actual spend vs estimate |
| 8 | Live demo | 1:30 | Philip | See Section 5 |
| 9 | Challenges and how we solved them | 1:00 | Philipa | Three to four real issues, each with cause and fix |
| 10 | Lessons learned and future improvements | 0:45 | Philipa | What we would do differently; clearly labelled proposals |
| 11 | Thank you and questions | 0:15 | Philipa | Repository link, contact |

Timings above add up to about 10:45 with transitions. If rehearsal runs over 11:30, shorten slides 2, 3 and 7 first.

## 4. Slide content notes

### Slide 4: Architecture
- Use the diagram from [architecture.md](architecture.md), simplified to the request path.
- Mention the essential components and the ones deliberately left out, with the reason (cost or no purpose).
- State the CloudFront → ALB protocol that was actually chosen (open decision O-1) and why. If it is HTTP to the origin, say so plainly.

### Slide 5: Security
- Show the three layers protecting the origin: security group prefix list, secret header, ALB-only access to EC2.
- `[EVIDENCE]` Results of the origin-protection checks: direct request to the ALB without the header rejected, direct request to the EC2 public IP times out, request through CloudFront succeeds.
- Do not confuse S3 Origin Access Control with ALB protection; only mention OAC if S3 was actually used.

### Slide 6: CI/CD
- Show the workflow stages and the OIDC trust relationship in one simple diagram.
- `https://github.com/mycloudapp-team/aws-secure-webapp-capstone/actions` Link or screenshot of a successful run, and of a run that failed and was fixed, if one exists.
- State what the smoke test checks.

### Slide 7: Monitoring and cost
- `[EVIDENCE]` Alarm that was tested (for example Nginx stopped, target unhealthy, alarm fired).
- `[EVIDENCE]` Budget configuration screenshot and actual spend to date. Use real figures from the Billing console, with the date.
- State the teardown plan from [cost-management.md](cost-management.md).

### Slide 9: Challenges
Fill from Trello cards labelled Blocked and from [troubleshooting.md](troubleshooting.md). Format for each:

| Problem |

| `1.Connecting Github actions to AWS securely without using permanent access keys.` | 
| `2. failure connecting ec2 instance because of no ssh in inbound rule ` | 
| `assigniing permissions to users and groups.` | 

### Slide 10: Lessons and future work
- **Lessons:** from the retrospective, for example about planning, review, estimating effort, handoffs.
- **Future improvements (proposed, not built):** examples to consider if they were not implemented: custom domain with HTTPS to the origin, second instance or auto scaling for availability, WAF, backend and database, infrastructure as code. Keep only those the team genuinely recommends.

## 5. Live demo plan

Total demo time: about 90 seconds. Rehearse it at least twice, on the network that will be used for the presentation.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open the CloudFront URL | Site loads over HTTPS (padlock visible) |
| 2 | Browse the menu, add items to the cart, complete a simulated checkout | Order confirmation with a generated reference |
| 3 | Show the pipeline: change a small piece of text on a branch and merge, or show a prepared run | Workflow runs; deployment passes smoke test. If the run is too slow for the slot, show a previous successful run instead |
| 4 | Show the ALB target group | Target healthy |
| 5 | (Optional) Show the direct ALB/EC2 request being blocked | Request rejected or times out |

**Fallbacks (prepare all of these):**
- A screen recording of steps 1 to 4 saved locally.
- Screenshots of the same steps in the slide deck's appendix.
- A second presenter with the AWS Console and GitHub already logged in.
- Do not start a deployment during the live demo unless a fallback is ready; if it fails, switch to the recording without troubleshooting on stage.

## 6. Evidence checklist

Collect before the rehearsal. Each item should be linked from the Trello card or stored in the repository.

- [ ] Architecture diagram (final, matching what was built)
- [ ] Site loading through CloudFront
- [ ] ALB target group showing healthy
- [ ] Origin-protection test outputs
- [ ] Successful GitHub Actions run (and a failed run with its fix, if available)
- [ ] CloudWatch alarm tested
- [ ] AWS Budgets configuration and current spend
- [ ] Test matrix with pass/fail results ([test-matrix.md](test-matrix.md))
- [ ] Trello board showing completed cards with evidence
- [ ] Screen recording of the demo

## 7. Speaker notes

Write one short paragraph per slide in the slide deck's notes field. Each should have: the one point to make, the evidence to point at, and the transition to the next slide. Keep notes to talking points rather than a full script so presenters do not read aloud.

Tip: if a presenter hands over to another, the last sentence of one slide's notes should introduce the next speaker by name.

## 8. Rehearsal plan

| Rehearsal | Goal | Done |
|---|---|---|
| 1 | Walk through slides; check total time and slide order | [ ] |
| 2 | Full run including live demo; time each section | [ ] |
| 3 | Final run on the real network with fallback ready; Q&A practice | [ ] |

## 9. Likely questions to prepare

Assign each to the team member who owns that area.

- Why CloudFront and an ALB for a static site, and what is the simpler alternative? (Be honest: the project requirement drove it; S3 plus CloudFront would be simpler for static files.)
- How is the origin protected from direct access?
- Is traffic encrypted from CloudFront to the ALB? (Answer according to decision O-1.)
- Why OIDC instead of access keys?
- What does the pipeline check after deployment?
- What did the project cost, and what would it cost to keep running?
- What would you change to make it production-ready?
- How was the work divided, and how did workload change over time?

## 10. Open items

- [ ] Confirm presentation date, audience and time limit
- [ ] Assign presenters per slide once the team has confirmed names
- [ ] Decide which challenges to feature once the project has produced them
- [ ] Choose the template and keep the diagram style consistent with [architecture.md](architecture.md)
- [ ] Build the deck only after the evidence checklist in Section 6 is mostly complete
