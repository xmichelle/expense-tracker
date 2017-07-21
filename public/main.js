
function convertDate(timestamp) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const numericalDate = Number(timestamp)
  const dateFormat = new Date(numericalDate)
  const year = dateFormat.getUTCFullYear()
  const day = dateFormat.getUTCDate()
  const month = months[dateFormat.getUTCMonth()]

  const convertedDate = month + ' ' + day + ',' + ' ' + year

  return convertedDate
}

const $expenseTable = document.querySelector('#expense-table')
const $expenseBody = document.querySelector('.expense-body')

function renderTransactionData(data) {
  const $container = document.createElement('tr')
  const $categoryData = document.createElement('td')
  const $transactionData = document.createElement('td')
  const $dateData = document.createElement('td')
  const $amountData = document.createElement('td')

  $categoryData.textContent = data.category
  $transactionData.textContent = data.item
  $dateData.textContent = convertDate(data.transaction_date)
  if (data.type === 'expense') {
    $amountData.textContent = '- $ ' + data.amount
  }
  else if (data.type === 'income') {
    $amountData.textContent = '+ $ ' + data.amount
  }

  $container.appendChild($categoryData)
  $container.appendChild($transactionData)
  $container.appendChild($dateData)
  $container.appendChild($amountData)

  return $container
}


function organizeAmounts(data) {
  const amounts = { incomeAmounts: [], expenseAmounts: [] }
  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'income') {
      const amount = Number(data[i].amount)
      amounts.incomeAmounts.push(amount)
    }
    else if (data[i].type === 'expense') {
      const amount = Number(data[i].amount)
      amounts.expenseAmounts.push(amount)
    }
  }
  return amounts
}


function sum(data) {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    const amount = data[i]
    total += amount
  }
  return total
}


function netTotal(income, expense) {
  const total = (income - expense)
  return total
}


const $transactions = document.querySelector('#transactions')

function appendTotalTrans(data) {
  const total = data.length
  $transactions.textContent = total
}

const $totalIncome = document.querySelector('#income-total')

function appendTotalIncome(total) {
  $totalIncome.textContent = '$ ' + total
}

const $totalExpenses = document.querySelector('#expense-total')

function appendTotalExpense(total) {
  $totalExpenses.textContent = '$ ' + total
}

const $netTotal = document.querySelector('#net-total')

function appendNetTotal(total) {
  if (total > 0) {
    $netTotal.textContent = '$ ' + total
  }
  else if (total < 0) {
    $netTotal.textContent = '- $ ' + (total * -1)
  }
  else if (total = 0) {
    $netTotal.textContent = '$ ' + total
  }
}


function updateTotals(expenses) {
  const filteredAmounts = organizeAmounts(expenses)
  const expenseTotal = sum(filteredAmounts.expenseAmounts)
  const incomeTotal = sum(filteredAmounts.incomeAmounts)
  const net = netTotal(incomeTotal, expenseTotal)
  appendTotalTrans(expenses)
  appendTotalIncome(incomeTotal)
  appendTotalExpense(expenseTotal)
  appendNetTotal(net)
}


const $radios = document.querySelectorAll('input[name="chosen-form"]')

for (let i = 0; i < $radios.length; i++) {
  $radios[i].addEventListener('change', (event) => {
    changeView(event.target.value)
  })
}

const $form = document.querySelector('.form-horizontal')
const $formChoices = document.querySelectorAll('.form-choice')

function changeView(value) {
  for (let i = 0; i < $formChoices.length; i++) {
    if ($formChoices[i].classList.contains(value)) {
      $form.classList.remove('hidden')
      $formChoices[i].classList.remove('hidden')
    }
    else {
      $formChoices[i].classList.add('hidden')
    }
  }
}


let expenses = []
window.addEventListener('DOMContentLoaded', function (event) {
  fetch('/expenditures')
    .then(res => res.json())
    .then(jsonData => {
      expenses = expenses.concat(jsonData)
      expenses
        .map(renderTransactionData)
        .forEach(data => {
          $expenseBody.appendChild(data)
        })
      updateTotals(expenses)
    })
    .catch(err => {
      console.log(err)
    })
})

const $transactionForm = document.querySelector('#transaction-form')

$transactionForm.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('Submitting form')

  const $radioTransaction = document.querySelector('input[name="chosen-form"]:checked')
  const transactionType = $radioTransaction.value

  const transactionData = new FormData($transactionForm)

  const date = new Date(transactionData.get('transactionDate'))
  const numericDate = date.getTime()

  const newExpense = {
    category_id: transactionData.get(transactionType + '-category'),
    item: transactionData.get(transactionType + '-item'),
    transaction_date: numericDate,
    amount: transactionData.get('amount'),
    type: transactionType
  }

  fetch('/expenditures', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newExpense)
  })
  .then(res => res.json())
  .then(data => {
    $expenseBody.appendChild(renderTransactionData(data))
    expenses.push(data)
    updateTotals(expenses)
  })
  .catch(err => {
    console.log(err)
  })
  $transactionForm.reset()
})
