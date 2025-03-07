

function login(){
    var mail = document.getElementById("mail").value
    var pass = document.getElementById("pass").value

    if(mail == "admin@gmail.com" && pass == "Admin@123"){
        window.location.href = "index.html"
    }
    else{
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid username or password",
            footer: '<a href="forgetpass.html">Forget password?</a>'
          });
    }
}

function logout(){
    Swal.fire({
        title: "Logout successful!",
        confirmButtonText: "Ok",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "admin.html"
        }
      });
      
}

function adding()
{
    var name = document.getElementById("name").value
    var price = document.getElementById("price").value
    var link = document.getElementById("url").value

    var newflower = {
        name: name,
        price: price,
        link: link
    }

    if(localStorage.getItem("allflowers")){
        var allflowers = JSON.parse(localStorage.getItem("allflowers"))
        allflowers.push(newflower)
        localStorage.setItem("allflowers", JSON.stringify(allflowers))
    }
    else{
        var allflowers = []
        allflowers.push(newflower);
        localStorage.setItem("allflowers", JSON.stringify(allflowers))
    }

    Swal.fire({
      title: "Flower added successfully!",
      icon: "success",
      draggable: true
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = ""
      }
    });
}

function display(){
  if (localStorage.getItem("allflowers")){
    var allflowers = JSON.parse(localStorage.getItem("allflowers"))
    var temp = ""
    for(i = 0; i < allflowers.length; i++){
      temp += `
        <div class="box">
            <img src="${allflowers[i].link}" alt="">
            <div><span>${allflowers[i].name}</span>  <span> (Rs. ${allflowers[i].price})</span></div>
            <div><button onclick='edit(${i})'>Edit</button> <button onclick='del(${i})'>Delete</button></div>
        </div>
      `;
    }   
    document.getElementById("result").innerHTML = temp
  }
  else{
    document.getElementById("result").innerHTML = "No flowers available"
  }
}

function del(index){

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
   
    if (result.isConfirmed) {
      var allflowers = JSON.parse(localStorage.getItem("allflowers"))
      allflowers.splice(index, 1)
      localStorage.setItem("allflowers", JSON.stringify(allflowers))
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      }).then((result1) => {
        if (result1.isConfirmed) {
          window.location.href = ""
        }
      });
    }
  });
  
}

function edit(index){
  localStorage.setItem("selectedIndex", index)
  window.location.href = "Edit.html"
}

function displayFlower()
{
  var selectedIndex = localStorage.getItem("selectedIndex")

  var allflowers = JSON.parse(localStorage.getItem("allflowers"))

  document.getElementById("name").value = allflowers[selectedIndex].name
  document.getElementById("price").value = allflowers[selectedIndex].price
  document.getElementById("url").value = allflowers[selectedIndex].link
}


function update()
{
    var name = document.getElementById("name").value
    var price = document.getElementById("price").value
    var link = document.getElementById("url").value

    var selectedIndex = localStorage.getItem("selectedIndex")

    var allflowers = JSON.parse(localStorage.getItem("allflowers"))

    allflowers[selectedIndex].name = name
    allflowers[selectedIndex].price = price
    allflowers[selectedIndex].link = link

    localStorage.setItem("allflowers", JSON.stringify(allflowers))

    Swal.fire({
      title: "Flower updated successfully!",
      icon: "success",
      draggable: true
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "flowers.html"
      }
    });

}


function searchFlower(){
  var searchInput = document.getElementById("searchInput").value
  var allflowers = JSON.parse(localStorage.getItem("allflowers"))
  var temp = ""
  for(i = 0; i < allflowers.length; i++){
    var name = allflowers[i].name;
    var n = name.substring(0, searchInput.length)
    if(n.toLowerCase() == searchInput.toLowerCase())
    {
      temp += `
      <div class="box">
          <img src="${allflowers[i].link}" alt="">
          <div><span>${allflowers[i].name}</span>  <span> (Rs. ${allflowers[i].price})</span></div>
          <div><button onclick='edit(${i})'>Edit</button> <button onclick='del(${i})'>Delete</button></div>
      </div>
    `;
    }
    else{
      temp = "No flowers available"
    }
  }   
  document.getElementById("result").innerHTML = temp
}
