const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async(req, res) => {
    const result = await prisma.task.findMany();
    return res.json({ result });
});

router.get('/first/:status', async(req, res) => {
    const { status } = req.params;
    const done = status == 'true' ? true : false;
    const result = await prisma.task.findFirst({ where: { done }});
    return res.json({ result });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const result = await prisma.task.findUnique({ where: { id: parseInt(id) }});
    return res.json({ result });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, done } = req.body;
    await prisma.task.update({ where: { id: parseInt(id) } ,  data: { name, done } });
    return res.status(204).end();
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: parseInt(id) }});
    return res.status(204).end();
});

router.post('/', async(req, res) => {
    const { name, done } = req.body;
    const result = await prisma.task.create({ data: { name, done } });
    return res.status(201).json({ result });
});


module.exports = router;