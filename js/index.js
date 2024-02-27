import { createRow, validate } from "./function.js";

const tbody = document.querySelector("#tbody");
const form = document.getElementById("form");
const name = document.getElementById("name");
const status = document.getElementById("status");
const description = document.getElementById("description");
const price = document.getElementById("price");
const btn = document.getElementById("btn");

btn &&
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const isValid = validate(name, price, status, description);
    if (isValid) {
      const phone = {
        name: name.value,
        status: status.value,
        description: description.value,
        price: price.value,
        category_id: 2,
      };
      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(phone),
      })
        .then(res => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://auth-rg69.onrender.com/api/products/all", {
    method: "GET",
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      if (data.length) {
        data.forEach((phone, index) => {
          let row = createRow(phone, index + 1);
          tbody.innerHTML += row;
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
