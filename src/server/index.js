import restify from 'restify';
import connector from '../controllers/connector';

// Setup Restify Server
const server = restify.createServer();

server.post('/api/messages', connector.listen());

server.listen(process.env.port, function () {
   console.log('%s listening to %s', server.name, server.url);
});
