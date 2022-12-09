const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const amount = document.getElementById("amount");
const text = document.getElementById("text");

// const dummyTransactions = [
//     { id: 1, text: "Costco", amount: -20 },
//     { id: 2, text: "Deposit", amount: 2500 },
//     { id: 3, text: "Fred Meyer", amount: -70 },
//     { id: 4, text: "Gas", amount: -30 },
// ];

const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
);

let transactions =
    localStorage.getItem("transactions") !== null
        ? localStorageTransactions
        : [];

// Add transactions to DOM list
const addTransactionDOM = (transaction) => {
    // Get sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onclick = 'removeTransaction(${
        transaction.id
    })'>x</button>
    `;

    list.appendChild(item);
};

// Update balance / income / expense
const updateValues = () => {
    const amounts = transactions.map((transaction) => transaction.amount);
    console.log(amounts);

    const total = amounts
        .reduce((accumulator, item) => (accumulator += item), 0)
        .toFixed(2);
    console.log(total);

    const income = amounts
        .filter((item) => item > 0)
        .reduce((accumulator, item) => (accumulator += item), 0)
        .toFixed(2);
    console.log(income);

    const expense = (
        amounts
            .filter((item) => item < 0)
            .reduce((accumulator, item) => (accumulator += item), 0) * -1
    ).toFixed(2);
    console.log(expense);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
};

// Add transaction
const addTransaction = (e) => {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please add a text and amount");
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value,
        };
        console.log(transaction);

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value = "";
        amount.value = "";
    }
};

// Generate random ID
const generateId = () => {
    return Math.floor(Math.random() * 100000000);
};

// Remove transaction by Id
const removeTransaction = (id) => {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    init();
};

// Init app
const init = () => {
    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);
    updateValues();
};

init();

form.addEventListener("submit", addTransaction);
