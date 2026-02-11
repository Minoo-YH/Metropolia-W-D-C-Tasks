const bcrypt = require("bcrypt");

function sleepTicks() {
  let count = 0;
  const timer = setInterval(() => {
    count++;
    process.stdout.write(".");
    if (count === 50) {
      clearInterval(timer);
      console.log("\n(tick demo finished)");
    }
  }, 200);
  return timer;
}

async function asyncHashDemo() {
  console.log("\n=== ASYNC hash demo ===");
  console.log("If async works well, dots should print WHILE hashing...\n");

  sleepTicks();

  const password = "mySecurePassword";
  const cost = 12; // کمی سنگین‌تر تا اثر واضح‌تر بشه
  const hash = await bcrypt.hash(password, cost);

  console.log("\n\nAsync hash done ✅");
  console.log("Hash prefix:", hash.split("$").slice(0, 3).join("$") + "$");
}

function syncHashDemo() {
  console.log("\n=== SYNC hash demo ===");
  console.log("If sync blocks, dots will STOP until hashing finishes...\n");

  sleepTicks();

  const password = "mySecurePassword";
  const cost = 12;

  const hash = bcrypt.hashSync(password, cost);

  console.log("\n\nSync hash done ✅");
  console.log("Hash prefix:", hash.split("$").slice(0, 3).join("$") + "$");
}

async function main() {
  // اول async رو تست کن
  await asyncHashDemo();

  // بعد sync رو تست کن
  syncHashDemo();
}

main().catch(console.error);

















//console.log("bcrypt loaded successfully");