import Products from './data/Products.js'
import Cart from './data/Cart.js'


let bannerPos = 0

const bannerInit = () => {
    const allPromotionImg = document.querySelectorAll('.promotion-img')
    allPromotionImg[bannerPos].classList.add('on')

    const bannerPage = document.querySelector('.banner-page')

    for (let i = 0 ; i < allPromotionImg.length ; i++) {
        bannerPage.innerHTML += `
            <div class="input-banner-wrap">
                <input type="radio" name="banner" class="banner-input" />
                <label for="banner" class="banner-label"></banner>
            </div>
        `
    }
    
    const allBannerInput = document.querySelectorAll('.banner-input')
    const allBannerInputWrap = document.querySelectorAll('.input-banner-wrap')

    allBannerInput[0].checked = true

    for (let i = 0 ; i < allBannerInputWrap.length ; i++) {
        allBannerInputWrap[i].addEventListener('click', () => {
            allBannerInput[i].checked = true
            bannerPos = i
            bannerOn()
        })
    }
}
bannerInit()

const bannerSlider = () => {
    const bannerButton = document.querySelectorAll('.slider-button')
    const allBannerInput = document.querySelectorAll('.banner-input')

    bannerButton[0].addEventListener('click', () => {
        if (bannerPos == allBannerInput.length - 1) {
            bannerPos--
        } else {
            bannerPos = allBannerInput.length - 1
        }
        allBannerInput[bannerPos].checked = true
        bannerOn()
    })

    bannerButton[1].addEventListener('click', () => {
        if (bannerPos == 0) {
            bannerPos++
        } else {
            bannerPos = 0
        }
        allBannerInput[bannerPos].checked = true
        bannerOn()
    })
}
bannerSlider()

const bannerOn = () => {
    const promotionImageOn = document.querySelector('.promotion-img.on')
    promotionImageOn.classList.remove('on')

    const allPromotionImg = document.querySelectorAll('.promotion-img')
    allPromotionImg[bannerPos].classList.add('on')
}



const productPage = (src, name, price) => {
    const productPageWrap = document.querySelector('.product-page-wrap')

    productPageWrap.classList.add('on')

    productPageWrap.innerHTML += `
        <div class="product-page-conteiner">
            <button class="product-page-close">
                <img src="images/icons/cross.png" alt="x" />
            </button>
            <img src="${src}" />
            <h3>${name}</h3>
            <h2>${price}</h2>
            <div class="quant-select">
                <button class="quant-btn">-</button>
                <p class="quant-num">1</p>
                <button class="quant-btn">+</button>
            </div>
            <button class="add-cart-btn">Adicionar ao carrinho</button>
        </div>
    `

    const productPageClose = document.querySelector('.product-page-close')

    productPageClose.addEventListener('click', () => {
        productPageWrap.classList.remove('on')
        productPageWrap.innerHTML = ''
    })

    const addCartBtn = document.querySelector('.add-cart-btn')
    const productBuyed = document.querySelector('.product-buyed')

    addCartBtn.addEventListener('click', () => {
        productPageWrap.classList.remove('on')
        productPageWrap.innerHTML = ''
        productBuyed.classList.add('on')
        setTimeout(() => {
            productBuyed.classList.remove('on')
        }, 1000)
    })

    quantSelect()

    const addCartButton = document.querySelector('.add-cart-btn')

    addCartButton.onclick = () => {
        addCart(src, name, price)
        cartUpdate()
    }
}

const productInfos = (i) => {
    const productImage = document.querySelectorAll('.product img')
    const productH3 = document.querySelectorAll('.product h3')
    const productH2 = document.querySelectorAll('.product h2')

    const src = productImage[i].getAttribute('src')
    const name = productH3[i].innerText
    const price = productH2[i].innerText

    productPage(src, name, price)
}

const productsInit = () => {
    const productsWrap = document.querySelector('.products-wrap')
    const productsConteiner = document.querySelector('.products-conteiner')
    const productSlider = document.querySelector('.product-slider')

    let pagePos = 0

    const pageInit = () => {
        productsConteiner.innerHTML = ''

        Products.map((item, index) => {
            productsConteiner.innerHTML += `
                <div class="product">
                    <div class="image-wrap">
                        <div class="image-shadow"></div>
                        <img src="${item.src}" />
                    </div>
                    <button class="image-btn">Comprar</button>
                    <h3>${item.name}</h3>
                    <h2>R$ ${item.price}</h2>
                    <div class="product-line" />
                    <p>Comprar este produto</p>
                </div>
            `
            if (window.innerWidth < 800) {
                productSlider.innerHTML += `
                    <button class="slider-input-wrap" id="${index}">
                        <input type="radio" name="slider" class="slider-input" />
                        <label class="slider-label"></label>
                    </button>
                `
            }
        })
    }

    pageInit()

    const allInputWrap = document.querySelectorAll('.slider-input-wrap')
    const allSliderInput = document.querySelectorAll('.slider-input')
    allSliderInput[0].checked = true

    for (let i = 0 ; i < allInputWrap.length ; i++) {
        allInputWrap[i].addEventListener('click', () => {
            allSliderInput[i].checked = true
            sliderScroll(i)
        })
    }

    const sliderScroll = (i) => {
        productsWrap.scrollLeft = allProducts[0].offsetWidth * i
    }

    const allProducts = document.querySelectorAll('.product')

    productsWrap.onscroll = () => {
        for (let i = 0 ; i < allProducts.length ; i++) {
            if (productsWrap.scrollLeft >= i * window.innerWidth - window.innerWidth / 2) {
                allSliderInput[i].checked = true
            }
        }
    }

    for (let i = 0 ; i < allProducts.length ; i++) {
        allProducts[i].addEventListener('click', () => {
            productInfos(i)
        })
    }
}
productsInit()

let quant = 1

const quantSelect = () => {
    const allQuantButton = document.querySelectorAll('.quant-btn')
    const quantNumber = document.querySelector('.quant-num')
    
    quant = 1

    allQuantButton[0].onclick = () => {
        if (quant > 1) {
            quant--
            quantNumber.innerText = quant
        }
    }

    allQuantButton[1].onclick = () => {
        quant++
        quantNumber.innerText = quant
    }
}

let productAdded = []
let firstItem = true
let idItem = 0

const addCart = (src, name, price) => {
    productAdded = {src: `${src}`, name: `${name}`, price: `${price}`, quant: `${quant}`, id: idItem}

    if (firstItem) {
        firstItem = false
        Cart.push(productAdded)
    } else {
        addItem(idItem, name)
    }
}

const addItem = (index, name) => {
    let cartContent = Cart[index]["name"]

    if (!cartContent.includes(name)) {
        Cart.push(productAdded)
        idItem++
    } else {
        Cart[index]["quant"]++
    }
}

const cartInit = () => {
    const body = document.querySelector('body')
    
    const cartButton = document.querySelector('.cart-icon')
    const cartConteiner = document.querySelector('.cart')
    const cartClose = document.querySelector('.cart-close')
    
    cartButton.onclick = () => {
        cartConteiner.classList.add('on')
        body.style.overflow = 'hidden'
    }

    cartClose.onclick = () => {
        cartConteiner.classList.remove('on')
        body.style.overflow = ''
    }
}
cartInit()

const cartUpdate = () => {
    const cartProducts = document.querySelector('.cart-products')

    cartProducts.innerHTML = ''

    Cart.map((item, index) => {
        cartProducts.innerHTML += `
            <div class='cart-product'>
                <div class="cart-product-img">
                    <img src="${item.src}" />
                </div>
                <div class="cart-product-info">
                    <h3>${item.name}</h3>
                    <h2>${item.price}</h2>
                </div>
                <div class="quant-select-cart">
                    <button class="quant-btn-cart sub">-</button>
                    <p class="quant-num-cart">${item.quant}</p>
                    <button class="quant-btn-cart add">+</button>
                </div>
                <button class="buy-one-btn">Comprar</button>
            </div>
        `
        cartQuantFunc(index)
    })
}

const cartQuantFunc = (index) => {
    const quantNumCart = document.querySelectorAll('.quant-num-cart')
    const cartQuantAdd = document.querySelectorAll('.quant-btn-cart.add')
    const cartQuantSub = document.querySelectorAll('.quant-btn-cart.sub')

    let cartQuant = Cart[index]["quant"]

    cartQuantSub[index].onclick = () => {
        if (cartQuant > 1) {
            cartQuant--
            quantNumCart[index].innerText = cartQuant
            Cart[index]["quant"] = cartQuant
            cartUpdate()
        }
    }

    cartQuantAdd[index].onclick = () => {
        cartQuant++
        quantNumCart.innerText = cartQuant
        Cart[index]["quant"] = cartQuant
        cartUpdate()
    }
}

