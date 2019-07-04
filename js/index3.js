document.getElementById('mais-item').addEventListener('click', novoItem)
document.getElementById('salvar-nota').addEventListener('click', cadastraItem)
document.getElementById('fake-api').addEventListener('click', testarFetch)


//variáveis globais
let id = 0 //itens da nota - inputs dos formularios
let notas = returnStorage('notas')


// if (localstorage.getItem('notas')) {
//     let notas = JSON.parse(localStorage.getItem('notas'))
// }else{
//     let notas = []
// }

let mensagem = ''


/*<article class="nota">
		<h4>Faça uma lista</h4>
		<ul>
			<li>Para reorganizar a lista, arraste e solte os itens</li>
			<li>Assinale as tarefas concluídas</li>
			<li>Os itens assinalados são movidos automaticamente para o fim da lista</li>
		</ul>
		<p class="acoes">
			<a href="#"><i class="fa fa-apple fa-wf" aria-hidden="true"></i></a>
			<a href="#"><i class="fa fa-android fa-wf" aria-hidden="true"></i></a>
			<a href="#"><i class="fa fa-chrome fa-wf" aria-hidden="true"></i></a>
			<a href="#">
				<i class="fa fa-close fa-wf" aria-hidden="true"></i>
			</a>
		</p>
    </article>*/
    
    

function atualizaStorage(k, v) {
    localStorage.setItem(k, JSON.stringify(v))
}

function retornaStorage(k) {
    if (JSON.parse(localstorage.getItem(k))) {
        
    }

}

function geraTemplate() {
    //iterar o array de notas (nota a nota)
    document.getElementById('section-notas').innerHTML = ''

    for (let i = 0; i < notas.length; i++) {
        //criar os elementos
        let article = document.createElement('article') // <article></article>
        let h4 = document.createElement('h4')
        let ul = document.createElement('ul')
        let p = document.createElement('p')

        let aApple = document.createElement('a')
        let aAndroid = document.createElement('a')
        let aChrome = document.createElement('a')
        let aClose = document.createElement('a')

        let iApple = document.createElement('i')
        let iAndroid = document.createElement('i')
        let iChrome = document.createElement('i')
        let iClose = document.createElement('i')

        //iterando o array de itens da nota atual (item a item)
        for (let x = 0; x < notas[i].itens.length; x++) {
            let li = document.createElement('li')
            li.appendChild(document.createTextNode(notas[i].itens[x]))
            ul.appendChild(li)
        }


        //setar os atributos
        aApple.setAttribute('href', '#')
        iApple.setAttribute('class', 'fa fa-apple fa-wf')
        iApple.setAttribute('aria-hidden', 'true')
        iApple.setAttribute('aria-hidden', 'true')

        aAndroid.setAttribute('href', '#')
        iAndroid.setAttribute('class', 'fa fa-android fa-wf')
        iAndroid.setAttribute('aria-hidden', 'true')

        aChrome.setAttribute('href', '#')
        iChrome.setAttribute('class', 'fa fa-chrome fa-wf')
        iChrome.setAttribute('aria-hidden', 'true')

        aClose.setAttribute('href', '#')
        iClose.setAttribute('class', 'fa fa-close fa-wf')
        iClose.setAttribute('aria-hidden', 'true')
        iClose.setAttribute('onclick', 'excluirNota(this)')
        iClose.setAttribute('codigo', notas[i].codigo)


        p.setAttribute('class', 'acoes')
        article.setAttribute("class", "nota") // <article class="nota"></article>

        //gerar os append's necessários
        aApple.appendChild(iApple)
        aAndroid.appendChild(iAndroid)
        aChrome.appendChild(iChrome)
        aClose.appendChild(iClose)

        p.appendChild(aApple)
        p.appendChild(aAndroid)
        p.appendChild(aChrome)
        p.appendChild(aClose)

        h4.appendChild(document.createTextNode(notas[i].titulo))

        article.appendChild(h4)
        article.appendChild(ul)
        article.appendChild(p)


        //pra cada nota, você vai gerar um template
        document.getElementById('section-notas').appendChild(article)
    }

    limpaCampo()
        
}
function cadastraItem() {


    //recuperar o título
    let titulo = document.getElementById('titulo').value

    //recuperar os itens
    let itens = document.getElementsByClassName('itens-lista'); //retorna um array com todos os inputs de itens


    if (validaCadastro(titulo, itens)) {

        
        let nota = {}
        nota.codigo = Math.random()
        nota.itens = []
        nota.titulo = titulo.trim()
        //cadastrar os itens
        for (let i = 0; i < itens.length; i++) {
            nota.itens.push(itens[i].value.trim())
        }
        notas.push(nota)
        localStorage.setItem('notas', JSON.stringify(notas))
        geraTemplate()
    } else {

        alert("Preencha Todos os Campos!")
        mensagem = ''
    }


    // console.log(notas);
    // let jasonString = JSON.stringify(notas)
    // let objetoJS = JSON.parse(jasonString)
    // console.log(jasonString)
    // console.log(objetoJS)
}



function validaCadastro(titulo, itens) {

    if (titulo.trim() == '') {
        mensagem = 'Preencha o titulo'
        return false
    }

    if (itens.length == 0){
        mensagem = 'Preencha pelo menos 1 item'
        return false 
    }

    for (let i = 0; i < itens.length; i++) {
        if (itens[i].value.trim() == '') {
            mensagem = `Preecha o item ${i+1}`
            return false
        }
        
    }

    return true;
}

/*<div>
    <label for="">ITEM 1</label>
    <input type="text" id="item0" class="itens-lista">
    <i class="fa fa-minus-square-o fa-lg" aria-hidden="true" style="margin-left: 1%;"></i>
</div>*/
function novoItem() {
    //criar elementos
    let div = document.createElement('div')
    let label = document.createElement('label')
    label.appendChild(document.createTextNode(`Item ${id + 1}`))
    let input = document.createElement('input')
    let icone = document.createElement('i')
    let br = document.createElement('br')
    br.setAttribute('class', 'clear')
    // setar atributos
    label.setAttribute('for', '')

    input.setAttribute('type', 'text')
    input.setAttribute('id', `item${id}`)
    id++
    input.setAttribute('class', 'itens-lista')

    icone.setAttribute('class', 'fa fa-minus-square-o fa-lg')
    icone.setAttribute('aria-hidden', 'true')
    icone.setAttribute('style', 'margin-left: 1%;')

    //motar lego(div)
    div.appendChild(label)
    div.appendChild(input)
    div.appendChild(icone)
    div.appendChild(br)


    //inserir a div gerada em #div-new
    document.getElementById('div-new').appendChild(div)

    input.focus()
}

function testarFetch() {
    const urlTodos = 'https://jsonplaceholder.typicode.com/todos'
    const urlUnico = 'https://jsonplaceholder.typicode.com/todos/1dfdfd'
    fetch(urlUnico).then(function (resultado) {
        if (resultado.status == 404)
            throw 'página não encontrada'

        return resultado.json()

    }).then(function (objetoDados) {

        console.log(
            `
                código: ${objetoDados.id}
                descrição : ${objetoDados.title}
            `
        );

    }).catch(function (e) {
        console.log(`Deu pau: ${e}`);


    })
    
}

function excluirNota(icone) {


    if (confirm("Você deseja excluir a nota?")) {
        let codigoNota = icone.getAttribute('codigo')

        for (let i = 0; i < notas.length; i++) {
    
            if(codigoNota == notas[i].codigo){
                console.log(`encontrei a nota: ${notas[i].codigo}`);
                notas.splice(i, 1)
                localStorage.getItem('notas', JSON.stringify(notas))

            }
            //console.log(notas[i].codigo)
            
        }
        console.log(icone)
        //              i       a         p          article
        let article = icone.parentNode.parentNode.parentNode
        let section = document.getElementsByTagName('section')[1]
    
        section.removeChild(article)
    }
   
}


function limpaCampo() {
    document.getElementById('limpar-nota').click()

    document.getElementById('div-new').innerHTML = ''
    id = 0
}