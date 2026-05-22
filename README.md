# 🚀 Toastyyy CI/CD & Vercel Deployment Guide

Welcome to the automated CI/CD deployment guide for **Toastyyy**! This project is pre-configured with a robust **GitHub Actions** pipeline that automatically verifies, builds, and deploys your website to **Vercel** on every push.

---

## 🛠️ How the CI/CD Pipeline Works

We have set up a workflow file in `.github/workflows/deploy.yml` that monitors your repository activity:

*   **Pushes to `main` or `master`**: Automatically triggers a **Production Deployment** to your live domain.
*   **Pushes to other branches or Pull Requests**: Automatically triggers a **Preview Deployment** (generates a unique, temporary URL) so you can safely review and test changes before merging.

### 🛡️ Quality Gate (Continuous Integration)
Before Vercel deployment begins, the workflow enforces a quality gate to prevent broken builds:
1.  **Dependency Caching**: Utilizes `pnpm` caching to make builds lightning-fast.
2.  **Lint Check**: Runs `pnpm run lint` to enforce clean coding standards.
3.  **Compilation & Build Check**: Runs `pnpm run build` (`tsc && vite build`) to verify that the project compiles cleanly without TypeScript or bundler errors.

---

## 🔑 Step-by-Step Configuration Guide

To enable automated deployments, you need to connect your GitHub repository to your Vercel account by setting up **three Repository Secrets** in GitHub.

### Step 1: Create a Vercel Access Token
This token authorizes GitHub Actions to access your Vercel account.
1.  Go to your [Vercel Account Tokens Settings](https://vercel.com/account/tokens).
2.  Click **Create** to generate a new token.
3.  Give it a descriptive name (e.g., `GitHub Actions - Toastyyy`).
4.  Set the Scope to your account or team.
5.  Click **Create** and **copy the token immediately** (it will only be shown once).

### Step 2: Retrieve Vercel Org ID and Project ID
You need to identify your organization (or user account) and project on Vercel.

#### Option A: Using the Vercel CLI (easiest & recommended)
1.  Open your terminal and install the Vercel CLI globally:
    ```bash
    npm install --global vercel@latest
    ```
2.  Log in to your account:
    ```bash
    vercel login
    ```
3.  Link your local repository to a Vercel project (run this in the root of the `Toasty` folder):
    ```bash
    vercel link
    ```
    *Follow the prompts to select your personal account or team, and create a new project named `toastyyy`.*
4.  This creates a local file `.vercel/project.json` containing the IDs. Open this file to copy:
    *   `orgId` (your Vercel Org ID)
    *   `projectId` (your Vercel Project ID)

#### Option B: From the Vercel Dashboard Web UI
*   **VERCEL_ORG_ID (Org / Team ID)**:
    *   If you are using a **personal account**, navigate to your Account Settings. Your Org ID is your Account ID.
    *   If you are using a **Team account**, go to your Team Settings -> General, and look for the **Team ID** (starts with `team_`).
*   **VERCEL_PROJECT_ID**:
    *   Go to your Project Dashboard on Vercel.
    *   Click on **Settings** in the top navigation menu -> **General**.
    *   Scroll down to the **Project ID** section and copy the ID.

---

### Step 3: Add Secrets to GitHub
Add the credentials securely as environment secrets in your GitHub repository:
1.  Go to your project repository on **GitHub**.
2.  Click on **Settings** along the top menu bar.
3.  In the left-hand sidebar, expand **Secrets and variables** and click **Actions**.
4.  Click the **New repository secret** button.
5.  Add the following three secrets:

| Secret Name | Value | Description |
| :--- | :--- | :--- |
| `VERCEL_TOKEN` | *`<Your Vercel Access Token>`* | The personal access token created in Step 1. |
| `VERCEL_ORG_ID` | *`<Your Vercel orgId>`* | The Vercel Organization or Account ID. |
| `VERCEL_PROJECT_ID` | *`<Your Vercel projectId>`* | The Vercel Project ID. |

> [!NOTE]
> The workflow includes a graceful check. If these secrets are not configured yet, the build validation (Lint & TypeScript compilation) will still run on every commit, but the deployment steps will be skipped with a warning.

---

## ⚡ Alternative: Vercel Native GitHub Integration

If you want a zero-maintenance setup without managing GitHub Actions or access tokens, Vercel provides a seamless native integration.

### How to set it up:
1.  Go to your [Vercel Dashboard](https://vercel.com).
2.  Click **Add New** -> **Project**.
3.  Click **Import** next to your Toastyyy GitHub repository.
4.  Vercel will auto-detect the Vite framework. Keep the default settings and click **Deploy**.

### ⚖️ Actions Pipeline vs. Native Integration

| Feature | GitHub Actions Workflow (This Setup) | Vercel Native Integration |
| :--- | :--- | :--- |
| **Lint checks** | 🟢 **Yes** (Blocks deployment if code is messy) | 🔴 No (Deploys even if ESLint fails) |
| **Strict Typecheck** | 🟢 **Yes** (Blocks deployment if TypeScript fails) | 🔴 No (Only checks production bundle) |
| **Custom Steps** | 🟢 **Yes** (Can add automated testing, Slack alerts, etc.) | 🔴 No (Only runs standard Vercel pipeline) |
| **Setup Overhead** | 🟡 Requires copying 3 secrets to GitHub | 🟢 One-click authorization |
