
# Test Matrix

Status: **Planned. Tests have been run .** All results are below.
Owner: <name>  |  Reviewer: <name>  |  Last updated: <date>

Related documents: [Architecture](architecture.md) · [Network Plan](network-plan.md) · [Security](security.md) · [Deployment](deployment.md) · [Cost Management](cost-management.md) · [Decision Log](decisions-log.md)

## 1. Purpose

This matrix lists every test the team will run to show that the application and the AWS infrastructure work as intended. It is the evidence base for Trello cards, phase sign-off and the final presentation.

A phase is not complete, and a status card in the application must not claim a component works, until the matching test here has passed with evidence.

## 2. Rules

1. **A test passes only with evidence.** Link a screenshot, command output, workflow run or log in the Evidence column. "I checked it" is not evidence.
2. **Record what actually happened.** If the result differs from expected, mark it Fail and describe the difference. Do not edit the expected result to match.
3. **One person runs the test, a different person reviews the evidence** for Phase 2 and 3 tests where practical.
4. **Retest after any change** to the component. Note the date and commit or change reference.
5. **Failures create a Trello card** (label: Testing, plus the phase) linked from the Notes column.
6. **Run location matters.** Each test states where it runs: Local (a team member's computer), EC2 (via Session Manager), CloudShell, Browser, Console (AWS console) or GitHub Actions.

## 3. Status values

| Status | Meaning |
|---|---|
| Not run | Test has not been executed |
| Pass | Executed; actual result matches expected; evidence linked |
| Fail | Executed; result differs from expected; Trello card linked |
| Blocked | Cannot run yet; dependency or blocker recorded |
| N/A | Not applicable because of a recorded decision (give the decision ID) |

## 4. Environment details (fill in as built)

Do not guess these values. Record them when the resources exist.

| Item | Value |
|---|---|
| Region | us-east-1 (D-001) |
| CloudFront domain | `<to be recorded>` |
| ALB DNS name | `<to be recorded>` |
| EC2 instance ID(s) | `<to be recorded>` |
| Application commit tested | `<to be recorded>` |
| Browsers and devices used | `<to be recorded>` |

## 5. Test cases

Columns: **ID** · **Test** · **How** · **Expected result** · **Run in** · **Phase** · **Owner** · **Status** · **Evidence**

Owner and evidence are left blank on purpose. Assign owners once team names are confirmed.

### 5.1 Frontend: build and quality (Phase 2)

| ID | Test | How | Expected result | Run in | Phase | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|
| FE-01 | Dependencies install | `npm ci` in the project folder | Completes without errors | Local | 2 | |  run | |
| FE-02 | Dev server runs | `npm run dev` | App loads at the printed local URL | Local | 2 | |  run | |
| FE-03 | Production build | `npm run build` | Build completes; `dist/` folder created | Local | 2 | |  run | |
| FE-04 | Lint | `npm run lint` (if configured) | No errors | Local | 2 | |  run | |
| FE-05 | Unit tests | `npm test` (if configured) | All tests pass | Local | 2 | | run | |
| FE-06 | No secrets in repo | Run a secret scan or search history for keys, tokens and `.env` files | None found | Local | 2 | | run | |
| FE-07 | README setup works | A team member who did not write it follows the README from a clean clone | App runs without extra undocumented steps | Local | 2 | | run | |

### 5.2 Frontend: functional (from Decision 001 acceptance criteria)

| ID | Test | How | Expected result | Run in | Phase | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|
| FN-01 | Primary navigation | Click every nav link (Home, Menu, About, Dashboard, Contact, Cart, Orders as built) | Each opens the right page; no broken routes | Browser | 2 | |  run | |
| FN-02 | Direct URL and refresh | Open a non-root route directly and refresh | Page loads (not a 404). Needs Nginx fallback to `index.html` | Browser | 2 | |  run | |
| FN-03 | Menu search | Search for a known meal and a non-existent term | Matching items shown; clear message for no results | Browser | 2 | |  run | |
| FN-04 | Category filter | Select each category | Only that category's meals shown | Browser | 2 | |  run | |
| FN-05 | Meal details | Open a meal | Image, name, description, price, availability shown | Browser | 2 | |  run | |
| FN-06 | Add to cart | Add several meals | Cart count updates; items appear | Browser | 2 | |  run | |
| FN-07 | Change quantity | Increase and decrease quantities | Quantity and subtotals update | Browser | 2 | |  run | |
| FN-08 | Remove item | Remove an item | Item gone; total updates | Browser | 2 | |  run | |
| FN-09 | Cart totals | Check totals against a hand calculation for at least two carts | Subtotals and total are correct | Browser | 2 | |  run | |
| FN-10 | Cart persistence | Add items, reload the page | Cart contents preserved (localStorage) | Browser | 2 | |  run | |
| FN-11 | Checkout validation | Submit with required fields empty, then with invalid values | Clear validation messages; no order created | Browser | 2 | |  run | |
| FN-12 | Place simulated order | Submit valid details | Confirmation page with a generated order reference | Browser | 2 | |  run | |
| FN-13 | Order history and status | Open order history after FN-12 | Order listed with a simulated status | Browser | 2 | |  run | |
| FN-14 | Simulation notice | Review checkout and tracking screens | UI states that checkout and tracking are simulated | Browser | 2 | |  run | |
| FN-15 | Status cards honesty | Compare HTTPS, load-balancing, CDN and CI/CD cards with the results in sections 5.4 to 5.7 | Each card shows "operational" only if its test has passed | Browser | 3 | |  run | |

### 5.3 Frontend: responsive and accessibility (Phase 2)

| ID | Test | How | Expected result | Run in | Phase | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|
| RS-01 | Desktop layout | Browser at about 1366 px wide and wider | Layout correct; no horizontal scrolling | Browser | 2 | |  run | |
| RS-02 | Tablet layout | Browser at about 768 px wide | Layout adapts; no horizontal scrolling | Browser | 2 | |  run | |
| RS-03 | Mobile layout | Browser at about 375 px wide, plus one real phone | Layout adapts; nav usable; no horizontal scrolling | Browser | 2 | |  run | |
| RS-04 | Cross-browser | Latest Chrome plus at least one other browser | Same behaviour | Browser | 2 | |  run | |
| RS-05 | Basic accessibility | Keyboard-only navigation of the order flow; check image alt text and colour contrast | Flow completable by keyboard; images have alt text; text readable | Browser | 2 | |  run | |

### 5.4 Infrastructure: network and origin (Phase 2)

These mirror the verification checklist in [network-plan.md](network-plan.md).

| ID | Test | How | Expected result | Run in | Phase | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|
| NW-01 | Subnets in different AZs | Check subnet details in the console | Public subnet 1 and 2 are in different AZs | Console | 2 | |  run | |
| NW-02 | Internet route | Check the route table | `0.0.0.0/0` points to the Internet Gateway; associated with both subnets | Console | 2 | | run | |
| NW-03 | No NAT Gateway | List NAT Gateways in the VPC | None exist (cost decision) | Console | 2 | | Not run | |
| NW-04 | EC2 security group inbound | Inspect `ec2-sg` | Only TCP 80 from `alb-sg`; no rule from 0.0.0.0/0; no port 22 | Console | 2 | |  run | |
| NW-05 | Direct access to EC2 | `curl -m 10 http://<EC2-public-IP>` | Times out | Local | 2 | |  run | |
| NW-06 | Nginx locally | `curl -I http://localhost` on the instance | HTTP 200 and the app HTML | EC2 | 2 | |  run | |
| NW-07 | Session Manager access | Start a session from the console | Connects with no inbound SSH rule | Console | 2 | |  run | |

### 5.5 Infrastructure: load balancer and health (Phase 2)

| ID | Test | How | Expected result | Run in | Phase | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|
| LB-01 | Target health | Check the target group | Registered target(s) **healthy** | Console | 2 | |  run | |
| LB-02 | Health check config | Review path, port and thresholds | Matches the path Nginx serves successfully | Console | 2 | |  run | |
| LB-03 | ALB serves app | Request the ALB DNS name (with the required header if the listener rule is in place) | HTTP 200 and the app | Local | 2 | |  run | |
| LB-04 | Unhealthy detection | Stop Nginx on a test instance; wait for the health check interval | Target becomes unhealthy; restore Nginx and confirm it recovers | EC2 and Console | 2 | |  run | |
| LB-05 | Second instance (only if O-2 chooses two) | Stop one instance | Site stays available through the other | Browser | 2 | |  run | |

### 5.6 Security and CloudFront (Phase 3)

These mirror the verification checklist in [security.md](security.md).

| ID | Test | How | Expected result | Run in | Phase | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|
| SC-01 | Root account | Check IAM account summary | Root MFA on; no root access keys | Console | 3 | |  run | |
| SC-02 | Human users MFA | Review IAM credential report | Every console user has MFA | Console | 3 | |  run | |
| SC-03 | HTTP redirect | `curl -I http://<cloudfront-domain>` | Redirects to HTTPS | Local | 3 | |  run | |
| SC-04 | Site via CloudFront | Open the CloudFront URL in a browser | App loads; padlock shown | Browser | 3 | |  run | |
| SC-05 | TLS version | Check the certificate and TLS details | Current TLS version; certificate valid | Browser | 3 | |  run | |
| SC-06 | ALB blocks non-CloudFront | `curl -I` to the ALB DNS name without the secret header | 403 or connection refused | Local | 3 | |  run | |
| SC-07 | ALB rejects wrong header | Same request with a wrong header value | 403 | Local | 3 | |  run | |
| SC-08 | Security group source | Inspect `alb-sg` | Inbound only from the CloudFront origin-facing prefix list on the agreed port (see O-1) | Console | 3 | |  run | |
| SC-09 | IMDSv2 | Check instance metadata options | IMDSv2 required | Console | 3 | |  run | |
| SC-10 | Security headers | `curl -I` the CloudFront URL | Configured headers present; app still works (check browser console for CSP errors) | Local | 3 | |  run | |
| SC-11 | OIDC trust | Attempt to assume the role from a different repo or branch (in a test, not production) | Denied | GitHub Actions | 3 | |  run | |
| SC-12 | Secret scan | Scan full Git history | No keys, tokens or the secret header value | Local | 3 | |  run | |
| SC-13 | Origin protocol as documented | Compare configuration with what [architecture.md](architecture.md) states for O-1 | Documentation matches the real configuration | Console | 3 | |  run | |

### 5.7 CI/CD (Phase 4)

| ID | Test | How | Expected result | Run in | Phase | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|
| CI-01 | PR checks | Open a pull request | Lint, test and build jobs run | GitHub Actions | 4 | |  run | |
| CI-02 | Failing build blocks merge | Open a PR with a deliberate error (on a throwaway branch) | Checks fail; merge blocked by branch protection | GitHub Actions | 4 | |  run | |
| CI-03 | OIDC authentication | Run the deploy workflow | AWS credentials obtained without stored keys; no secrets in logs | GitHub Actions | 4 | |  run | |
| CI-04 | Deployment | Merge to `main` | New build reaches the instance(s) | GitHub Actions and EC2 | 4 | |  run | |
| CI-05 | Smoke test | Post-deploy job | Requests the CloudFront URL and checks target health; fails the job if either fails | GitHub Actions | 4 | |  run | |
| CI-06 | Change is visible | Merge a small visible text change | Change appears via the CloudFront URL (allow for caching or invalidation) | Browser | 4 | |  run | |
| CI-07 | Failure reporting | Force a failed deployment on a test branch | Workflow shows failure clearly; site remains on the previous version | GitHub Actions | 4 | |  run | |
| CI-08 | Rollback | Redeploy the previous commit | Previous version restored and smoke test passes | GitHub Actions | 4 | |  run | |
| CI-09 | Workflow permissions | Review workflow YAML | Explicit `permissions:`; `id-token: write` only on the deploy job | Local | 4 | |  run | |
| CI-10 | Deploy role scope | Review the role's permissions policy | No wildcard on all resources beyond what is justified; scoped to tagged instances | Console | 4 | |  run | |

### 5.8 Monitoring and cost (Phase 4)

| ID | Test | How | Expected result | Run in | Phase | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|
| MN-01 | Nginx logs in CloudWatch | Browse the site, then check the log group | Access log entries appear | Console | 4 | |  run | |
| MN-02 | Log retention | Check log group settings | Retention period set (not "never expire") | Console | 4 | |  run | |
| MN-03 | Unhealthy-target alarm | Repeat LB-04 and watch the alarm | Alarm enters ALARM state; notification received | Console | 4 | |  run | |
| MN-04 | 5xx alarm configured | Review the alarm definition | Correct metric, threshold and notification target | Console | 4 | |  run | |
| MN-05 | Alarm recipients | Confirm the subscriptions | At least two people receive notifications | Console | 4 | |  run | |
| CM-01 | Budget exists | Review AWS Budgets | Monthly budget at the agreed amount | Console | 4 | |  run | |
| CM-02 | Budget alerts | Confirm subscriptions and thresholds, including a forecast alert | Configured; recipients confirmed | Console | 4 | |  run | |
| CM-03 | Tagging | Filter resources by tag `Project` | All billable resources tagged | Console | 4 | | Not run | |
| CM-04 | Cost vs estimate | Compare Billing console figures with `docs/cost-estimate.md` | Differences explained | Console | 4 | | Not run | |

### 5.9 Documentation and presentation (Phase 5)

| ID | Test | How | Expected result | Run in | Phase | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|
| DC-01 | Docs complete | Review every file in `docs/` | No placeholder text remains | Local | 5 | |  run | |
| DC-02 | Docs match reality | Compare architecture, network plan and security docs with the deployed resources | No contradictions; "Planned" statuses updated to "Built" where verified | Console | 5 | |  run | |
| DC-03 | Clean deployment | A team member follows the deployment guide on a test environment or in a dry run | Steps work as written | Local and Console | 5 | |  run | |
| DC-04 | Trello evidence | Review Done cards | Each has acceptance criteria met and evidence attached | Trello | 5 | |  run | |
| DC-05 | Demo rehearsal | Run the demo plan from [presentation-outline.md](presentation-outline.md) twice | Completes within the time limit; fallback recording ready | Browser | 5 | |  run | |
| DC-06 | Teardown dry run | Review the teardown checklist in [cost-management.md](cost-management.md) | Order is correct; nothing missing | Console | 5 | |  run | |

## 6. Summary tracker

Update after each test session.

| Area | Total tests | Pass | Fail | Blocked | Not run |
|---|---|---|---|---|---|
| Frontend build and quality (FE) | 7 | 0 | 0 | 0 | 7 |
| Frontend functional (FN) | 15 | 0 | 0 | 0 | 15 |
| Responsive and accessibility (RS) | 5 | 0 | 0 | 0 | 5 |
| Network and origin (NW) | 7 | 0 | 0 | 0 | 7 |
| Load balancer and health (LB) | 5 | 0 | 0 | 0 | 5 |
| Security and CloudFront (SC) | 13 | 0 | 0 | 0 | 13 |
| CI/CD (CI) | 10 | 0 | 0 | 0 | 10 |
| Monitoring and cost (MN, CM) | 9 | 0 | 0 | 0 | 9 |
| Documentation (DC) | 6 | 0 | 0 | 0 | 6 |
| **Total** | **77** | **0** | **0** | **0** | **77** |

## 7. Phase exit criteria

A phase may be marked complete only when:

| Phase | Required passing tests |
|---|---|
| 2 | FE-01 to FE-07, FN-01 to FN-14, RS-01 to RS-05, NW-01 to NW-07, LB-01 to LB-04 (LB-05 if two instances) |
| 3 | SC-01 to SC-13, FN-15 |
| 4 | CI-01 to CI-10, MN-01 to MN-05, CM-01 to CM-04 |
| 5 | DC-01 to DC-06 and no unresolved Fail results |

If a test is skipped, mark it N/A with a decision ID or Blocked with a reason. Do not leave it silently as Not run.

## 8. Defect log

| Defect ID | Related test | Description | Severity | Trello card | Status | Retest date |
|---|---|---|---|---|---|---|
| | | | | | | |

## 9. Open items

- [ ] Assign an owner and a reviewer to each test group once team names are confirmed
- [ ] Confirm which of lint and unit tests are configured in the repository, and mark FE-04 and FE-05 N/A if not
- [ ] Update SC-06 to SC-08 and SC-13 after open decision O-1 is resolved
- [ ] Update LB-05 after open decision O-2 is resolved
- [ ] Record the environment details in Section 4 as resources are created
