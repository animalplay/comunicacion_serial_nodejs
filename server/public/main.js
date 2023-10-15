console.log("hola");

const socket = io();

var numbers = document.getElementById("numbers");

socket.on("data", function (number) {
  console.log(number);

  var item = document.createElement("li");
  item.textContent = `Han pasado ${number} s`;
  numbers.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
