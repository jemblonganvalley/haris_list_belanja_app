import { renderCard } from "./renderCard.js";

let userData = sessionStorage.getItem("userData");
userData = JSON.parse(userData);

// jika tidak ada data user di session maka redirect ke login
if (!userData) {
  window.location.href = "/login";
}

// show modal add items
let add_icon = document.getElementById("add_icon");
let modal_add_list = document.getElementById("modal_add_list");
let btn_cancel = document.getElementById("btn_cancel");
let form_add_list = document.getElementById("form_add_list");

add_icon.addEventListener("click", () => {
  modal_add_list.style.display = "flex";
});

// hide modal
btn_cancel.addEventListener("click", () => {
  modal_add_list.style.display = "none";
});

// submit title
form_add_list.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    let title = await e.target.title.value;
    let res = await fetch("http://0.0.0.0:8000/shopping_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userData.user.id,
        done: false,
        title: title,
      }),
    });

    if (res.status != 201) {
      return alert("terjadi kesalahan");
    }

    modal_add_list.style.display = "none";
    return renderCard();
  } catch (error) {
    console.error(error);
  }
});
