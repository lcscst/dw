import express from 'express';
import prisma from '../core/prisma.js';
import ping from '../core/ping.js';
import isAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.post('/ping', isAuthenticated, async (req, res) => {

    const { ip } = req.body;

    const result = await prisma.machine.findFirst({
        where: {
            ip: ip
        },
        select: {
            name: true,
            ip: true
        }
    });

    const isAlive = await ping(result.ip);

    return res.json({
        name: result.name,
        ip: result.ip,
        isAlive: isAlive
    });

});

export default router;
