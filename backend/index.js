// backend/index.js
const express = require('express');
const amqp = require('amqplib');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

async function sendToQueue(test) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'testQueue';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(test)), {
        persistent: true
    });

    console.log(`Test sent to queue: ${test.name}`);
}

app.post('/tests', async (req, res) => {
    const test = req.body;
    await sendToQueue(test);
    res.status(200).send('Teste enfileirado com sucesso');
});

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});
