// construtor function for Drinks
function Drink (name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

// price method
Drink.prototype.price = function() {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 75
    default:
      alert('No this drink')
  }
}

// POS constructor function
function Pos () { }
Pos.prototype.getCheckedValue = (inputName) => {
  let selection = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(option => {
    if (option.checked) {
      selection = option.value
    }
  })
  return selection
}
const orderList = document.querySelector('[data-order-lists]')
Pos.prototype.addDrink = (drink) => {
  let orderListCard = `
  <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <!-- delete btn -->
      <div class="text-end">
        <span data-pos="delete-drink">x</span>
      </div>
      <!-- delete btn -->
      <h6 class="card-title fw-bold">${drink.name}</h6>
      <div class="card-text">${drink.sugar}</div>
      <div class="card-text">${drink.ice}</div>
    </div>
    <div class="card-footer text-end py-2">
      <div class="card-text text-muted">
        $ <span data-drink-price>${drink.price()}</span>
      </div>
    </div>
  </div>
  
  `
  orderList.insertAdjacentHTML('afterbegin', orderListCard)
}
Pos.prototype.deleteDrink = (target) => {
  target.remove()
}
Pos.prototype.checkout = () => {
  let totalAmout = 0
  document.querySelectorAll('[data-drink-price]').forEach(drink => {
    totalAmout += Number(drink.textContent)
  })
  return totalAmout
}
Pos.prototype.clearOrder = (target) => {
  target.querySelectorAll('.card').forEach(card => {
    card.remove()
  })
}


// Create Pos instance
const pos = new Pos()
const addDrinkBtn = document.querySelector('[data-pos="add-drink"]')
addDrinkBtn.addEventListener('click', () => {
  // 1. 取得飲料名稱, 甜度, 冰塊
  const drinkName = pos.getCheckedValue('drink')
  const ice = pos.getCheckedValue('ice')
  const sugar = pos.getCheckedValue('sugar')

  // 2. 沒有選取 跳出提示
  if (!drinkName) {
    alert('品項或冰塊甜度未勾選')
    return
  }
  // 3. 建立實例, 並取得價格
  const drink = new Drink(drinkName, sugar, ice)

  // 4. 將飲料實例生成左側訂單區
  pos.addDrink(drink)
})

// delete order
orderList.addEventListener('click', (event) => {
  let isDeleteBtn = event.target.matches('[data-pos="delete-drink"]')
  if (!isDeleteBtn) { return }
  pos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

//checkout
const checkoutBtn = document.querySelector('[data-pos="checkout"]')
checkoutBtn.addEventListener('click', () => {
  // 1. 計算總金額
  alert(`Total Amout of Drink: $${pos.checkout()}`)
  // 2. 清空訂單
  pos.clearOrder(orderList)
})

// active
document.querySelectorAll('.menu .card').forEach(card => {
  card.addEventListener('click', function() {
    document.querySelectorAll('.menu .card').forEach(innerCard => {
      innerCard.classList.remove('active');
    });
    this.classList.add('active');
  });
});

document.querySelectorAll('.btn-group-toggle .btn').forEach(btn => {
  btn.addEventListener('click', (target) => {
    let name = target.currentTarget.querySelector('input').name
    document.querySelectorAll(`.btn-group-toggle input[name="${name}"]`).forEach(input => {
      input.parentElement.classList.remove('active')
    })
    target.currentTarget.classList.add('active')
  })
})