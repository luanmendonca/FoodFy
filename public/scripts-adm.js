if (document.querySelector('.botao-instrucao')) {

  var btn_addingredient = document.getElementById('add-ingredient')
  var box1 = document.getElementById('box1')

  btn_addingredient.addEventListener("click", function(){
      createInput()
  })

  //<input id="ingrediente" type="text" name="ingredients[]" placeholder=" Exemplo: 2kg de farinha de trigo" value="{{ingredient}}"/>
  function createInput(){
    var elemento = document.createElement('input')
    elemento.setAttribute('type', 'text')
    elemento.setAttribute('name', 'ingredients[]')
    elemento.setAttribute('placeholder', 'Exemplo: 2kg de farinha de trigo')

    box1.appendChild(elemento)
  }

  var btn_addprep = document.getElementById('add-prep')
  var box2 = document.getElementById('box2')

  btn_addprep.addEventListener("click", function(){
    createInput2()
})


// <input id="preparation" type="text" name="preparation[]" placeholder=" Exemplo: Primeiro coloque a agua para ferver" />
function createInput2(){
  var elemento = document.createElement('input')
  elemento.setAttribute('type', 'text')
  elemento.setAttribute('name', 'preparation[]')
  elemento.setAttribute('placeholder', ' Exemplo: Primeiro coloque a agua para ferver')

  box2.appendChild(elemento)
}


}


if(document.querySelector('.h3-edit')){
  
  const formDelete = document.querySelector("#form-delete")
  formDelete.addEventListener("submit", function(event){
      const confirmation = confirm("Deseja deletar ?")
      if(!confirmation) {
          event.preventDefault()
      }
  })

}

if(document.querySelector('#form-delete-chef')) {
  
  const formDeleteChef = document.querySelector("#form-delete-chef")
  formDeleteChef.addEventListener("submit", function(event){
    const confirmation = confirm("deseja deletar ?")
    if(!confirmation) {
      event.preventDefault()
    }
  })
}


// Paginação

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