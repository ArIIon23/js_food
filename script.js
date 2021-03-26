const product = {
    plainBurger:{
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall(){
            return this.kcall * this.amount;
        },
    },
    
    freshBurger:{
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall(){
            return this.kcall * this.amount;
        },
    },
    
    freshCombo:{
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 700,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall(){
            return this.kcall * this.amount;
        },
    }
    
}


const extraProduct = {
    doubleMayonnaise:{
        name: 'Двойной майонез',
        price: 5000,
        kcall: 1000
    },
    
    lettuce:{
        name: 'Салатный лист',
        price: 2500,
        kcall: 10
    },
    
    cheese:{
        name: 'Сыр',
        price: 6500,
        kcall: 500
    }
    
}

const btnPlusMinus = document.querySelectorAll('.main__product-btn');
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptOut = document.querySelector('.receipt__window-out');
const receiptBtn = document.querySelector('.receipt__window-btn');
const receiptWindow = document.querySelector('.receipt__window');

//console.log(btnPlusMinus);

for (let i = 0; i < btnPlusMinus.length; i++){
    btnPlusMinus[i].addEventListener('click', function() {
        pluseOrMinus(this);
    })
}

// + - 

function pluseOrMinus(element) {
    //console.log(element);
    
    
    let parentId = element.closest('.main__product').getAttribute('id');
    let out = element.closest('.main__product').querySelector('.main__product-num');
    let price = element.closest('.main__product').querySelector('.main__product-price span');
    let kcall = element.closest('.main__product').querySelector('.main__product-call span')

    if(element.getAttribute('data-symbol') == '+' && product[parentId].amount < 1000000){
        product[parentId].amount++;
    }
    else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0){
        product[parentId].amount--;
    }
    
    
    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].summ;
    kcall.innerHTML = product[parentId].Kcall;
}

///////////////////////////////////////////////////////////

for(let i = 0; i < checkExtraProduct.length; i++){
    checkExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this);
    })
}

function addExtraProduct(el) {
    const parent = el.closest('.main__product');
    const parentId = parent.getAttribute('id');
    
    product[parentId][el.getAttribute('data-extra')] = el.checked;
    
    
    const kcall = parent.querySelector('.main__product-call span');
    const price = parent.querySelector('.main__product-price span');
    const ekDataInfo = el.getAttribute('data-extra');
 
    if(product[parentId][ekDataInfo] == true){
        product[parentId].kcall +=  extraProduct[ekDataInfo].kcall;
        product[parentId].price +=  extraProduct[ekDataInfo].price;
    }
    
    else{
        product[parentId].kcall -=  extraProduct[ekDataInfo].kcall;
        product[parentId].price -=  extraProduct[ekDataInfo].price;
    }
    
    kcall.innerHTML = product[parentId].Kcall;
    price.innerHTML = product[parentId].summ;
}


let arrProduct = [];
let totalName = '';
let totalPrice = 0;
let totalKcall = 0;

console.log(arrProduct);
addCart.addEventListener('click', function() {
    
    for(const key in product){
        const productObj = product[key];
        
        if(productObj.amount > 0){
            arrProduct.push(productObj);
            
            for(const newKey in productObj){
                if(productObj[newKey] === true){
                    productObj.name += '\n' + extraProduct[newKey].name;
                }
            }
        }
        
        productObj.price = productObj.summ;
        productObj.kcall = productObj.Kcall;
    }
    
    
    for (let i = 0; i < arrProduct.length; i++){
        const el = arrProduct[i];
        totalKcall += el.kcall;
        totalPrice += el.price;
        totalName += '\n' + el.name + '\n';
    }
    
    //Enter --- \n
    
    receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Калл:  ${totalKcall}\n Стоимость покупки:   ${totalPrice} сумм`;
    
    
    
    
    
    
    
    
    receipt.style.display = 'flex';
   
    setTimeout(function() {
         receipt.style.opacity = '1';
    }, 200)
    
    setTimeout(function() {
        receiptWindow.style.top = '10%';
    }, 300)
    
})


receiptBtn.addEventListener('click', function() {
    setTimeout(function() {
        receiptWindow.style.top = '-100%';
    }, 500);
    
    setTimeout(function() {
        receipt.style.display = 'none';
    }, 500);
    
    let out = document.querySelectorAll('.main__product-num');
    let price =  document.querySelectorAll('.main__product-price span');
    let kcall =  document.querySelectorAll('.main__product-call span')
   
   for (let i = 0; i < out.length; i++) {
       
    out[i].innerHTML = 0;
    kcall[i].innerHTML = 0;
    price[i].innerHTML = 0; 
   }
    
  
})