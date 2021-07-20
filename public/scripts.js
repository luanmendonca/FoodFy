if(document.querySelector('.modal-fora') && document.querySelector('.card')) {

const modalexterno = document.querySelector(".modal-fora")
const cards = document.querySelectorAll(".card")

for (let card of cards) {
    card.addEventListener("click", function(){
        const imagemnova = card.getAttribute("id")
        const titulonovo = card.getAttribute("id2")
        const autornovo = card.getAttribute("id3")
        const newid = card.getAttribute("id4")
        modalexterno.classList.add("actived")
        modalexterno.querySelector("img").src=imagemnova
        modalexterno.querySelector("h1").textContent=titulonovo
        modalexterno.querySelector("p").textContent=`por ${autornovo}`
        modalexterno.querySelector("a").href=`/receitas/${newid}`

    })
}

document.querySelector(".close-modal").addEventListener("click", function(){
    modalexterno.classList.remove("actived")
})}

if (document.querySelector('.modal-receita')) {

const modalreceita = document.querySelector(".modal-receita")
const lermais = document.querySelector(".lermais")
const lermaisfora = document.querySelector(".lermais-fora")
const lermenos = document.querySelector(".lermenos")

lermais.addEventListener("click", function(){
    modalreceita.classList.add("ativo")
    lermais.classList.add("ativo")
})

lermenos.addEventListener("click", function(){
    modalreceita.classList.remove("ativo")
    lermais.classList.remove("ativo")
})

}

const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

// paginação

function paginate(selectedPage, totalPages) {
        let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")    
            }
            
            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination) {
        const filter = pagination.dataset.filter
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`
        } else {
            if( filter ) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`

            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")



if (pagination) {
    createPagination(pagination)
}