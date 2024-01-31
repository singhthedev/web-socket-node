const socket = io();

const sender = document.querySelector("#Name");
const text = document.querySelector("#textmessage");
const submit = document.querySelector("#send");
const contents = document.querySelector("#message");

submit.addEventListener("click", () => {
  const message = text.value.trim();
  if (message) {
    socket.emit("chat", {
      message: text.value,
      sender: sender.innerHTML,
    });
    text.value = "";
  }
});

socket.on("chat", (data) => {
  const { sender, message } = data;
  const listItem = document.createElement("li");
  listItem.textContent = `${sender}: ${message}`;
  contents.appendChild(listItem);
});
