const bcrypt = require('bcrypt');


async function step2_hashPassword() {
   const password = "mySecurePassword";
    const cost = 10;

    const salt = await bcrypt.genSalt(cost);
  const hash = await bcrypt.hash(password, salt);

console.log("\n=== Step 2: Hash ===");
  console.log("Plain password:", password);
  console.log("Salt:", salt);
  console.log("Hash:", hash);

const hashParts = hash.split("$");
  console.log("Parsed hash => version:", hashParts[1], "| cost:", hashParts[2]);
  console.log("Salt+hash payload length:", hashParts[3].length);
}
step2_hashPassword().catch(console.error);
















//console.log("bcrypt loaded successfully");