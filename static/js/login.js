const login_form = document.getElementById("login_form");

login_form.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = e.target.email.value;
  let password = e.target.password.value;

  if (!email || !password) {
    alert("silakan lengkapi data");
    return;
  }

  fetch("http://0.0.0.0:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.accessToken) {
        alert("Login Berhasil");
        sessionStorage.setItem("userData", JSON.stringify(data));
        window.location.href = "/dashboard";
        return;
      }

      alert(data);
    })
    .catch((err) => {
      console.error(err);
    });
});
