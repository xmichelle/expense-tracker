
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

function renderExpenseData(data) {
  const $container = document.createElement('tr')
  const $categoryData = document.createElement('td')
  const $expenseData = document.createElement('td')
  const $dateData = document.createElement('td')
  const $amountData = document.createElement('td')

  $categoryData.textContent = data.category
  $expenseData.textContent = data.item
  $dateData.textContent = convertDate(data.transaction_date)
  $amountData.textContent = '$ ' + data.amount

  $container.appendChild($categoryData)
  $container.appendChild($expenseData)
  $container.appendChild($dateData)
  $container.appendChild($amountData)

  return $container
}

// use credit card icon for transactions
// use piggy bank icon for income
// use minus sign icon for expenses

function totalExpense(data) {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    const amount = Number(data[i].amount)
    total += amount
  }
  return total
}


const $test = document.querySelector('.expense-test')
function appendTotalExpense(total) {
  $test.textContent = '$ ' + total
}

const $testTotal = document.querySelector('.number-test')
function appendTotalNumber(data) {
  const total = data.length
  $testTotal.textContent = total
}


let expenses = []
window.addEventListener('DOMContentLoaded', function (event) {
  fetch('/expenditures')
    .then(res => res.json())
    .then(jsonData => {
      expenses = expenses.concat(jsonData)
      expenses
        .map(renderExpenseData)
        .forEach(data => {
          $expenseBody.appendChild(data)
        })
      const total = totalExpense(expenses)
      appendTotalExpense(total)
      appendTotalNumber(expenses)
    })
    .catch(err => {
      console.log(err)
    })
})

const $expenseForm = document.querySelector('#expense-form')

$expenseForm.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('Submitting form')

  const expenseData = new FormData($expenseForm)

  const date = new Date(expenseData.get('transactionDate'))
  const numericDate = date.getTime()

  const newExpense = {
    category_id: expenseData.get('category'),
    item: expenseData.get('expenseItem'),
    transaction_date: numericDate,
    amount: expenseData.get('amount')
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
    $expenseBody.appendChild(renderExpenseData(data))
    expenses.push(data)
    const newTotal = totalExpense(expenses)
    appendTotalExpense(newTotal)
    appendTotalNumber(expenses)
  })
  .catch(err => {
    console.log(err)
  })
  $expenseForm.reset()
})
