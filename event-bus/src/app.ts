import server from './server';

const PORT = 4005;

server.listen(PORT, () => {
    console.log(`Listen on ${PORT}`);
})