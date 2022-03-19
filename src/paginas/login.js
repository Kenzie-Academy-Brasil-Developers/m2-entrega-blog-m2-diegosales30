import { User } from "../models/User.js";
const btnForm = document.querySelector('form')

class login {

    static usuario(event){
        event.preventDefault()
        const dadosLogin = [...event.target]

        const dadosUser = {}
        dadosLogin.forEach(userLogin => {
            if(userLogin.name){
                const name  = userLogin.name
                const value = userLogin.value
                
                dadosUser[name] = value
            }
        })
        User.login(dadosUser)
        
    }
    
}
btnForm.addEventListener("submit", login.usuario)

export {login}


