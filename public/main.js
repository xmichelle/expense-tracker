
// fetch('/expenditures')
//   .then(res => res.json())
//   .then(jsonData => {
//     console.log(jsonData)
//     // jsonData.forEach(data => {
//     //   const $div = document.createElement('div')
//     //   $div.textContent = data
//     //   document.body.appendChild($div)
//     // })
//   })
//   .catch(err => {
//     console.log(err)
//   })

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
    .then(data => console.log(data)) // to view history of expenses, create a .then function that appends info to the document.

  $expenseForm.reset()
})
