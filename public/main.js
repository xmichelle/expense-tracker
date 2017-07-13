
const $expenseForm = document.querySelector('#expense-form')
const $expenseTable = document.querySelector('#expense-table')

function renderExpenseData(data) {
  return
}

fetch('/expenditures')
  .then(res => res.json()) // parse to JS object
  .then(jsonData => {
    console.log(jsonData)
  })
  .catch(err => {
    console.log(err)
  })




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
