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
                    <button class="product-btn">Comprar</button>
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