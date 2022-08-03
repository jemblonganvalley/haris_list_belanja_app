const register_form = document.getElementById("register_form");

register_form.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = e.target.email.value;
  let username = e.target.username.value;
  let password = e.target.password.value;
  let password2 = e.target.password2.value;

  // jika kosong
  if (!email || !username || !password || !password2) {
    alert("Silakan lengkapi data");
    return;
  }

  //password harus sama
  if (password !== password2) {
    alert("Password harus sama");
    return;
  }

  //masukan data ke backend
  fetch("http://0.0.0.0:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.accessToken) {
        alert("registrasi berhasil");

        // redirect to dashboard
        window.location.href = "/dashboard";

        // set session data
        sessionStorage.setItem("userData", JSON.stringify(data));
        return;
      }

      alert(data);
    })
    .catch((err) => console.info(err));
});
