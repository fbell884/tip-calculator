// Get DOM Elements
const reset = document.getElementById("reset");
const tipInput = document.querySelectorAll(".percentage");
const calcInputs = document.querySelectorAll(".calc-inputs")
const tipPerPerson = document.getElementById("tip-per-person");
const totalPerPerson = document.getElementById("total-per-person");
const BillAmountField = document.getElementById("bill-amount");
const numPeopleField = document.getElementById("num-people");
const customPercent = document.getElementById("custom-percent");
const errorMsg = document.getElementById("num-people-error");
const radioButtons = document.getElementsByName("percentages");

// declare variables. 
let tipAmount = 0;
let tipDivided = 0;
let total = 0;
let billPerPerson
let billAmount = 0;
let numPeople = 1;
let tipPercent = 0;

// Handle Tip Amount Events
calcInputs.forEach(calcs => {
    calcs.addEventListener("input", (e) => {

        replaceInvalidChars(calcs);
        displayError(calcs.value, calcs.id);

        if (e.target.id == "bill-amount") {
            billAmount = Number(e.target.value);
            if (billAmount == 0 || tipPercent == 0) {
                totalPerPerson.innerHTML = "0.00";
                tipPerPerson.innerHTML = "0.00";
            }
            else {
                tipAmount = billAmount * tipPercent;
                
                numPeopleHandler();
                displayResults();
            }
        }

        else {
            let numPeopleValidation = e.target.value;
            numPeople = Number(e.target.value);
            if (numPeople < 1 && numPeopleValidation == "") {
                numPeople == 1;
            }
            else if(numPeople < 1 && numPeopleValidation !== "") {
                e.target.placeholder = numPeople;
            }
            else {
                tipDivided = tipAmount/numPeople;
                billPerPerson = billAmount/numPeople;       
            }

            displayResults();
        }
    });
});




tipInput.forEach(tips => {
    tips.addEventListener("input", (e) => { 
        
            if (billAmount > 0) {
                tipPercent = Number(e.target.value)/100;
                tipAmount = billAmount * tipPercent;

                numPeopleHandler() 
                displayResults();
                
            }

    });
});

function numPeopleHandler() {
    if (numPeopleField.value !== "") {
        let pplAmount = Number(numPeopleField.value);
        tipDivided = tipAmount/pplAmount;
        billPerPerson = billAmount/pplAmount;
    }
    else {
        tipDivided = tipAmount;
        billPerPerson = billAmount;
    }
}

function displayResults() {
    total = tipDivided + billPerPerson;
    (!isNaN(total)) ? totalPerPerson.innerHTML = total.toFixed(2) : totalPerPerson.innerHTML = "Enter Number > 0";
    tipPerPerson.innerHTML = tipDivided.toFixed(2);
}


// Event Listener to zero out fields on reset. 
reset.addEventListener("click", () => {

        tipAmount = 0;
        tipDivided = 0;
        total = 0;
        billPerPerson = 0;
        billAmount = 0;
        numPeople = 0;
        tipPercent = 0;

        tipPerPerson.innerHTML = "0.00";
        totalPerPerson.innerHTML = "0.00";
        BillAmountField.value = "";
        numPeopleField.value = "";
        customPercent.value = "";
        numPeopleField.placeholder = "1";

});

// Event Listener to uncheck radio button if custom percent is focused. 

customPercent.addEventListener("focus", () => {
    radioButtons.forEach(btns => {
        if (btns.checked == true) {
            btns.checked = false;
        }
    })
});

customPercent.addEventListener("input", () => {
    replaceInvalidChars(customPercent);
});


const inputValidation = (calcValue) => {
    const isValidInput = (/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/).test(calcValue) ? true : false;
    return isValidInput;
}

const replaceInvalidChars = (calc) => {
    return calc.id === 'bill-amount' ? calc.value = calc.value.replace(/[^0-9.]/g, '') : calc.value = calc.value.replace(/[^0-9]/g, '')
}

const displayError = (calcValue, inputId) => {
    let calcInput = document.getElementById(inputId);
    let errorText = calcInput.previousElementSibling.previousElementSibling; 
  
    if (!inputValidation(calcValue) || Number(calcValue) == 0) {
        radioButtons.forEach(radio => {
            radio.checked = false;
            radio.disabled = true;
        });
        errorText.classList.remove("d-none");
        calcInput.classList.add('error-box');
    }
    else {
        radioButtons.forEach(radio => {
            radio.disabled = false;
        });
        errorText.classList.add("d-none");
        calcInput.classList.remove('error-box');
    }

}


// SERVICE WORKER FOR PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker.register('../sw.js').then( () => {
      console.log('Service Worker Registered')
     })
   })
}