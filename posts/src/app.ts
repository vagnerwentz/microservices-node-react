import server from './server';

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Posts service listen on ${PORT}`);
})