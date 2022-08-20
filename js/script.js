const cardBack = document.querySelector(".card__data__back");
const cardFront = document.querySelector(".card__data__front");
const inputs = document.querySelectorAll(".input-group");
const btn = document.querySelector(".btn.confirm");
const attribution = document.querySelector(".attribution");

const startAnimation = (entries, observe) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
};
const observer = new IntersectionObserver(startAnimation, {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
});

observer.observe(cardBack);
observer.observe(cardFront);
inputs.forEach((input) => {
  observer.observe(input);
});
observer.observe(btn);
observer.observe(attribution);

const templateModal = `
<div class="modal visible">
    <img src="images/icon-complete.svg" alt="Logo Complete">
    <h1>THANK YOU!</h1>
    <p>We've added your card details</p>
    <button class="btn">Continue</button>
</div>`;

const inputCardName = document.getElementById("txtName");
const spanName = document.getElementById("name");
const msgErrorCardName = document.getElementById("errorCardName");

const inputCardNumber = document.getElementById("txtCardNumber");
const spanCardNumber = document.getElementById("cardNumber");
const msgErrorCardNumber = document.getElementById("errorCardNumber");

const inputCardMonth = document.getElementById("txtCardMonth");
const spanCardDate = document.getElementById("date");
const msgErrorDate = document.getElementById("errorDate");

const inputCardYear = document.getElementById("txtCardYear");
const spanCardYear = document.getElementById("date");

const inputCardCVC = document.getElementById("txtCardCVC");
const spanCardCVC = document.querySelector("#CVC span");
const msgErrorCVC = document.getElementById("errorCVC");

const evts = ["focus", "keyup", "keypress"];
let date = ["00", "00"]

let isValidCardName = false
let isValidCardNumber = false
let isValidCardMonth = false
let isValidCardYear = false
let isValidCardCVC = false

new Cleave("#txtCardNumber", {
  creditCard: true,
});
new Cleave("#txtCardMonth", {
  date: true,
  datePattern: ["m"],
});
new Cleave("#txtCardYear", {
  date: true,
  datePattern: ["y"],
});
new Cleave('#txtCardCVC', {
  numeral: true
});

evts.forEach((evt) => {
  // VALIDATE CARD NAME
  inputCardName.addEventListener(evt, () => {
    if ( inputCardName.value == undefined || inputCardName.value.trim().length <= 0 || !/^[A-Z ]+$/i.test(inputCardName.value)) {
      inputCardName.classList.add("border");
      spanName.innerHTML = "JANE APPLESSED";
      msgErrorCardName.classList.add("visible");
      isValidCardName = false
      return;
    }

    inputCardName.classList.remove("border");
    spanName.innerHTML = inputCardName.value;
    msgErrorCardName.classList.remove("visible");
    isValidCardName = true
  });


  // VALIDATE CARD NUMBER
  inputCardNumber.addEventListener(evt, () => {
    if (inputCardNumber.value == undefined || inputCardNumber.value.trim().length <= 0) {
      inputCardNumber.classList.add("border");
      spanCardNumber.innerHTML = "0000 0000 0000 0000";
      msgErrorCardNumber.classList.add("visible");
      isValidCardNumber= false
      return;
    }

    inputCardNumber.classList.remove("border");
    spanCardNumber.innerHTML = inputCardNumber.value;
    msgErrorCardNumber.classList.remove("visible");
    isValidCardNumber= true
  });


  //VALIDATE CARD MONTH
  inputCardMonth.addEventListener(evt, () => {
    if (inputCardMonth.value == undefined || inputCardMonth.value.trim().length <= 0) {
      inputCardMonth.classList.add("border");
      spanCardDate.innerHTML = "00/00"
      msgErrorDate.classList.add("visible");
      isValidCardMonth = false
      return;
    }

    inputCardMonth.classList.remove("border");
    date[0] = inputCardMonth.value;
    spanCardDate.innerHTML = date[0] + "/" + date[1]
    msgErrorDate.classList.remove("visible");
    isValidCardMonth = true
  });


  //VALIDATE CARD YEAR
  inputCardYear.addEventListener(evt, () => {
    if (inputCardYear.value == undefined || inputCardYear.value.trim().length <= 0 || parseInt(inputCardYear.value) <= 21 || parseInt(inputCardYear.value) > 27) {
      inputCardYear.classList.add("border");
      spanCardDate.innerHTML = date[0] + "/00"
      msgErrorDate.innerHTML = "Wrong card date"
      msgErrorDate.classList.add("visible");
      isValidCardYear = false
      return;
    }

    inputCardYear.classList.remove("border");
    date[1] = inputCardYear.value;
    spanCardDate.innerHTML = date[0] + "/" + date[1]
    msgErrorDate.classList.remove("visible");
    isValidCardYear = true
  });


  // VALIDATE CARD CVC
  inputCardCVC.addEventListener(evt, () => {
    if (inputCardCVC.value == undefined || inputCardCVC.value.trim().length <= 2) {
      inputCardCVC.classList.add("border");
      spanCardCVC.innerHTML = "000";
      msgErrorCVC.classList.add("visible");
      isValidCardCVC = false
      return;
    }

    inputCardCVC.classList.remove("border");
    spanCardCVC.innerHTML = inputCardCVC.value;
    msgErrorCVC.classList.remove("visible");
    isValidCardCVC = true
  });

});

function validate(){
  if(isValidCardCVC && isValidCardName && isValidCardYear && isValidCardMonth && isValidCardNumber){
    document.querySelector('.card__form').innerHTML = templateModal
  }
}
