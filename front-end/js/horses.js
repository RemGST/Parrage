"use strict";

let btnEdit = document.querySelector(".btnEdit");
let isEditing = false;

btnEdit.addEventListener("click", toggleEditSave);

function toggleEditSave() {
    if (isEditing) {
        saveHorses();
    } else {
        editHorses();
    }
}

function editHorses() {
    console.log("edit");
    const table = document.getElementById("myTable");

    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < 2; j++) {
            table.rows[i].cells[j].setAttribute("contenteditable", true);
        }
    }

    const allDates = document.querySelectorAll("#date");
    allDates.forEach((e) => {
        e.disabled = false;
    });

    const doneBtn = document.querySelectorAll("#doneBtn");
    doneBtn.forEach((e) => {
        e.disabled = false;
    });

    btnEdit.innerHTML = "Save";
    btnEdit.classList.remove("btnEdit");
    btnEdit.classList.add("btnSave");

    isEditing = true;
}

function saveHorses() {
    console.log("save");

    const table = document.getElementById("myTable");

    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < 2; j++) {
            table.rows[i].cells[j].removeAttribute("contenteditable");
        }
    }

    const allDates = document.querySelectorAll("#date");
    allDates.forEach((e) => {
        e.disabled = true;
    });

    const doneBtn = document.querySelectorAll("#doneBtn");
    doneBtn.forEach((e) => {
        e.disabled = true;
    });

    btnEdit.innerHTML = "Edit";
    btnEdit.classList.remove("btnSave");
    btnEdit.classList.add("btnEdit");

    isEditing = false;
}
