import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log('Client Connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);

    const payload = JSON.stringify({
        type: 'custom-message',
        payload: data.toString()
    })
    // ws.send(JSON.stringify( payload ));

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(payload, { binary: false });
        }
      });    
  });

//   setInterval(() => {
//     ws.send('Hola de nuevo');
//   }, 2000)

  //ws.send('Hola desde el servidor');

  ws.on('close', () => {
    console.log('Client disconnected');
  })

}); 

console.log('http://localhost:3000');
