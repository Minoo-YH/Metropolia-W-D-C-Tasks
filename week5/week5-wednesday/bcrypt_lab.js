const bcrypt = require('bcrypt');


async function main() {
   const password = "mySecurePassword";
   const wrongPassword = "wrongPassword";
    const cost = 10;

    // Hash the password
   
    console.log("=== Step 3: Store hash (like register) ===");
  const storedHash = await bcrypt.hash(password, cost); // خودش salt می‌سازه
  console.log("Stored hash (save in DB):", storedHash);

  console.log("\n=== Step 4: Compare (like login) ===");
  console.log("Compare correct password:", await bcrypt.compare(password, storedHash)); // true
  console.log("Compare wrong password:", await bcrypt.compare(wrongPassword, storedHash)); // false

  console.log("\n=== Step 5: Why re-hash is wrong ===");
  const rehash = await bcrypt.hash(password, cost); // salt جدید => hash جدید
  console.log("Rehashed same password:", rehash);
  console.log("Rehash equals storedHash?", rehash === storedHash); // false




}
main().catch(console.error);
















//console.log("bcrypt loaded successfully");