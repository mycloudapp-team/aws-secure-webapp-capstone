# MyCloudApp: Frontend

The React + Vite frontend for **MyCloudApp**, our AWS DevOps capstone project. It is a responsive single-page application with Home, About, Dashboard, and Contact sections, and it is deployed to AWS behind CloudFront and an Application Load Balancer.

> **Status:** Update this section as work progresses. Do not mark anything as done until it has been tested.
>
> | Item | Status |
> |------|--------|
> | Local development | ☐ Verified |
> | Production build | ☐ Verified |
> | Deployed to EC2 | ☐ Verified |
> | Served through ALB | ☐ Verified |
> | Served through CloudFront over HTTPS | ☐ Verified |
> | Automated deployment (GitHub Actions) | ☐ Verified |

---

## Table of contents

1. [Features](#features)
2. [Tech stack](#tech-stack)
3. [Project structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Getting started](#getting-started)
6. [Available scripts](#available-scripts)
7. [Status cards: how they work](#status-cards-how-they-work)
8. [Building for production](#building-for-production)
9. [Deployment overview](#deployment-overview)
10. [Health check](#health-check)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)

---

## Features

- Navigation bar with **MyCloudApp** branding
- Sections: **Home**, **About**, **Dashboard**, **Contact**
- Welcome message on the Home page
- Status cards for **HTTPS**, **Load Balancing**, **CDN**, and **CI/CD**
- Responsive layout for desktop, tablet, and mobile
- Clean, professional styling

## Tech stack

| Area | Technology |
|------|------------|
| Framework | React |
| Build tool / dev server | Vite |
| Linting | ESLint |
| Hosting (production) | Web server on Amazon EC2 (e.g. Nginx) behind an ALB and CloudFront |

## Project structure

> Adjust this to match the actual repository once the app is built.

```
App/
├── public/              # Static files copied as-is into the build (e.g. favicon, health.html)
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable UI components (Navbar, StatusCard, Footer, ...)
│   ├── pages/           # Home, About, Dashboard, Contact
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # Vite HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
└── README.md            # This file
```

## Prerequisites

- **Node.js** (current LTS version recommended)
- **npm** (installed with Node.js)
- **Git**

Check your versions:

```bash
node --version
npm --version
git --version
```

## Getting started

Run these commands **locally** on your own computer.

```bash
# 1. Clone the repository (replace the URL with your team's repository)
git clone <REPOSITORY_URL>

# 2. Move into the app directory
cd <REPOSITORY_NAME>/App

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

**Expected output:** Vite prints a local address, typically `http://localhost:5173/`. Open it in your browser to see the app. Changes you save are reloaded automatically (HMR).

## Available scripts

Run all scripts from the `App/` directory.

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs ESLint to check code quality |

## Status cards: how they work

The Dashboard shows status cards for HTTPS, load balancing, CDN, and CI/CD.

**Important rule:** a card must **not** claim that something is operational unless that condition has actually been checked. Acceptable approaches:

- **Real checks:** for example, HTTPS can be derived from `window.location.protocol === "https:"`, and a health endpoint can be fetched to confirm the backend responds.
- **Honest labels:** if a status cannot be verified from the browser (for example, whether CI/CD last succeeded), show it as "Not verified" or "Configured, unverified" instead of "Active".

Do not hard-code "Operational" for infrastructure that has not been tested.

## Building for production

```bash
npm run build
```

**Expected output:** a `dist/` directory containing `index.html` and hashed JavaScript/CSS files under `dist/assets/`.

To test the production build locally:

```bash
npm run preview
```

> `dist/` is generated output. Do not commit it. Make sure it is listed in `.gitignore`.

## Deployment overview

Request path:

```
Browser → HTTPS → CloudFront → ALB → EC2 (web server serving dist/)
```

High-level steps:

1. Build the app (`npm run build`).
2. Copy the contents of `dist/` to the web root on the EC2 instance (for example, `/var/www/mycloudapp/`).
3. Ensure the web server serves `index.html` for all routes (required for single-page app routing).
4. Confirm the ALB target group reports the instance as **healthy**.
5. Confirm the app loads through the CloudFront HTTPS URL.

Detailed, tested instructions belong in the project's deployment guide (`docs/deployment-guide.md`). Automated deployment is handled by GitHub Actions using AWS OIDC. See `docs/cicd.md` once it has been written.

**Never commit** AWS credentials, private keys (`.pem` files), or GitHub tokens.

## Health check

The ALB target group needs a URL that returns HTTP 200. Recommended approach: add a small static file at `App/public/health.html` so it is copied into the build.

```html
<!doctype html>
<html><body>OK</body></html>
```

Configure the ALB health check path as `/health.html`.

**Verify locally:**

```bash
npm run build && npm run preview
# In another terminal:
curl -i http://localhost:4173/health.html
```

**Expected output:** `HTTP/1.1 200 OK`.

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| `npm install` fails | Outdated Node.js or network issue | Check `node --version`, update to LTS, retry |
| Port 5173 already in use | Another dev server is running | Stop it, or run `npm run dev -- --port 3000` |
| Blank page after deployment | Wrong web root or missing build files | Confirm `index.html` and `assets/` exist in the web root |
| 404 when refreshing a page like `/about` | Server not configured for SPA routing | Configure the web server to fall back to `index.html` |
| ALB target shows **unhealthy** | Wrong health check path, port, or security group | Check the path returns 200 and the instance's security group allows the ALB |
| Changes not visible via CloudFront | Cached content | Create a CloudFront invalidation (`/*`) and retry |

## Contributing

- Create a feature branch from `develop` (or the branch defined in the team's branching strategy): `feature/<short-description>`.
- Make small, focused commits with clear messages.
- Open a pull request and request a review before merging.
- Link the related Trello card and GitHub issue in the pull request description.
- Run `npm run lint` and `npm run build` before opening a pull request.

## Team

| Role | Name |
|------|------|
| Frontend | _Michael_ |
| Infrastructure | _Philip_ |
| CI/CD | _Bright_ |
| Security & documentation | _Sandra_ |
| Coordination | _Philipa_ |

_Fill in names once ownership is confirmed on the Trello board._
