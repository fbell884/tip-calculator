// Get DOM Elements
var reset = document.getElementById("reset");
var tipInput = document.querySelectorAll(".percentage");
var calcInputs = document.querySelectorAll(".calc-inputs")
var tipPerPerson = document.getElementById("tip-per-person");
var totalPerPerson = document.getElementById("total-per-person");
var BillAmountField = document.getElementById("bill-amount");
var numPeopleField = document.getElementById("num-people");
var customPercent = document.getElementById("custom-percent");
var errorMsg = document.getElementById("num-people-error");
var radioButtons = document.getElementsByName("percentages");

// globally declare variables. 
var tipAmount = 0;
var tipDivided = 0;
var total = 0;
var billPerPerson
var billAmount = 0;
var numPeople = 1;
var tipPercent = 0;

// Handle Tip Amount Events
calcInputs.forEach(calcs => {
    calcs.addEventListener("input", (e) => {
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
            var numPeopleValidation = e.target.value;
            numPeople = Number(e.target.value);
            if (numPeople < 1 && numPeopleValidation == "") {
                numPeople == 1;
            }
            else if(numPeople < 1 && numPeopleValidation !== "") {
                numPeopleField.classList.add("error-box");
                errorMsg.classList.remove("d-none");
                e.target.placeholder = numPeople;
            }
            else {
                numPeopleField.classList.remove("error-box");
                errorMsg.classList.add("d-none");
                e.target.placeholder = numPeople;
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
        var pplAmount = Number(numPeopleField.value);
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
    totalPerPerson.innerHTML = total.toFixed(2);
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

});

// Event Listener to uncheck radio button if custom percent is focused. 

customPercent.addEventListener("focus", () => {
    radioButtons.forEach(btns => {
        if (btns.checked == true) {
            btns.checked = false;
        }
    })
});