import express from 'express';
import prisma from '../core/prisma.js';
import isAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.get('/users', isAuthenticated, async (req, res) => {
    
    const users = await prisma.user.findMany();

    if (!users) {
        res.status(404).send('Users not found');
    }

    res.json(users);
});

router.get('/users/me', isAuthenticated, async (req, res) => {

    const user = await prisma.user.findUnique({
        where: {
            id: req.userId,
            username: req.username
        },
        select: {
            id: true,
            username: true
        }
    });

    if (!user) {
        res.status(404).send('User not found');
    }

    res.json(user);
});

export default router;
