import server from './server';

const PORT = 4002;

server.listen(PORT, () => {
    console.log(`Listen on ${PORT}`);
})