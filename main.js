const socket = io("", {
	autoConnect: false,
});

socket.on("enter", (messages) => {
	messages.forEach((message) => {
		const item = document.createElement("LI");
		item.innerText = message;
		list.appendChild(item);
	});
});

socket.on("message", (message) => {
	const item = document.createElement("LI");
	item.innerText = message;
	list.appendChild(item);
});

socket.on("connect", () => {
	socket.emit("enter", inp.value);
	btn.value = "Send";
	inp.value = "";
	inp.placeholder = "Message";
});

btn.onclick = () => {
	if (!socket.connected) {
		socket.io.uri = `wss://bugschatroomserver.onrender.com`;
		socket.connect();
		return;
	}

	socket.emit("message", inp.value);
	inp.value = "";
};
