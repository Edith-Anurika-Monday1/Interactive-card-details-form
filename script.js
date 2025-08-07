const form = document.getElementById("card-form");
const thankYou = document.getElementById("thank-you");
const continueBtn = document.getElementById("continue-btn");

// Display elements
const displayName = document.getElementById("display-name");
const displayNumber = document.getElementById("display-card-number");
const displayExpiry = document.getElementById("display-expiry");
const displayCVC = document.getElementById("display-cvc");

// Input fields
const nameInput = document.getElementById("cardholder-name");
const numberInput = document.getElementById("card-number");
const monthInput = document.getElementById("exp-month");
const yearInput = document.getElementById("exp-year");
const cvcInput = document.getElementById("cvc");

// Errors
const nameError = document.getElementById("name-error");
const numberError = document.getElementById("number-error");
const dateError = document.getElementById("date-error");
const cvcError = document.getElementById("cvc-error");

// Format card number
numberInput.addEventListener("input", () => {
  let raw = numberInput.value.replace(/\D/g, "").substring(0, 16);
  let formatted = raw.replace(/(.{4})/g, "$1 ").trim();
  numberInput.value = formatted;
  displayNumber.textContent = formatted || "0000 0000 0000 0000";
});

// Live preview
nameInput.addEventListener("input", () => {
  displayName.textContent = nameInput.value || "Jane Appleseed";
});

monthInput.addEventListener("input", updateExpiry);
yearInput.addEventListener("input", updateExpiry);

function updateExpiry() {
  const month = monthInput.value || "00";
  const year = yearInput.value || "00";
  displayExpiry.textContent = `${month}/${year}`;
}

cvcInput.addEventListener("input", () => {
  displayCVC.textContent = cvcInput.value || "000";
});

// Validation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  // Name
  if (!nameInput.value.trim()) {
    nameError.textContent = "Can't be blank";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  // Card number
  const num = numberInput.value.replace(/\s/g, "");
  if (!/^\d{16}$/.test(num)) {
    numberError.textContent = "Wrong format. Numbers only";
    valid = false;
  } else {
    numberError.textContent = "";
  }

  // Date
  if (!monthInput.value || !yearInput.value) {
    dateError.textContent = "Can't be blank";
    valid = false;
  } else if (
    !/^\d{2}$/.test(monthInput.value) ||
    !/^\d{2}$/.test(yearInput.value)
  ) {
    dateError.textContent = "Invalid date";
    valid = false;
  } else {
    dateError.textContent = "";
  }

  // CVC
  if (!/^\d{3}$/.test(cvcInput.value)) {
    cvcError.textContent = "Invalid CVC";
    valid = false;
  } else {
    cvcError.textContent = "";
  }

  if (valid) {
    form.classList.add("hidden");
    thankYou.classList.remove("hidden");
  }
});

// Reset form
continueBtn.addEventListener("click", () => {
  form.reset();
  form.classList.remove("hidden");
  thankYou.classList.add("hidden");

  // Reset preview
  displayName.textContent = "Jane Appleseed";
  displayNumber.textContent = "0000 0000 0000 0000";
  displayExpiry.textContent = "00/00";
  displayCVC.textContent = "000";
});
