// backend/worker.js
const amqp = require('amqplib');
const {exec} = require('child_process');

async function startWorker() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'testQueue';

    await channel.assertQueue(queue, {durable: true});
    console.log('Worker started. Waiting for messages...');

    await channel.consume(queue, (msg) => {
        if (msg !== null) {
            const test = JSON.parse(msg.content.toString());
            console.log(`Executing test: ${test.name}`);

            exec(`npx cypress run --spec ${test.url}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing test: ${error}`);
                    return;
                }
                console.log(`Test output: ${stdout}`);
                channel.ack(msg);
            });
        }
    }, {noAck: false});
}

startWorker();
