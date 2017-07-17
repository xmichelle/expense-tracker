
function convertDate(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const numericalDate = Number(date)
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


window.addEventListener('DOMContentLoaded', function (event) {
  fetch('/expenditures')
    .then(res => res.json())
    .then(jsonData => {
      jsonData
        .map(renderExpenseData)
        .forEach(data => {
          $expenseBody.appendChild(data)
        })
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
  .then(jsonData => {
    $expenseBody.appendChild(renderExpenseData(jsonData))
  })
  .catch(err => {
    console.log(err)
  })
  $expenseForm.reset()
})
