"use strict";
// Get DOM element
const submitBtn = document.getElementById("submit-btn");
const showHealthyPet = document.getElementById("healthy-btn");
const calBmiBtn = document.getElementById("calBMI-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

const petArray = [];

//Function get value pet's data
const dataInput = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weightInput: parseInt(weightInput.value),
    lengthInput: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
  };
  data.dateRender = `${day}/${month}/${year}`;
  return data;
};

//------- Rendering Pet List from array 'petArray' to table -------//
function renderTableData(petArray) {
  tableBodyEl.innerHTML = "";

  for (let el of petArray) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${el.id}</th>
    <td>${el.name}</td>
    <td>${el.age}</td>
    <td>${el.type}</td>
    <td>${el.weightInput}</td>
    <td>${el.lengthInput}</td>
    <td>${el.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${el.color}"></i>
    </td>
    <td><i class="${
      el.vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
    }"></i></td>
    <td><i class="${
      el.dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
    }"></i></td>
    <td><i class="${
      el.sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
    }"></i></td>
    <td>${el.bmi}</td>
    <td>${el.dateRender}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      el.id
    }')">Delete</button>
    </td>
  `;
    tableBodyEl.appendChild(row);
  }
}
//------- Create delete function for button in pet rows -------//
const deletePet = function (petID) {
  const index = petArray.findIndex((pet) => pet.id === petID);
  petArray.splice(index, 1);
  renderTableData(petArray);
};

//------- Delete the data entered on the Form -------//
const clearInput = () => {
  // idInput.value = "";
  // typeInput.value = "Select Type";
  // nameInput.value = "";
  // ageInput.value = "";
  // weightInput.value = "";
  // lengthInput.value = "";
  // colorInput.value = "#000000";
  // breedInput.value = "Select Breed";
  // vaccinatedInput.checked = false;
  // dewormedInput.checked = false;
  // sterilizedInput.checked = false;
  document.querySelector("form").reset();
};

//------- Create handler function when the submit button is clicked -------//
submitBtn.addEventListener("click", function () {
  //1. Validate Form
  dataInput();
  //Create error alarm funct
  const validateData = function (data) {
    // Check ID input
    if (!data.id) {
      alert("Please input for ID!");
      return false;
    }
    for (const el of petArray) {
      if (el.id === data.id) {
        alert("ID must be unique!");
        return false;
      }
    }

    // Check Name input
    if (!data.name) {
      alert("Please input for Name!");
      return false;
    }

    // Check Age input
    if (!data.age) {
      alert("Please input for Age!");
      return false;
    } else if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
      return false;
    }

    // Check Type input
    if (data.type === "Select Type") {
      alert("Please select Type!");
      return false;
    }

    // Check Weight input
    if (!data.weightInput) {
      alert("Please input Weight!");
      return false;
    } else if (data.weightInput < 1 || data.weightInput > 15) {
      alert("Weight must be between 1 and 15!");
      return false;
    }

    // Check Length input
    if (!data.lengthInput) {
      alert("Please input Length!");
      return false;
    } else if (data.lengthInput < 1 || data.lengthInput > 100) {
      alert("Length must be between 1 and 100!");
      return false;
    }

    // Check Breed input
    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      return false;
    }

    return true;
  };
  //When Validation Data is false -> turn on Alert
  const validate = validateData(dataInput());

  //2. When Validation Data is true
  if (validate) {
    //Push Data into petArray of global to save data & clear input form
    petArray.push(dataInput());
    console.log(petArray);
    renderTableData(petArray);
    clearInput();
  }
});

//------- Create a healthy pet display function -------//
showHealthyPet.addEventListener("click", function () {
  showHealthyPet.textContent =
    showHealthyPet.textContent === "Show Healthy Pet"
      ? "Show All Pet"
      : "Show Healthy Pet";
  if (showHealthyPet.textContent === "Show All Pet") {
    const healthyPetArr = petArray.filter(
      (pet) =>
        pet.vaccinated === true &&
        pet.dewormed === true &&
        pet.sterilized === true
    );
    console.log(healthyPetArr);
    renderTableData(healthyPetArr);
  } else {
    renderTableData(petArray);
  }
});

//------- Cal pet's BMI -------///
calBmiBtn.addEventListener("click", function () {
  //1. Create a formula function to calculate pet BMI
  const formularCalPetBmi = (pet) => {
    return (
      (pet.weightInput * (pet.type === "Dog" ? 703 : 886)) /
      pet.lengthInput ** 2
    );
  };

  //2. assign data to calculate pet BMI
  for (let calPetBmi of petArray) {
    // if (calPetBmi.bmi === "?") {
    //   calPetBmi.bmi = formularCalPetBmi(calPetBmi).toFixed(2);
    //   renderTableData(arr);
    // } else {
    //   calPetBmi.bmi = "?";
    //   renderTableData(arr);
    // }
    calPetBmi.bmi =
      calPetBmi.bmi === "?" ? formularCalPetBmi(calPetBmi).toFixed(2) : "?";
    renderTableData(petArray);
  }
});
