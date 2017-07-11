
fetch('/expenditures')
  .then(res => res.json())
  .then(jsonData => {
    console.log(jsonData)
    // jsonData.forEach(data => {
    //   const $div = document.createElement('div')
    //   $div.textContent = data
    //   document.body.appendChild($div)
    // })
  })
  .catch(err => {
    console.log(err)
  })

fetch('/expenditures', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify() // need to add argument in here
})
  .then(res => res.json())
  .then(data => console.log(data))


// Review fetch
// Look into config as second argument
