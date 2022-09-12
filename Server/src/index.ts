import {server} from './app';




server.set('port', (process.env.PORT || 5000));

server.listen(server.get('port'), () => {
    console.log('app listening on port', server.get('port'));
});