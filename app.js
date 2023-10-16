

//try 5

let balanceCents = 100000; // Represent balance in cents (e.g $15,000 in cents)

function updateBalanceDisplay() {
    const balanceElement = document.getElementById("balance");
    const dollars = (balanceCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    balanceElement.innerText = dollars;
}

function updateBalance() {
    const newBalanceInput = document.getElementById("new-balance-input");
    const balanceElement = document.getElementById("balance");

    const newBalanceDollars = parseFloat(newBalanceInput.value);

    if (!isNaN(newBalanceDollars) && newBalanceDollars >= 0) {
        balanceCents = Math.round(newBalanceDollars * 100);
        updateBalanceDisplay();
    } else {
        alert("Please enter a valid balance.");
    }

    newBalanceInput.value = "";
}

function sendMoney() {
    console.log("sendMoney function called");

    const emailElement = document.getElementById("email");
    const amountElement = document.getElementById("amount");
    const confirmationElement = document.getElementById("confirmation");

    const email = emailElement.value;
    const amountDollars = parseFloat(amountElement.value);

    const currentBalanceDollars = balanceCents / 100;

    console.log("Current Balance (Dollars):", currentBalanceDollars);
    console.log("Amount to Send (Dollars):", amountDollars);

    if (!email || email.trim() === "" || isNaN(amountDollars) || amountDollars <= 0) {
        alert("Please enter a valid email and amount.");
        return;
    }

    if (amountDollars > currentBalanceDollars) {
        alert("Insufficient balance.");
        return;
    }

    // Calculate the new balance in cents
    const newBalanceCents = balanceCents - Math.round(amountDollars * 100);

    // Update the balance variable
    balanceCents = newBalanceCents;

    updateBalanceDisplay();

    const checkmarkImage = document.createElement("img");
    checkmarkImage.src = "images/greencheckmark.png";
    checkmarkImage.alt = "Checkmark";
    checkmarkImage.classList.add("checkmark-image");

    emailElement.value = "";
    amountElement.value = "";

    // Show the confirmation message with the checkmark image
    confirmationElement.innerText = `Payment of $${amountDollars.toFixed(2)} sent to ${email} successfully`;
    confirmationElement.appendChild(checkmarkImage);
}
function resetBalance() {
    const initialBalance = 1000.00;
    updateBalanceDisplay();
    
    const balanceElement = document.getElementById("balance");
    balanceElement.innerText = initialBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    const confirmationElement = document.getElementById("confirmation");
    confirmationElement.innerHTML = "";
    
    document.getElementById("email").value = "";
    document.getElementById("amount").value = "";
}

updateBalanceDisplay();