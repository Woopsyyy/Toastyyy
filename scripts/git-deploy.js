import { execSync } from "child_process";
import readline from "readline";

// Color helpers
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";

function logBanner(branchName, actionMsg) {
  console.log(`\n${CYAN}┌────────────────────────────────────────────────────────┐${RESET}`);
  console.log(`${CYAN}│${RESET}  🚀 ${BOLD}Toastyyy Push & Deploy Engine${RESET}                      ${CYAN}│${RESET}`);
  console.log(`${CYAN}├────────────────────────────────────────────────────────┤${RESET}`);
  console.log(`${CYAN}│${RESET}  Target Branch :  ${GREEN}${branchName.padEnd(38)}${RESET} ${CYAN}│${RESET}`);
  console.log(`${CYAN}│${RESET}  Action        :  ${CYAN}${actionMsg.padEnd(38)}${RESET} ${CYAN}│${RESET}`);
  console.log(`${CYAN}└────────────────────────────────────────────────────────┘${RESET}\n`);
}

function logError(msg) {
  console.error(`\n${RED}❌ ${BOLD}Deployment Error:${RESET} ${RED}${msg}${RESET}\n`);
}

// Interactive helper to ask the user a question in the terminal
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });
};

async function main() {
  const targetBranch = process.argv[2];

  if (!targetBranch || targetBranch !== "dev") {
    logError("This deploy automation script strictly targets the 'dev' branch.");
    process.exit(1);
  }

  // 1. Get current branch
  let currentBranch = "";
  try {
    currentBranch = execSync("git branch --show-current", { encoding: "utf8" }).trim();
  } catch (error) {
    logError("Failed to retrieve current git branch.");
    process.exit(1);
  }

  // 2. Prevent accidental deployment from the wrong branch
  if (currentBranch !== "dev") {
    logError(`Refusing deployment. You are currently on branch '${currentBranch}', but this script targets 'dev'.\nPlease switch to 'dev' branch first.`);
    process.exit(1);
  }

  // 3. Check for uncommitted changes
  let dirtyFiles = [];
  try {
    const status = execSync("git status --porcelain", { encoding: "utf8" }).trim();
    dirtyFiles = status ? status.split("\n") : [];
  } catch (error) {
    logError("Failed to check git status.");
    process.exit(1);
  }

  logBanner("dev", "Starting interactive push/deploy on dev branch...");

  // 4. Staging & Committing with Interactive Message Prompt
  if (dirtyFiles.length > 0) {
    console.log(`${YELLOW}Found ${dirtyFiles.length} uncommitted file(s) in your workspace:${RESET}`);
    dirtyFiles.slice(0, 5).forEach((file) => console.log(`  - ${file}`));
    if (dirtyFiles.length > 5) {
      console.log(`  ... and ${dirtyFiles.length - 5} more files.`);
    }

    console.log(`\n${CYAN}💬 Staging changes...${RESET}`);
    try {
      execSync("git add .", { stdio: "inherit" });
    } catch (error) {
      logError("Staging changes failed.");
      process.exit(1);
    }

    // Loop until user provides a non-empty message
    let commitMsg = "";
    console.log("");
    while (!commitMsg) {
      commitMsg = await askQuestion(`${BOLD}${CYAN}👉 Enter your commit message: ${RESET}`);
      if (!commitMsg) {
        console.log(`${RED}❌ Commit message cannot be empty. Please enter a valid message.${RESET}`);
      }
    }

    try {
      console.log(`\n${YELLOW}Creating commit: "${commitMsg}"...${RESET}`);
      execSync(`git commit -m "${commitMsg}"`, { stdio: "inherit" });
    } catch (error) {
      logError("Git commit operation failed.");
      process.exit(1);
    }
  } else {
    console.log(`${GREEN}Working tree is already clean. Proceeding to push local commits...${RESET}`);
  }

  // 5. Perform remote push
  try {
    console.log(`\n${YELLOW}Pushing local commits to remote 'dev'...${RESET}`);
    execSync("git push origin dev", { stdio: "inherit" });
    console.log(`\n${GREEN}✅ Successfully auto-deployed and pushed your code to origin dev!${RESET}\n`);
    process.exit(0);
  } catch (error) {
    logError("Push to origin dev failed. Check your connection or repository permissions.");
    process.exit(1);
  }
}

main();
