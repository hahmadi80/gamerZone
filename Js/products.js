// items array
const items = [
    {
        tag:'1',
        name:'msi z390 ace',
        price:'2000000',
        href:'products-html/product-1.html',
        category:'مادربرد'
    },
    {
        tag:'2',
        name:'msi rtx 2080ti',
        price:'12000000',
        href:'',
        category:'گرافیک'
    },
    {
        tag:'3',
        name:'coolermaster H500',
        price:'1500000',
        href:'',
        category:'جانبی'
    },
    {
        tag:'4',
        name:'msi gk80',
        price:'1000000',
        href:'',
        category:'جانبی'
    },
    {
        tag:'5',
        name:'amd R7 3900x',
        price:'6000000',
        href:'',
        category:'پردازنده'
    },
    {
        tag:'6',
        name:'i7 8700k',
        price:'5500000',
        href:'',
        category:'پردازنده'
    },
    {
        tag:'7',
        name:'g.skill trident z 8gb',
        price:'800000',
        href:'',
        category:'هارد'
    },
    {
        tag:'8',
        name:'hyper X 240gb rgb',
        price:'1200000',
        href:'',
        category:'هارد'
    },
];

// select HTML elements
const parentItems = document.querySelector('.parent-items');

const parentBtns = document.querySelector('.list-featured ul');

//DOMContentLoaded
window.addEventListener('DOMContentLoaded' , () => {
    displayItems(items);
    displayBtns();
});

// dynamic add btns with categories
function displayBtns(){
    const btnCategory = items.reduce((lastValue , currentValue) => {
        if (!lastValue.includes(currentValue.category)){
            lastValue.push(currentValue.category);
        }
        return lastValue;
    } , ['همه']).map((item) => {
        return `<li class="filter-btn" data-id=${item}><a>${item}</a></li>`
    }).join('');
    parentBtns.innerHTML = btnCategory;
    const btns = document.querySelectorAll('.filter-btn');

    // filter items with btns
    btns.forEach((btn) => {
        btn.addEventListener('click' , (e) => {
            const data = e.currentTarget.dataset.id;
            const category = items.filter((item) => {
                if (item.category === data){
                    return item;
                }
            })
            if (data === 'همه'){
                displayItems(items);
            }
            else{
                displayItems(category);
            }
        })
    })
}

// display items
function displayItems(menu) {
    const menuItems = menu.map((item) => {
        return `<div class="col-xs-12 col-580-6 col-770-4 col-md-3">
                    <div class="product-item">
                        <!-- Product pic -->
                        <div class="product-pic pic${item.tag}">

                            <ul class="hover-product">
                                <li><a href="#"><i class="fas fa-heart"></i></a></li>
                                <li><a href="#"><i class="fas fa-retweet"></i></a></li>
                                <li class="add-to-cart"><a><i class="fas fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>

                        <!-- Product text -->
                        <div class="product-text">
                            <h4><a href=${item.href}>${item.name}</a></h4>
                            <h5>${item.price} تومان</h5>
                        </div>

                    </div>
                </div>`
    }).join('');
    parentItems.innerHTML = menuItems;


    // **** for the add to cart ****
    // give add to cart Buttons
    const addButtons = document.querySelectorAll('.add-to-cart');


// make add event listener with index
    addButtons.forEach(function (btn , index){
        btn.addEventListener('click' , function () {
            counterFunc(products[index]);
            priceFunc(products[index]);

        });
    });
}

// **** add to cart ****
const cartCount = document.querySelector('.cart');


// make array with object parts for information about products
let products = [
    {
        name: 'msi z390',
        number: 0,
        price: '2000000',
        tag:'prod12'
    },

    {
        name: 'rtx 2080ti',
        number: 0,
        price: '12000000',
        tag: 'prod22'
    },

    {
        name: 'coolermaster H500',
        number: 0,
        price: '1500000',
        tag: 'prod32'
    },

    {
        name: 'msi gk80',
        number: 0,
        price: '1000000',
        tag: 'prod42'
    },

    {
        name: 'amd r7 3900x',
        number: 0,
        price: '6000000',
        tag: 'prod52'
    },

    {
        name: 'i7 7800k',
        number: 0,
        price: '5500000',
        tag: 'prod62'
    },

    {
        name: 'g.skill trident z 8gb',
        number: 0,
        price: '800000',
        tag: 'prod72'
    },

    {
        name: 'hyper x 240gb rgb',
        number: 0,
        price: '1200000',
        tag: 'prod82'
    }

];

// counter
function counterFunc(product) {
    let productNumber = parseInt(localStorage.getItem('product-number'));
    if (productNumber) {
        localStorage.setItem('product-number' , productNumber + 1);
        cartCount.textContent = productNumber + 1;
    }
    else {
        localStorage.setItem('product-number' , 1);
        cartCount.textContent = 1;
    }
    highlightFunc(product);
}

// Highlight Func
function highlightFunc(product) {
    let productsBuy = JSON.parse(localStorage.getItem('products'));
    if (productsBuy != null){
        if (productsBuy[product.name] == undefined){
            productsBuy = {
                ...productsBuy ,
                [product.name]:product
            }
        }
        productsBuy[product.name].number += 1;
    }
    else {
        productsBuy = {
            [product.name]:product
        }
        productsBuy[product.name].number = 1;
    }
    localStorage.setItem('products' , JSON.stringify(productsBuy))
}

// price func
function priceFunc(product) {
    let price = localStorage.getItem('total-price');
    if (price){
        price = parseInt(price);
        localStorage.setItem('total-price' , price + parseInt(product.price));
    }
    else {
        localStorage.setItem('total-price' , product.price);
    }
}

// display cart
function displayCart() {
    const products = JSON.parse(localStorage.getItem('products'));
    const price = localStorage.getItem('total-price');
    const productNumber = localStorage.getItem('product-number');

    const infoCart = document.querySelector('.info-cart');
    const infoPrice = document.querySelector('.product-price');
    const infoNumber = document.querySelector('.count-product');
    const infoClear = document.querySelector('.clear-list');


    if (infoCart && products){
        Object.values(products).map((item) => {
            infoCart.innerHTML += `<div class="col-xs-12 info-title-cart">

                            <div class="col-xs-4">
                                <h3>${item.name}</h3>
                            </div>

                            <div class="col-xs-4">
                                <h3>${item.price}</h3>
                            </div>

                            <div class="col-xs-2">
                                <h3>${item.number}</h3>
                            </div>

                            <div class="col-xs-2">
                                <h3>${item.price * item.number}</h3>
                            </div>
                        </div>
            `
        });
        infoNumber.textContent = productNumber;
        infoPrice.textContent = price;

        infoClear.addEventListener('click' , () => {
            localStorage.clear();
            location.reload();
        })


    }



}




// update counter
function updateCounter() {
    const number = localStorage.getItem('product-number');
    if (number){
        cartCount.textContent = number;
    }
}

updateCounter();
displayCart()