
const $expenseTable = document.querySelector('.expense-table')
const $expenseBody = document.querySelector('.expense-body')

function renderExpenseData(data) {
  const $container = document.createElement('tr')
  const $categoryData = document.createElement('td')
  const $expenseData = document.createElement('td')
  const $dateData = document.createElement('td')
  const $amountData = document.createElement('td')

  $categoryData.textContent = data.category_id
  $expenseData.textContent = data.item
  $dateData.textContent = data.transaction_date
  $amountData.textContent = data.amount

  $container.appendChild($categoryData)
  $container.appendChild($expenseData)
  $container.appendChild($dateData)
  $container.appendChild($amountData)

  return $container
}

window.addEventListener('DOMContentLoaded', function (event) {
  fetch('/expenditures')
    .then(res => res.json()) // parse to JS object
    .then(jsonData => {
      console.log(jsonData)
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
    console.log(jsonData)
    jsonData.forEach(data => {
      console.log(data)
      // const $div = document.createElement('div')
      // $div.textContent = data
      // $expenseTable.appendChild($div)
    })
  })
  .catch(err => {
    console.log(err)
  })
  $expenseForm.reset()
})
