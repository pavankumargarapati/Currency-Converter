// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.3.2/v1/currencies/eur.json

const today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

let formattedDate = year + '.' + month + '.' + day;

const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies`;

const swap = document.getElementById("swap");
const convert = document.getElementById("convert");
const amount = document.getElementById("amount");
const dropDowns = document.getElementsByTagName("select");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");

for (select of dropDowns) {
    for (countryCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = countryCode;
        newOption.value = countryCode;
        if (select.getAttribute("id") == "from" && countryCode == "USD") {
            newOption.selected = true;
        } else if (select.getAttribute("id") == "to" && countryCode == "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (eve) => {
        updateFlag(eve.target);
    });
}

const updateFlag = (element) => {
    let countryCode = countryList[element.value];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.previousElementSibling.src = newSrc;
}

const findAmt = () => {
    let amt = amount.value;
    if (amt < 1) {
        amt = 1;
        amount.value = amt;
    }
    return amt;
}

convert.addEventListener("click", (evt) => {
    evt.preventDefault();

    calculate(findAmt());
});

amount.addEventListener("change", () => {
    calculate(findAmt());
});

const calculate = async (amt) => {

    let fromCurr = `${from.value.toLowerCase()}`;
    let toCurr = `${to.value.toLowerCase()}`;
    const URL = `${BASE_URL}/${fromCurr}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let resultAmt = amt * data[fromCurr][toCurr];

    let res = `${amt} ${fromCurr.toUpperCase()} = ${resultAmt} ${toCurr.toUpperCase()}`;
    result.firstElementChild.innerText = res;
};

swap.addEventListener("click", (evt) => {
    evt.preventDefault();
    let fromCurr = `${from.value}`;
    let toCurr = `${to.value}`;
    from.value = toCurr;
    to.value = fromCurr;
    updateFlag(from);
    updateFlag(to);
    calculate(findAmt());
});