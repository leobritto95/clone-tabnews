const { spawn } = require("child_process");

const child = spawn("npm", ["run", "dev:run"], { stdio: "inherit" });

const cleanup = () => {
  spawn("npm", ["run", "postdev"], { stdio: "inherit" });
};

process.on("SIGINT", () => {
  cleanup();
  process.exit();
});

child.on("exit", cleanup);
