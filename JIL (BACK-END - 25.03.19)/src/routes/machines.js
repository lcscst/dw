import express from 'express';
import prisma from '../core/prisma.js';
import isAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.get('/machines', isAuthenticated, async (req, res) => {

    const machines = await prisma.machine.findMany();

    if (!machines) {
        return res.status(404).json({ message: 'Machines not found' });
    }

    res.json(machines);
});

router.get('/machines/user/:userId', isAuthenticated, async (req, res) => {

    const { userId } = req.params;

    const machines = await prisma.machine.findMany({
        where: {
            userId: parseInt(userId)
        }
    });

    if (!machines) {
        return res.status(404).json({ message: 'Machines not found' });
    }

    res.json(machines);
});

router.post('/machines', isAuthenticated, async (req, res) => {

    const { userId, name, ip, ram, hd } = req.body;

    const machine = await prisma.machine.create({
        data: {
            userId: parseInt(userId),
            name,
            ip,
            ram: parseInt(ram),
            hd: parseInt(hd)
        }
    });

    res.json(machine);
});

router.put('/machines/:id', isAuthenticated, async (req, res) => {

    const { id } = req.params;

    const { name, ip, ram, hd } = req.body;

    const machine = await prisma.machine.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            ip,
            ram,
            hd
        }
    });

    res.json(machine);
});

router.delete('/machines/:id', isAuthenticated, async (req, res) => {

    const { id } = req.params;

    const machine = await prisma.machine.delete({
        where: {
            id: parseInt(id)
        }
    });

    res.json(machine);
});

export default router;
