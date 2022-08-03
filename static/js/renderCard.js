window.deleteList = (id) => {
  let conf = confirm("Yakin delete ?");

  if (!conf) {
    return;
  }

  fetch(`http://0.0.0.0:8000/shopping_list/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return renderCard();
      }
    })
    .catch((err) => console.error(err));
};

export function renderCard() {
  let card_wrapper = document.getElementById("card_wrapper");
  card_wrapper.innerHTML = "";
  let userData = JSON.parse(sessionStorage.getItem("userData"));

  fetch(`http://0.0.0.0:8000/shopping_list?userId=${userData.user.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.info(data);
      data.map((e, i) => {
        card_wrapper.innerHTML += `
          <div class="card_item">
            <p>${i + 1}</p>
            <p>${e.title}</p>
            <span class="material-symbols-outlined delete_list_icon" id="delete_list_icon" onclick="deleteList(${
              e.id
            })">
              delete
            </span>
          </div>
        `;
      });
    })
    .catch((err) => console.error(err));
}

renderCard();
