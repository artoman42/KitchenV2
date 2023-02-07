class Product{
    #Count = 1;
    constructor(Name, Category){
        this.Name = Name;
        this.Category = Category;
        
    }
    set Count(value){
        if(value>0) this.#Count = value;
    }
    get Count(){
        return this.#Count;
    }
}

class Dish{
    
    constructor(Name, Products, Recipe){
        this.Name = Name;
        this.Products = Products;   
        this.Recipe = Recipe;
    }
}

let product1 = new Product("Картопля", "Овоч");
let product2 = new Product("Вишня", "Ягода");
let product3 = new Product("Борошно", "Допоможні продукти");
let product4 = new Product("Молоко", "Молочні продукти");
let product5 = new Product("Вівсянка", "Каші");

let dish1 = new Dish("Вареники з вишнею", [product2, product3], "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus, magna at scelerisque auctor, lectus ex maximus leo, at ornare turpis urna nec tortor. Aliquam vel ullamcorper sapien, sed scelerisque leo. Nulla posuere ornare lectus, eget iaculis sapien finibus vitae. Curabitur placerat pretium diam nec lobortis. Duis condimentum, arcu nec tincidunt faucibus, neque ante porttitor sapien, pharetra iaculis neque justo a nulla. Aliquam fringilla sem et consectetur vulputate. Morbi et sem rhoncus orci feugiat ornare." );
let dish2 = new Dish("Вареники з картоплею",[ product1, product3], "Просіюємо 400 грам борошна. Додаємо пів чайної ложки солі. Сіль добре вмішуємо в борошно. ");
let dish3 = new Dish("Вівсянка з молоком", [product4, product5], "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus, magna at scelerisque auctor, lectus ex maximus leo, at ornare turpis urna nec tortor. Aliquam vel ullamcorper sapien, sed scelerisque leo. Nulla posuere ornare lectus, eget iaculis sapien finibus vitae. Curabitur placerat pretium diam nec lobortis. Duis condimentum, arcu nec tincidunt faucibus, neque ante porttitor sapien, pharetra iaculis neque justo a nulla. Aliquam fringilla sem et consectetur vulputate. Morbi et sem rhoncus orci feugiat ornare.");

let dishList = [dish1, dish2, dish3];
let presentProductList = [product1, product2, product3];
let categoryList = ["Овоч", "Ягода", "Допоможні продукти", "Молочні продукти",  "Каші" ];
function renderDishLst(dishSel){
    dishSel.length = 1; 
    dishList.forEach(x=> dishSel.options = new Option(x,x));
}

window.onload = function(){
    var dishSel = document.getElementById("SelectDish");
    var productTbl = document.getElementById("productTbl");
    var recipeTxt = document.getElementById("recipeTxt");
    var categorySel = document.getElementById("SelectCategory");
    //renderDishLst(dishSel);
     dishSel.length = 1; 
    dishList.forEach(x=>{
         dishSel.options[dishSel.options.length] = new Option(x.Name,x.Name);
       //  console.log(x.Name);
    });
    categoryList.forEach(x=>{
        categorySel.options[categorySel.options.length] = new Option (x, x);
    })


dishSel.onchange = function(){
   
    productTbl.innerHTML = "<tr> <th>Name</th> <th>Count</th> </tr>";

    dishList.find(x => x.Name === this.value).Products.forEach(y => {
  
        productTbl.innerHTML += `<tr><td>${y.Name}</td><td>${y.Count}</td></tr>`;
     
    })

 
   recipeTxt.value = dishList.find(x =>x.Name === this.value).Recipe;
}
var prodLst = document.createElement("ul");
presentProductList.forEach(x=> {
    var prod = document.createElement("li");
    prod.innerHTML = `${x.Name}`;
    prodLst.appendChild(prod);
    
})
document.body.append(prodLst);
categorySel.onchange = function(){
    while(prodLst.firstChild){
        prodLst.removeChild(prodLst.firstChild);
    }
    if(this.value === "Всі") 
    {
        presentProductList.forEach(x=> {
            var prod = document.createElement("li");
            prod.innerHTML = `${x.Name}`;
            prodLst.appendChild(prod);
            
        })
    }
    presentProductList.forEach(x =>{
        if( x.Category === this.value){
            var prod = document.createElement("li");
            prod.innerHTML = `${x.Name}`;
            prodLst.appendChild(prod);
        }
    })
    document.body.append(prodLst);
}
let canCook = [];
canCook = dishList.filter( x =>{
    let count = 0;
    presentProductList.forEach(y => {
        x.Products.forEach(z=>{
            if(y === z) count++;
        });
 })
    if(count === x.Products.length) return true;
});
//console.log(canCook);
let canCookLst = document.createElement("ul");
canCook.forEach(x=>{
    let canCookEl = document.createElement("li");
    canCookEl.innerHTML = `${x.Name}`;
    canCookLst.appendChild(canCookEl);
})
document.body.append(canCookLst);
}