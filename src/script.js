import { User } from "./models/User.js";
const input  = document.querySelector('form')

class InfoCadastro {

    static inputs(event){
        event.preventDefault()
        const getInputs = event.target

        const dados     = [...getInputs]

        const dadosUsuario = {}
        dados.forEach(user => {
            if(user.name){
                const name = user.name
                const value = user.value

                dadosUsuario[name] = value
            }
        })
        User.register(dadosUsuario)
    }
}

input.addEventListener("submit", InfoCadastro.inputs)

