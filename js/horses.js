"use strict";
import Horse from "./Horse.js";

const horseArray = [];

let btnEdit = document.querySelector(".btnEdit");
let isEditing = false;

const btnAdd = document.querySelector(".btnAdd");
btnAdd.addEventListener("click", addHorse);

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

    const doneBtn = document.querySelectorAll("#btnDone");
    doneBtn.forEach((e) => {
        e.disabled = false;
    });

    btnEdit.innerHTML = "Sauvegarder";
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

    const doneBtn = document.querySelectorAll("#btnDone");
    doneBtn.forEach((e) => {
        e.disabled = true;
    });

    btnEdit.innerHTML = "Modifier";
    btnEdit.classList.remove("btnSave");
    btnEdit.classList.add("btnEdit");

    isEditing = false;
}

function getHorses() {
    fetch("http://localhost:3000/getHorses")
        .then((result) => result.json())
        .then((res) => {
            console.log(res);
            res.forEach((e) => {
                console.log();

                const dernierParage = e.Dernier_Parage.slice(0, 10);
                const prochainParage = e.Prochain_Parage.slice(0, 10);

                const horse = new Horse(
                    e._id,
                    e.Nom,
                    e.Ecurie,
                    dernierParage,
                    prochainParage,
                    e.Paré
                );
                horseArray.push(horse);
            });
            console.log(horseArray);
            renderTable();
        });
}

function renderTable() {
    const table = document.querySelector("#myTable");
    horseArray.forEach((horse) => {
        table.insertAdjacentHTML(
            "beforeend",
            `
        <tr>
            <td>
                ${horse.name}
            </td>
            <td>
                ${horse.stable}
            </td>
            <td>
            <input id="date" type="date" value="${horse.lastTrim}" disabled>
            </td>
            <td>
            <input id="date" type="date" value="${horse.nextTrim}" disabled>
            </td>
            <td>
                <input id="btnDone" type="checkbox" disabled>
            </td>
        </tr>`
        );
    });
}

function addHorse() {
    const addHorseContainer = document.querySelector(".addHorseContainer");
    addHorseContainer.insertAdjacentHTML(
        "beforeend",
        `
    <table id="myTable">
            <tr class="tableRow">
                <th>Nom</th>
                <th>Écurie</th>
                <th>Dernier parage</th>
                <th>Prochain parage</th>
            </tr>
            <tr  class="tableRow">
        <td>
            <input type="text">
        </td>
        <td>
        <input type="text">
        </td>
        <td>
        <input type="date">
        </td>
        <td>
        <input type="date">
        </td>
    </tr>
        </table>
    `
    );
}

getHorses();
