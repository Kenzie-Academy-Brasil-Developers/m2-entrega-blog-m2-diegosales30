import { User, dadosUser, saida, aut} from "../models/User.js";
const form          = document.querySelector('form')
const header        = document.querySelector('.header')
const containerPost = document.querySelector('.postagens')
const editarForm    = document.querySelector('#formularioEtitar')


class principal {

    static async usuario (){
        
        header.innerHTML = `
            <img src="${dadosUser.avatarUrl}">
            <h2>${dadosUser.username}</h2>
            <button id="logout">Logout</button>
        `
    }

    
    static async criarPost(event){
        event.preventDefault()
        const content = {}
        const textContent = [...event.target]
        textContent.forEach(text => {
            if(text.name){
                const  name = text.name
                const  value = text.value
                
                content[name] = value
            }

        });
        console.log(content)
        await User.criarPost(content)

        setTimeout(() => {
            document.location.reload()
            clearInterval()
        }, 2500)
        
    }

    static async  listarPost (){
        
        const saida     =  JSON.parse(localStorage.getItem("postagem"))
        const dado = saida
        
        let userid = saida.map(id => {
            return id.id
        })
        for(let i = 0; i < dado.length; i++){

            const div1 = document.createElement('div')
            div1.classList.add('container-post')

            const div2 = document.createElement('div')
            div2.classList.add('container-flex')


            const img = document.createElement('img')
            img.classList.add('imgPost')
            img.src = `${dado[i].owner.avatarUrl}`

            const h3 = document.createElement('h3')
            h3.innerText = `${dado[i].owner.username}`

            div2.append(img, h3)
            div1.appendChild(div2)

            const div3 = document.createElement('div')
            div3.classList.add('conteudo')

            const p = document.createElement('p')
            p.innerText = `${dado[i].post}`
            p.id = userid[i]
            


            div3.appendChild(p)
            div1.appendChild(div3)

            if(aut.userId === dado[i].owner.id){
                //console.log('IDENTICO')
                const btnEditar  = document.createElement('button')
                btnEditar.innerText = 'editar'
                btnEditar.id  = userid[i]
                btnEditar.classList.add('btn-editar')

                const btnRemover = document.createElement('button')
                btnRemover.innerText = 'excluir'
                btnRemover.id = userid[i]

                btnRemover.classList.add('btn-remover')
                
                const span = document.createElement('span')
                span.classList.add('dataPost')
                span.innerText = `${dado[i].createdAt}`

                div1.append(btnEditar,btnRemover, span )
            }
            containerPost.append(div1) 
        }
        await User.getPost()
        
    }
    
    static async remover(event){
        event.preventDefault()

        const idPost = event.target.id
        User.removerPost(idPost)
        
        setTimeout(() => {
            document.location.reload()
            clearInterval()
        }, 2500)
        
    }

    static logout(){
        localStorage.clear();
        setTimeout(function() {
            window.location.assign("/src/paginas/login.html")

        }, 1000);

    }
    static criarPopupEdicao(event){
        event.preventDefault()
        const idEdit = event.target.id
        const divPop = document.querySelector('.popUpAtualizar')
        divPop.style.display="flex"
        

    }
    static dadosEdit(event){
        event.preventDefault()
        const btn = document.querySelector('.btn-remover')
        const btnid = btn.id

        console.log(btnid)
        const dados = {}
        
        const valor =  [...event.target]
        valor.forEach(current => {
            if(current.name){
                const name = current.name
                const value = current.value

                dados[name] = value
            }
            console.log(dados)
        })
        User.atualizarPost(btnid, dados)
        const divPop = document.querySelector('.popUpAtualizar')
        divPop.style.display="none"

        setTimeout(() => {
            document.location.reload()
            clearInterval()
        }, 2000);
        
    }
}


principal.usuario()
form.addEventListener('submit',principal.criarPost)
await User.getPost()
principal.listarPost()

const logout        = document.querySelector('#logout')
logout.addEventListener('click', principal.logout)


const btnRemover = document.querySelectorAll('.btn-remover')
btnRemover.forEach(btn => btn.addEventListener("click", principal.remover))


const btnEdit = document.querySelectorAll('.btn-editar')
btnEdit.forEach(btn => btn.addEventListener("click", principal.criarPopupEdicao))


editarForm.addEventListener("submit", principal.dadosEdit)
