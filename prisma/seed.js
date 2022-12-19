// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require('prisma')
const prisma = PrismaClient()

async function main() {
  const admin = await prisma.role.upsert({
    create: [
      {
        name: 'Admin'
      },
      {
        name: 'User'
      }
    ]
  })

  console.log(admin);
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => [
  await prisma.$disconnect()
])