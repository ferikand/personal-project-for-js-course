document.querySelector("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("../users.json")
    .then((response) => response.json())
    .then((users) =>
      users.find(
        (user) => user.username === username && user.password === password
      )
    )
    .then((window.location.href = "add_product.html"));
});
