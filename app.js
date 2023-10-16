

// Try 6

// Represent balance in cents (e.g $15,000 in cents)
let balanceCents = 100000;

// Inside the transaction page
// Check if a balance is stored in localStorage
const storedBalance = localStorage.getItem("balanceCents");

// Set the initial balance (use stored balance if available, otherwise use 1000.00)
const initialBalance = storedBalance ? parseFloat(storedBalance) / 100 : 1000.00;

// Set the initial balance in cents
balanceCents = Math.round(initialBalance * 100);

function updateBalanceDisplay() {
    const balanceElement = document.getElementById("balance");
    const dollars = (balanceCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    balanceElement.innerText = dollars;
}

function updateBalance() {
    const newBalanceInput = document.getElementById("new-balance-input");
    const balanceElement = document.getElementById("balance");
    const dollars = (balanceCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    balanceElement.innerText = dollars;

    const newBalanceDollars = parseFloat(newBalanceInput.value);

    if (!isNaN(newBalanceDollars) && newBalanceDollars >= 0) {
        balanceCents = Math.round(newBalanceDollars * 100);

        // Store the updated balance in localStorage
        localStorage.setItem("balanceCents", balanceCents);

        updateBalanceDisplay();
    } else {
        alert("Please enter a valid balance.");
    }

    newBalanceInput.value = "";
}

const successMessage = document.getElementById("success-message");
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

    // Store the updated balance in localStorage
    localStorage.setItem("balanceCents", balanceCents);

    window.location.href = 'transaction.html';

    // Construct the transaction details URL
    const transactionDetails = `email=${encodeURIComponent(email)}&amount=${encodeURIComponent(amountDollars.toFixed(2))}`;

    // Redirect to the transaction page with the transaction details as URL parameters
    window.location.href = `transaction.html?${transactionDetails}`;

    updateBalanceDisplay();

    const checkmarkImage = document.createElement("img");
    checkmarkImage.src = "images/greencheckmark.png";
    checkmarkImage.alt = "Checkmark";
    checkmarkImage.classList.add("checkmark-image");

    emailElement.value = "";
    amountElement.value = "";

    // Show the confirmation message with the checkmark image
    // confirmationElement.innerText = `Payment of $${amountDollars.toFixed(2)} sent to @${email} successfully`;
    // confirmationElement.appendChild(checkmarkImage);

    // Inside the sendMoney() function after other processing
    // Show the success message inside the PayPal container
    successMessage.innerText = `Payment of $${amountDollars.toFixed(2)} sent to ${email} successfully`;
    successMessage.style.display = "block";

    // Hide the confirmation message with the checkmark image
    confirmationElement.style.display = "none";

}

function resetBalance() {
    // Clear the balance from localStorage
    localStorage.removeItem("balanceCents");

    // Set the initial balance to 1000.00
    balanceCents = 100000;
    updateBalanceDisplay();

    const initialBalance = 1000.00;
    updateBalanceDisplay();

    const balanceElement = document.getElementById("balance");
    balanceElement.innerText = initialBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const confirmationElement = document.getElementById("confirmation");
    confirmationElement.innerHTML = "";

    document.getElementById("email").value = "";
    document.getElementById("amount").value = "";
}

function redirectToMainPage() {
    // Redirect to the main page (adjust the URL as needed)
    window.location.href = 'index.html';
}

// Function to parse URL parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Get transaction details from URL parameters
const email = getParameterByName('email');
const amount = getParameterByName('amount');

//Display transaction details
if (email && amount) {
    // const transactionMessage = `Payment of $${amount} sent to @${email} successfully.`;
    successMessage.innerText = `Payment of $${amount} sent to ${email} successfully`;
    successMessage.style.display = "block";
    const messageElement = document.createElement('p');
    messageElement.textContent = transactionMessage;

    // Hide the confirmation message with the checkmark image
    confirmationElement.style.display = "none";
    document.body.appendChild(messageElement);
} else {
    // Handle the case where there are no transaction details in the URL
    console.error("Transaction details not found in URL.");
}

// Initial update of balance display
updateBalanceDisplay();
