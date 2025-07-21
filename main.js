document.getElementById("add_icon").onclick = () => {
  document.getElementById("form_div").style.display = "flex";
};

document.getElementById("add_but").onclick = (e) => {
  e.preventDefault();
  add_item();
};

document.getElementById("x_but").onclick = (e) => {
  e.preventDefault();
  document.getElementById("form_div").style.display = "none";
};

document.getElementById("add_to_p_yes").onclick = () => {
  document.getElementById("add_to_p_div").style.display = "none";
};
document.getElementById("add_to_p_no").onclick = () => {
  document.getElementById("add_to_p_div").style.display = "none";
};

let all_items = [];

async function getItems() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      console.error("خطا في تحميل المنتجات");
      return;
    }
    const data = await response.json();
    all_items = await data;
  } catch {
    console.error("خطا في التحميل ");
  }
}

async function show_items() {
  await getItems();
  document.getElementById("products_container").innerHTML = "";
  
  all_items.forEach((item) => {
    document.getElementById("products_container").innerHTML += `
        
            <div class="one_product">
            <img src=${item.image} alt="">
            <div class="info">
                <div class="title">${item.title}</div>
                <div class="price">${item.price} <span>$</span></div>
                <div class="add_to_p fa fa-cart-plus" ></div>
            </div>
        </div>
        
        `;
  });

  const items = document.querySelectorAll(".add_to_p");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      document.getElementById("add_to_p_div").style.display = "flex";
    });
  });

  console.log(all_items);
}

show_items();

async function add_item() {
  let name = document.getElementById("name").value;
  let price = parseFloat( document.getElementById("price").value);
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;
  let img_url = document.getElementById("img_url").value;
if(!name || !price || !description || !category || !img_url){
    console.error("لا يوجد بيانات كافية ")
    return
}

  const response = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
        title:name,
        price:price,
        description:description,
        category:category,
        image:img_url
    })

  });

  if(!response.ok){
    console.error("فشل ارسال البيانات")
  }else{
    console.log("تم الارسال ")
    document.getElementById("form_div").style.display = "none";
    show_items();


  }
}
