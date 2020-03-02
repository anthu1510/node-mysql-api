require('dotenv').config();
const http = require('http');

const app = require('./src/config/app');

const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server Started PORT localhost:${PORT}`);
});