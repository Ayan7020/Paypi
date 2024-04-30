import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt" 

const prisma = new PrismaClient();

async function main() {
    const Axil = await prisma.user.upsert({
        where: { number: '88888888' },
        update: {},
        create: {
            number: '1111111111',
            password: await bcrypt.hash('Axil@702002',10),
            name: 'Axil1',
            Balance: {
              create: {
                  amount: 20000,
                  locked: 0
              }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20000,
                    token: "156",
                    provider: "HDFC Bank",
                },
            },
          },
    }) 
    const blob = await prisma.user.upsert({
        where: { number: '2222222222' },
        update: {},
        create: {
          number: '2222222222',
          password: await bcrypt.hash('blob@702002',10),
          name: 'blob',
          Balance: {
            create: {
                amount: 2000,
                locked: 0
            }
          },
          OnRampTransaction: {
            create: {
              startTime: new Date(),
              status: "Failure",
              amount: 2000,
              token: "157",
              provider: "HDFC Bank",
            },
          },
        },
      })
      console.log({ Axil, blob })
}

main().then(async () => {
    await prisma.$disconnect()  
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
