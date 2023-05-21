import { createServer } from "http";
import { Server } from "socket.io";

const http = createServer();

const io = new Server(http, {
	cors: { origin: "*" },
});

let users = {};
let messages = [];

io.on("connection", (socket) => {
	socket.on("enter", (name) => {
		users[socket.id] = name;

		const connectMessage = `${users[socket.id]} connected`;
		console.log(connectMessage);

		io.to(socket.id).emit("enter", messages);
		io.emit("message", connectMessage);
		messages.push(connectMessage);
	});

	socket.on("message", (message) => {
		const string = `${users[socket.id]} said \t\t\t ${message}`;
		messages.push(string);
		io.emit("message", string);
	});
});

http.listen(8080, () => console.log("listening on port 8080"));
