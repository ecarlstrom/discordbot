exports.run = (client, message) => {
    const queueTotal = client.queues.array().reduce((prev, curr) => prev + curr.queue.length, 0);
    const guildTotal = client.queues.array().filter(q => !!q.dispatcher).length;
    message.channel.sendMessage(`Total of ${queueTotal} songs currently queued across ${guildTotal} servers. 🤠`);
};