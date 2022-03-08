import productsQuant from './data/Quant.js'
import Products from './data/Products.js'



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



const productsInit = () => {
    const productsWrap = document.querySelector('.products-wrap')
    const productsConteiner = document.querySelector('.products-conteiner')

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
        })
    }

    pageInit()

    const pageSelect = document.querySelector('.page-select')

    if (window.innerWidth < 800) {
        for (let i = 0 ; i < Products.length ; i++) {
            pageSelect.innerHTML += `
                <div class="input-wrap">
                    <input type="radio" name="page" class="page-input" />
                    <label for="page" class="page-label"></label>
                </div>
            `
        }
        const allPageIput = document.querySelectorAll('.page-input')
        const allInputWrap = document.querySelectorAll('.input-wrap')

        allPageIput[0].checked = true

        for (let i = 0 ; i < allInputWrap.length ; i++) {
            allInputWrap[i].addEventListener('click', () => {
                allPageIput[i].checked = true
                pagePos = i
                pageInit()

                const productsWrap = document.querySelector('.products-wrap')
                productsWrap.scrollLeft = i * window.innerWidth
            })
        }
    }

    const scrollDetect = () => {

        productsWrap.onscroll = () => {
            const allPageIput = document.querySelectorAll('.page-input')

            for (let i = 0 ; i < allPageIput.length ; i++) {
                if (productsWrap.scrollLeft >= i * window.innerWidth - window.innerWidth / 2) {
                    allPageIput[i].checked = true
                }
            }
        }
    }
    scrollDetect()
}
productsInit()
