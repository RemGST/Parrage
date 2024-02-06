"use strict";
import Horse from "./Horse.js";

const horseArray = [];

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

function getHorses() {
    fetch("http://localhost:3000/getHorses")
        .then((result) => result.json())
        .then((res) => {
            console.log(res);
            res.forEach((e) => {

                console.log();

                const dernierParage = e.Dernier_Parage.slice(0,10)
                const prochainParage = e.Prochain_Parage.slice(0,10) 

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

function renderTable(){

    const table = document.querySelector("#myTable")
    console.log(table);
    horseArray.forEach(horse => {
        table.insertAdjacentHTML('beforeend',horse.htmlString)
    })
    
}

getHorses();
