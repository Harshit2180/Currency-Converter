const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropdowns = document.querySelectorAll(".container select");
const btn = document.querySelector(".button");
const FromCountry = document.querySelector("#FromCountry");
const ToCountry = document.querySelector("#ToCountry");
const message = document.querySelector(".value");
const output = document.querySelector("#outputtext")

for (let selct of dropdowns) {
    for (CurrCode in countryList) {
        let NewOptn = document.createElement("option");
        NewOptn.innerText = CurrCode;
        NewOptn.value = CurrCode;3
        if (selct.name === "fromcountry" && CurrCode === "USD") {
            NewOptn.selected = "selected";
        }
        else if (selct.name === "tocountry" && CurrCode ==="INR") {
            NewOptn.selected = "selected";
        }
        selct.append(NewOptn);
    }

    selct.addEventListener("change", (evt) => {
        UpdateFlag(evt.target)
    })
}

const UpdateFlag = (element) => {
    let currCode = element.value;
    let CountryCode = countryList[currCode];
    let NewSrc = `https://flagsapi.com/${CountryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = NewSrc;
}

btn.addEventListener("click", async () => {
    let amount = document.querySelector("#inputtext");
    let AmountVal = amount.value;
    if (AmountVal == "" || AmountVal < 1) {
        AmountVal = 1;
        amount.value = "1";
    }

    const url = `${BASE_URL}/${ToCountry.value}_${FromCountry.value}.json`        
    let response = await fetch(url);
    let data = await response.json();
    let exch_rate = data.rate;
    
    let FinalAmount = AmountVal * exch_rate;
    
    message.innerText = `${AmountVal} ${FromCountry.value} = ${FinalAmount.toFixed(3)} ${ToCountry.value}`;
    message.classList.remove("hide");
    output.value = FinalAmount;
    output.style.color = "black";
})

