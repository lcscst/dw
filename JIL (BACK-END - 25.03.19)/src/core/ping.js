import ping from 'ping';

async function pingMachine(ip) {
    try {
        const res = await ping.promise.probe(ip);
        return res.alive;
    } catch (err) {
        console.error(`Error pinging ${ip}`, err);
        return false;
    }
}

export default pingMachine;
