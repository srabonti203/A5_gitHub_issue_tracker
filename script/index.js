const signinBtn = document.getElementById("signin-btn");
signinBtn.addEventListener("click", () => {
  const username = document.getElementById("username");
  usernameValue = username.value;
  const password = document.getElementById("password");
  passwordValue = password.value;
  if (usernameValue === "admin" && passwordValue === "admin123") {
    alert("login successful");
    window.location.assign("./home.html");
  } else {
    alert("invalid username or password");
  }
});
