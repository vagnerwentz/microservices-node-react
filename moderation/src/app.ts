import server from './server';

const PORT = 4003;

server.listen(PORT, () => {
    console.log(`Moderation service listen on ${PORT}`);
})