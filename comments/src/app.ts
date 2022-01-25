import server from './server';

const PORT = 4001;

server.listen(PORT, () => {
    console.log(`Listen on ${PORT}`);
})