import WebSocket from "ws";
import readline from "readline";

const serverPorts = [1883, 1884];
let currentServer = 0;
let ws: WebSocket | null = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptForMessage() {
  rl.question("=> ", (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.log("mensagem não enviada.");
    }

    promptForMessage();
  });
}

function connectToServer() {
  const port = serverPorts[currentServer];
  ws = new WebSocket(`ws://localhost:${port}`);

  ws.on("open", function open() {
    console.log(`conectado ao servidor ${port}`);
    promptForMessage();
  });

  ws.on("message", function message(data) {
    console.log(`r: ${data}`);
  });

  ws.on("error", function error(e) {
    console.log(`rrro ao conectar ao servidor`);
    switchServer();
  });

  ws.on("close", function close() {
    console.log("conexão fechada.");
    switchServer();
  });
}

function switchServer() {
  currentServer = (currentServer + 1) % serverPorts.length;
  console.log(`tentando conectar ao outro servidor`);
  setTimeout(connectToServer, 1000);
}

connectToServer();
