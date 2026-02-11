const bcrypt = require('bcrypt');


async function step1_showSalt() {
   const cost = 10;
    const salt = await bcrypt.genSalt(10);

  console.log("=== Step 1: Salt ===");
  console.log("Cost factor:", cost);
  console.log("Salt:", salt);

const parts= salt.split('$');
console.log("Parsed salt => version:", parts[1], "| cost:", parts[2]);
}

step1_showSalt().catch(console.error);
















//console.log("bcrypt loaded successfully");