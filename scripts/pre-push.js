import { execSync } from "child_process";
import readline from "readline";

// Color helpers
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";

function logHookError(title, details = []) {
  console.error(`\n${RED}┌────────────────────────────────────────────────────────┐${RESET}`);
  console.error(`${RED}│ 🛑 GIT PUSH REJECTED: ${title.padEnd(32)} │${RESET}`);
  console.error(`${RED}├────────────────────────────────────────────────────────┤${RESET}`);
  details.forEach((line) => {
    console.error(`${RED}│${RESET}   ${line.padEnd(52)} ${RED}│${RESET}`);
  });
  console.error(`${RED}└────────────────────────────────────────────────────────┘${RESET}\n`);
}

// Check for uncommitted changes
function hasUncommittedChanges() {
  try {
    const status = execSync("git status --porcelain", { encoding: "utf8" }).trim();
    return !!status;
  } catch (error) {
    return true; // Assume unsafe on error
  }
}

// Retrieve local active branch
function getLocalBranch() {
  try {
    return execSync("git branch --show-current", { encoding: "utf8" }).trim();
  } catch (error) {
    return "";
  }
}

// Buffer stdin lines to identify what references are being pushed
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let isPushBlocked = false;
let blockReason = "";
let blockDetails = [];

rl.on("line", (line) => {
  // Line format: <local ref> <local sha1> <remote ref> <remote sha1>
  const parts = line.split(/\s+/);
  if (parts.length < 4) return;

  const localRef = parts[0];
  const remoteRef = parts[2];

  // We are interested in pushes targeting the production branch
  const isTargetingProd = remoteRef === "refs/heads/prod" || remoteRef.endsWith("/prod");

  if (isTargetingProd) {
    const currentLocalBranch = getLocalBranch();

    // Safety check 1: Enforce branch alignment (must be on local 'prod' branch to push to remote 'prod')
    if (currentLocalBranch !== "prod") {
      isPushBlocked = true;
      blockReason = "Branch Mismatch Gate";
      blockDetails = [
        `You are attempting to push to remote 'prod' branch`,
        `while checked out on local branch '${currentLocalBranch}'.`,
        "",
        `Please switch to the 'prod' branch first, or use:`,
        `  npm run deploy:prod`
      ];
      return;
    }

    // Safety check 2: Enforce clean working tree before pushing to production
    if (hasUncommittedChanges()) {
      isPushBlocked = true;
      blockReason = "Uncommitted Changes Gate";
      blockDetails = [
        "You have uncommitted local changes.",
        "Pushing to production with a dirty tree is blocked.",
        "",
        "Please commit or stash your changes before pushing:",
        "  git status"
      ];
      return;
    }
  }
});

rl.on("close", () => {
  if (isPushBlocked) {
    logHookError(blockReason, blockDetails);
    process.exit(1);
  }
  process.exit(0);
});
