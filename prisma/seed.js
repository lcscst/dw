import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await argon2.hash('12345'),
        }
    });

    const root = await prisma.user.create({
        data: {
            username: 'root',
            password: await argon2.hash('toor'),
        }
    });

    const teste = await prisma.user.create({
        data: {
            username: 'teste',
            password: await argon2.hash('teste'),
        }
    });

    console.log(`Users created: ${admin.username}, ${root.username}, ${teste.username}`);

    const machine1 = await prisma.machine.create({
        data: {
            name: 'Banco de Dados',
            ip: '192.168.10.1',
            ram: 8,
            hd: 256,
            userId: admin.id
        }
    });

    const machine2 = await prisma.machine.create({
        data: {
            name: 'pfSense',
            ip: '192.168.10.2',
            ram: 16,
            hd: 512,
            userId: root.id
        }
    });

    console.log(`Machines created: ${machine1.name}, ${machine2.name}`);

    const log1 = await prisma.logs.create({
        data: {
            machineId: machine1.id,
            cpuUsage: 20.5,
            memoryUsage: 50.3
        }
    });

    const log2 = await prisma.logs.create({
        data: {
            machineId: machine2.id,
            cpuUsage: 10.2,
            memoryUsage: 30.1
        }
    });

    console.log(`Logs created: ${log1.id}, ${log2.id}`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);

        await prisma.$disconnect();
        process.exit(1);
    });
