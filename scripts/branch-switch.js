import { execSync } from "child_process";

// Color helpers
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";

function logBanner(branchName, actionMsg) {
  console.log(`\n${CYAN}┌────────────────────────────────────────────────────────┐${RESET}`);
  console.log(`${CYAN}│${RESET}  🍞 ${BOLD}Toastyyy Workflow Automation${RESET}                       ${CYAN}│${RESET}`);
  console.log(`${CYAN}├────────────────────────────────────────────────────────┤${RESET}`);
  console.log(`${CYAN}│${RESET}  Target Branch :  ${GREEN}${branchName.padEnd(38)}${RESET} ${CYAN}│${RESET}`);
  console.log(`${CYAN}│${RESET}  Action        :  ${CYAN}${actionMsg.padEnd(38)}${RESET} ${CYAN}│${RESET}`);
  console.log(`${CYAN}└────────────────────────────────────────────────────────┘${RESET}\n`);
}

function logError(msg) {
  console.error(`\n${RED}❌ ${BOLD}Workflow Error:${RESET} ${RED}${msg}${RESET}\n`);
}

function getUncommittedChanges() {
  try {
    const status = execSync("git status --porcelain", { encoding: "utf8" }).trim();
    return status ? status.split("\n") : [];
  } catch (error) {
    logError("Failed to check git status.");
    process.exit(1);
  }
}

const targetBranch = process.argv[2];

if (!targetBranch || (targetBranch !== "dev" && targetBranch !== "prod")) {
  logError("Invalid or missing target branch. Use 'dev' or 'prod'.");
  process.exit(1);
}

// 1. Get current branch
let currentBranch = "";
try {
  currentBranch = execSync("git branch --show-current", { encoding: "utf8" }).trim();
} catch (error) {
  logError("Failed to retrieve current git branch. Make sure git is installed and initialized.");
  process.exit(1);
}

// 2. If already on target branch, proceed immediately
if (currentBranch === targetBranch) {
  logBanner(targetBranch, `Already on ${targetBranch} branch. Starting environment...`);
  process.exit(0);
}

// 3. Switch branch safety checks
console.log(`${YELLOW}🔄 Preparing to switch branch: ${currentBranch} ➡️ ${targetBranch}...${RESET}`);

const dirtyFiles = getUncommittedChanges();
if (dirtyFiles.length > 0) {
  console.error(`${RED}┌────────────────────────────────────────────────────────┐${RESET}`);
  console.error(`${RED}│ ⚠️  BLOCKED: Uncommitted changes detected!            │${RESET}`);
  console.error(`${RED}├────────────────────────────────────────────────────────┤${RESET}`);
  dirtyFiles.slice(0, 5).forEach((file) => {
    console.error(`${RED}│${RESET}   ${file.padEnd(52)} ${RED}│${RESET}`);
  });
  if (dirtyFiles.length > 5) {
    console.error(`${RED}│${RESET}   ... and ${dirtyFiles.length - 5} more files.`.padEnd(57) + `${RED}│${RESET}`);
  }
  console.error(`${RED}└────────────────────────────────────────────────────────┘${RESET}`);
  logError(`Please commit or stash your changes before switching to '${targetBranch}'.`);
  process.exit(1);
}

// 4. Perform checkout
try {
  console.log(`${YELLOW}Checking out '${targetBranch}'...${RESET}`);
  execSync(`git checkout ${targetBranch}`, { stdio: "inherit" });
  logBanner(targetBranch, `Switched branch successfully! Starting environment...`);
  process.exit(0);
} catch (error) {
  logError(`Failed to checkout branch '${targetBranch}'.`);
  process.exit(1);
}
