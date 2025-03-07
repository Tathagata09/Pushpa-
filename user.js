function display(){
  if (localStorage.getItem("allflowers")){
    var allflowers = JSON.parse(localStorage.getItem("allflowers"))
    var temp = ""
    for(i = 0; i < allflowers.length; i++){
      temp += `
        <div class="box">
          <img src="${allflowers[i].link}" alt="">
          <div><span>${allflowers[i].name}</span>  <span> (Rs. ${allflowers[i].price})</span></div>
          <div><button onclick='addToCart(${i})'>Add to cart</button> <button onclick='del(${i})'>Buy now</button></div>
        </div>
      `;
    }   
    document.getElementById("result").innerHTML = temp
  } else {
    document.getElementById("result").innerHTML = "No flowers available"
  }
}

function reg(){
  var name = document.getElementById("name").value
  var email = document.getElementById("mail").value
  var password = document.getElementById("pass").value
  var newuser = {
    name: name,
    email: email,
    password: password,
  }
  if(localStorage.getItem("allusers")){
    var allusers = JSON.parse(localStorage.getItem("allusers"))
    allusers.push(newuser)
    localStorage.setItem("allusers", JSON.stringify(allusers))
  } else {
    var allusers = []
    allusers.push(newuser);
    localStorage.setItem("allusers", JSON.stringify(allusers))
  }
  Swal.fire({
    title: "Account Created successfully!",
    icon: "success",
    draggable: true
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = ""
    }
  });
}

function login(){
  var mail = document.getElementById("mail").value
  var pass = document.getElementById("pass").value
  var allusers = JSON.parse(localStorage.getItem("allusers"))
  var userFound = false;
  for(i=0;i<allusers.length;i++){
    if (allusers[i].email === mail && allusers[i].password === pass){
      userFound = true;
      localStorage.setItem('loggedUser', mail);
      break;
    }
  }
  if (userFound){
    window.location.href = "index.html"
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid username or password",
      footer: '<a href="forgetpass.html">Forget password?</a>'
    });
  }
}

function displayMenu(){
  if(localStorage.getItem('loggedUser')){
    document.getElementById('login').style.display = "none"
    document.getElementById('cart').style.display = ""
    document.getElementById('profile').style.display = ""
    document.getElementById('logout').style.display = ""
  } else {
    document.getElementById('login').style.display = ""
    document.getElementById('cart').style.display = "none"
    document.getElementById('profile').style.display = "none"
    document.getElementById('logout').style.display = "none"
  }
}

function logout(){
  localStorage.removeItem('loggedUser')
  window.location.href = 'index.html'
}

function addToCart(index){
  if(localStorage.getItem('loggedUser')){
    var allflowers = JSON.parse(localStorage.getItem("allflowers"))
    var email = localStorage.getItem('loggedUser')
    var cartArray = JSON.parse(localStorage.getItem('allcarts'))
    var flag = 0
    if(localStorage.getItem('allcarts')){
      for(let i=0;i<cartArray.length;i++){
        if(cartArray[i].name === allflowers[index].name && cartArray[i].email === email){
          flag=1
          break
        }   
      }
    }
  
    if(flag==1){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Item already in cart"
      })
    } else {
      var cart = {
        email: email,
        name: allflowers[index].name,
        price: allflowers[index].price,
        link: allflowers[index].link,
        quantity: 1
      }
      if(localStorage.getItem('allcarts')){
        var cartArray = JSON.parse(localStorage.getItem('allcarts'))
        cartArray.push(cart)
        localStorage.setItem('allcarts', JSON.stringify(cartArray))
      } else {
        var cartArray = []
        cartArray.push(cart)
        localStorage.setItem('allcarts', JSON.stringify(cartArray))
      }
      Swal.fire({
        title: "Added to cart successfully!",
        icon: "success",
        draggable: true
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "index.html"
        }
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please login to add to cart"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "login.html"
      }
    });
  }
}
function countCart(){
  var email = localStorage.getItem('loggedUser')
  var cartArray = JSON.parse(localStorage.getItem('allcarts'))
  var count = 0
  for(let i=0;i<cartArray.length;i++){
    if(cartArray[i].email === email){
      count++
    }
  }
  document.getElementById('cartCount').innerHTML = count
}

function cartDisplay(){
  var email = localStorage.getItem('loggedUser')
  var cartArray = JSON.parse(localStorage.getItem('allcarts'))
  console.log(169, cartArray.length)
  var temp = ""
  var total = 0
  for(let i=0;i<cartArray.length;i++){
    if(cartArray[i].email === email){
      console.log(170, cartArray[i].email)
      console.log(171, email)
      total += parseInt(cartArray[i].price) * parseInt(cartArray[i].quantity)
      temp += `
        <div class="cart-item">
            <img src="${cartArray[i].link}" alt="Item 1" class="cart-item-img">
            <div class="cart-item-details">
                <h3>${cartArray[i].name}</h3>
            </div>
            <div class="cart-item-price">Rs. ${cartArray[i].price}</div>
            <div class="cart-item-quantity">
                <button class="edit" onclick = "reduceQuantity(${i})">-</button>
                <label for="quantity1">${cartArray[i].quantity}</label>
                <button class="edit" onclick = "addquantity(${i})">+</button>
            </div>
            
            <div class="cart-item-price">Rs. ${cartArray[i].price * cartArray[i].quantity}</div>
            <div><button class="cart-item-remove" onclick = "del(${i})" >Remove</button></div>
            
        </div>
            
        </div>
        
      `;
    }
  }
  document.getElementById('cartResult').innerHTML = temp
  document.getElementById('total').innerHTML = "Rs "+total
}

function addquantity(index){
  var email = localStorage.getItem('loggedUser')
  var cartArray = JSON.parse(localStorage.getItem('allcarts'))
  var total = 0
  for(let i=0;i<cartArray.length;i++){
    if(cartArray[i].email === email  && i === index){
      cartArray[i].quantity++
    }
  }
  localStorage.setItem('allcarts', JSON.stringify(cartArray))

  window.location.href = ""
}

function reduceQuantity(index){
  var email = localStorage.getItem('loggedUser')
  var cartArray = JSON.parse(localStorage.getItem('allcarts'))
  var total = 0
  for(let i=0;i<cartArray.length;i++){
    if(cartArray[i].email === email  && i === index){
      if(cartArray[i].quantity > 1)
        cartArray[i].quantity--
      else{
        Swal.fire("Quantity cannot be less than 1");
      }
    }
   
  }
  localStorage.setItem('allcarts', JSON.stringify(cartArray))

  //window.location.href = ""
}

function del(index){
  var email = localStorage.getItem('loggedUser')
  var cartArray = JSON.parse(localStorage.getItem('allcarts'))
  var total = 0
  for(let i=0;i<cartArray.length;i++){
    if(cartArray[i].email === email  && i === index){
      cartArray.splice(i, 1)
    }
  }
  localStorage.setItem('allcarts', JSON.stringify(cartArray))

  window.location.href = ""
}

function checkout(){
  var email = localStorage.getItem('loggedUser')
  var cartArray = JSON.parse(localStorage.getItem('allcarts'))
  var total = 0
  for(let i=0;i<cartArray.length;i++){
    if(cartArray[i].email === email){
      total += parseInt(cartArray[i].price) * parseInt(cartArray[i].quantity)
    }
  }

     var options = {
          "key": "rzp_test_ND81BEh4gRO77Q", // Enter the Key ID generated from the Dashboard
          "amount": total*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Pushpa", //your business name
          "description": "Payment for your flowers",
          "image": "https://freshflowersonflorida.co.za/cdn/shop/files/IMG_7345.heic?v=1720025306&width=2943",
          "handler": function (response){
            Swal.fire({
              title: "Order placed successfully! your order id is "+response.razorpay_payment_id,
              text: "Total amount: Rs. "+total,
              icon: "success",
              draggable: true
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "index.html"
              }
            });
          }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
 
}


    
    
