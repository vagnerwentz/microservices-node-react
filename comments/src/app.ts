import server from './server';

const PORT = 4001;

server.listen(PORT, () => {
    console.log(`Comments service listen on ${PORT}`);
})