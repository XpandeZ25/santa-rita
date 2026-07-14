require("dotenv").config();

const bcrypt = require("bcryptjs");
const prisma = require("./prisma");

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@santarita.edu.bo").toLowerCase();
  const plainPassword = process.env.ADMIN_PASSWORD || "admin12345";
  const password = await bcrypt.hash(plainPassword, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { password },
    create: { email, password }
  });

  console.log("Admin listo:");
  console.log(`Email: ${email}`);
  console.log(`Password: ${plainPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
