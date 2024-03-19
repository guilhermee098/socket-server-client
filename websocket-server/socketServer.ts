import { WebSocketServer } from "ws";
import { calculate } from "./services/mathOperations";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("digite a porta para o servidor rodar: ", (port) => {
  startServer(parseInt(port));
  rl.close();
});

function startServer(port: number) {
  const server = new WebSocketServer({ port });

  server.on("connection", (ws) => {
    ws.on("message", (message) => {
      console.log(`recebeu: ${message}`);
      const resultado = calculate(message.toString());
      console.log(`enviou: ${resultado}`);
      ws.send(resultado.toString());
    });
  });

  server.on("error", (error) => {
    console.error("erro no servidor socket:", error);
  });
}
