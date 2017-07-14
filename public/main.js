
const $expenseForm = document.querySelector('#expense-form')
const $expenseTable = document.querySelector('.expense-table')
const $expenseHeader = document.querySelector('.expense-head')
const $expenseBody = document.querySelector('.expense-body')

function renderExpenseHeaders(header) {
  const $container = document.createElement('tr')
  const $categoryHead = document.createElement('th')
  const $expenseHead = document.createElement('th')
  const $dateHead = document.createElement('th')
  const $amountHead = document.createElement('th')

  $categoryHead.setAttribute('scope', 'col')
  $expenseHead.setAttribute('scope', 'col')
  $dateHead.setAttribute('scope', 'col')
  $amountHead.setAttribute('scope', 'col')

  $categoryHead.textContent = 'Category'
  $expenseHead.textContent = 'Expenses'
  $dateHead.textContent = 'Transaction Date'
  $amountHead.textContent = 'Amount'

  $container.appendChild($categoryHead)
  $container.appendChild($expenseHead)
  $container.appendChild($dateHead)
  $container.appendChild($amountHead)

  return $container
}

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

// fetch('/expenditures')
//   .then(res => res.json()) // parse to JS object
//   .then(jsonData => {
//     console.log(jsonData)
//   })
//   .catch(err => {
//     console.log(err)
//   })




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
