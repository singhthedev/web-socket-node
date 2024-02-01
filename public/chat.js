// chat.js
document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const sender = document.querySelector("#Name");
  const text = document.querySelector("#textmessage");
  const submit = document.querySelector("#send");
  const contents = document.querySelector("#message");
  const userList = document.querySelector("#userList");

  // Function to fetch user list
  const fetchUserList = () => {
    fetch('/getUsers') // Fetch user list from /users endpoint
      .then(response => response.json())
      .then(users => {
        userList.innerHTML = ''; // Clear previous user list
        users.forEach(user => {
          const listItem = document.createElement('li');
          listItem.textContent = user.username; // Assuming username is the property you want to display
          userList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching user list:', error));
  };

  // Function to send chat message
  const sendMessage = () => {
    const message = text.value.trim();
    if (message) {
      socket.emit("chat", {
        message: text.value,
        sender: sender.innerHTML,
      });
      text.value = "";
    }
  };

  // Event listener for send button click
  submit.addEventListener("click", sendMessage);

  // Event listener for receiving chat messages
  socket.on("chat", (data) => {
    const { sender, message } = data;
    const listItem = document.createElement("li");
    listItem.textContent = `${sender}: ${message}`;
    contents.appendChild(listItem);
  });

  // Fetch user list when the page loads
  fetchUserList();
});
