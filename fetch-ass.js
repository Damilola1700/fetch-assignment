try{

  const fetchData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer hchcjdjcjc",
  },
};

// setInterval(function(){
// let today = new Date();
//     document.querySelector('#countDown').innerHTML = `Countdown:${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;


// }, 1000);


let targetDate = new Date("May 30 2026, 12:00:00").getTime();

let countDown = setInterval(function(){
  let now = new Date().getTime();
  let timeDiference = targetDate - now;

  let day = Math.floor((timeDiference / (1000 * 60 * 60 * 24)))
  let hour = Math.floor((timeDiference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minute = Math.floor((timeDiference % (1000 * 60 * 60 )) / (1000 * 60));
  let seconds = Math.floor((timeDiference % (1000 * 60 )) / (1000));
  
  document.querySelector('#countDown').innerHTML = `DAY ${day} Hours Left: ${hour} : ${minute} : ${seconds}`

  if (timeDiference < 0){
    clearInterval(countDown);
    document.querySelector('#countDown').innerHTML = "Countdown Over";
  }

},1000 );


let users = [];

fetch("https://dummyjson.com/products/category/womens-watches", fetchData)
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    productCategory = data.products;
    console.log( productCategory);

    let productArray =  productCategory.map(function (value) {
      return `
      <div class="shadow-md rounded-md w-full h-[370px] md:h-[350px] lg:h-[350px] p-2">
        <img src="${value.images[0]}" class="rounded-md h-[200px] w-full object-cover">
        <div>
            <p class="mt-[10px] font-medium text-gray-900 line-clamp-2">${value.title}</p>
            <p class="mt-[5px] text-sm text-gray-500">Ratings: ${value.rating}</p>
            <p class="mt-[10px] font-bold text-lg text-gray-800">Price: $${value.price}</p>
        </div>
        
       
      </div>
    `;
    });

    document.getElementById("pageSection").innerHTML = productArray.join("");
  });


}catch(error){
    console.log(error);
    document.querySelector('#errorMessage').innerHTML = "Error loading products..."
}



function filterProducts() {
  let search = document.querySelector("#searchProduct").value;

  let productFilters =  productCategory.filter(function (value) {
    return value.title.toLowerCase().includes(search.toLowerCase());
  });

  if (productFilters.length === 0) {
    document.getElementById("pageSection").innerHTML = "";
    document.querySelector("#noProduct").classList.remove("hidden");
  } else {
    document.querySelector("#noProduct").classList.add("hidden");
    let filterMap = productFilters.map(function (value) {
       return `
       <div class="shadow-md rounded-md w-full h-[370px] md:h-[350px] lg:h-[350px] p-2">
        <img src="${value.images[0]}" class="rounded-md h-[200px] w-full object-cover">
        <div>
            <p class="mt-[10px] font-medium text-gray-900 line-clamp-2">${value.title}</p>
            <p class="mt-[5px] text-sm text-gray-500">Ratings: ${value.rating}</p>
            <p class="mt-[10px] font-bold text-lg text-gray-800">Price: $${value.price}</p>
        </div>
        
       
       </div>
        `;
    });

    document.getElementById("pageSection").innerHTML = filterMap.join("");
  }
}