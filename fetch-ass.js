try{

    const fetchData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer hchcjdjcjc",
  },
};

let users = [];

fetch("https://dummyjson.com/products/category/womens-watches", fetchData)
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    products = data.products;
    console.log(products);

    let productArray = products.map(function (value) {
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

