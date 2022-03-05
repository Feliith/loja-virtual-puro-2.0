import productsQuant from './data/Quant.js'
import Products from './data/Products.js'

const productsInit = () => {
    const productsConteiner = document.querySelector('.products-conteiner')

    let pagePos = 0

    const pageInit = () => {
        productsConteiner.innerHTML = ''

        Products[pagePos].map((item, index) => {
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
        })
    }

    pageInit()

    const pageSelect = document.querySelector('.page-select')

    for (let i = 0 ; i < Products.length ; i++) {
        pageSelect.innerHTML += `
            <div class="input-wrap">
                <input type="radio" name="page" class="page-input" />
                <label for="page" class="page-label"></label>
            </div>
        `
    }

    const allPageIput = document.querySelectorAll(".page-input")
    const allInputWrap = document.querySelectorAll('.input-wrap')

    allPageIput[0].checked = true

    for (let i = 0 ; i < allInputWrap.length ; i++) {
        allInputWrap[i].addEventListener('click', () => {
            allPageIput[i].checked = true
            pagePos = i
            pageInit()
        })
    }
}
productsInit()

const bannerInit = () => {
    const allPromotionImg = document.querySelectorAll('.promotion-img')
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

    for (let i = 0 ; allBannerInputWrap.length ; i++) {
        allBannerInputWrap[i].addEventListener('click', () => {
            allBannerInput[i].checked = true
        })
    }
}
bannerInit()