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
    editHorse()
}

function getHorses() {
    fetch("https://parage.onrender.com/getHorses")
        .then((result) => result.json())
        .then((res) => {
            console.log(res);
            res.forEach((e) => {
                console.log();

                const dernierParage = e.Dernier_Parage;
                const prochainParage = e.Prochain_Parage;

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
            <td class="horseName">
                ${horse.name}
            </td>
            <td class="horseStable">
                ${horse.stable}
            </td>
            <td>
            <input class="lastTrimDate" id="date" type="date" value="${horse.lastTrim}" disabled>
            </td>
            <td>
            <input class="nextTrimDate" id="date" type="date" value="${horse.nextTrim}" disabled>
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
            <input class="name" type="text" required>
        </td>
        <td>
        <input class="stable" type="text" required>
        </td>
        <td>
        <input class="lastTrim" type="date" required>
        </td>
        <td>
        <input class="nextTrim" type="date" required>
        </td>
    </tr>
        </table>

        <a class="btnSend">Ajouter</a>
    `
    );

    const btnSend = document.querySelector(".btnSend")
    btnSend.addEventListener("click", () => {
        console.log("click");

        const horse = {
            Nom: document.querySelector('.name').value,
            Ecurie: document.querySelector('.stable').value,
            Dernier_Parage: document.querySelector('.lastTrim').value,
            Prochain_Parage: document.querySelector('.nextTrim').value,
            Paré: false
        }

        console.log(JSON.stringify(horse));


        fetch("https://parage.onrender.com/addHorses", {
            method: "POST",
            body: JSON.stringify(horse),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data.message);
    
            if (data.status === "Saved") {
                alert(data.message);
                location.reload();
            } else {
                alert(data.message);
            }
        })
    })
}

function editHorse(){
    console.log("EDITING");
        const table = document.getElementById("myTable");
        const modifiedHorses = [];

        for (let i = 1; i < table.rows.length; i++) {
            const originalHorse = horseArray[i - 1]; // Assuming horseArray is synced with the table
            console.log(originalHorse);
            console.log(horseArray[i - 1].id);
            const updatedHorse = {
                id: horseArray[i - 1].id,
                name: table.rows[i].cells[0].innerText,
                stable: table.rows[i].cells[1].innerText,
                lastTrim: table.rows[i].cells[2].querySelector('.lastTrimDate').value,
                nextTrim: table.rows[i].cells[3].querySelector('.nextTrimDate').value,
                trimmed: table.rows[i].cells[4].querySelector('#btnDone').checked,
            };

            // Compare original and updated horses
            const isModified = Object.keys(updatedHorse).some(key => originalHorse[key] !== updatedHorse[key]);

            if (isModified) {
                modifiedHorses.push(updatedHorse);
            }
        }

        console.log("Modified Horses:", modifiedHorses);
        console.log(JSON.stringify(modifiedHorses));

        // Now you can send the modified horses to the server
        // Use fetch or your preferred method to send the data to your server
        fetch("https://parage.onrender.com/updateHorses", {
            method: "PUT",
            body: JSON.stringify(modifiedHorses),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data.message);
    
            if (data.status === "Updated") {
                alert(data.message);
            } else {
                alert(data.message);
            }
        });

    

}

getHorses();
