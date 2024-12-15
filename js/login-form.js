const loginForm = document.querySelector("#loginForm");
if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("../users.json")
      .then((response) => response.json())
      .then((users) => {
        const admin = users.find(
          (user) => user.login === username && user.password === password
        );
        if (admin) {
          window.location.href = "add_product.html";
        }
      });
  });
