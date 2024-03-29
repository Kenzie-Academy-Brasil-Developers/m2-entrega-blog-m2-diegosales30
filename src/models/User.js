



class User{
    
    
    static async register(data){
        const response = await fetch("https://api-blog-m2.herokuapp.com/user/register", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body":JSON.stringify(data)
        })
        const dados = await response.json()
        
        
        if(dados.message == 'duplicate key value violates unique constraint \"UQ_97672ac88f789774dd47f7c8be3\"'){
            alert('EMAIL JA EM USO, FAÇA LOGIN')
            
            
            setTimeout(function() {
                
                window.location.assign("/src/paginas/login.html")

            }, 3000);

        }else{
            alert('Cadastro Realizado com sucesso!')
            
            setTimeout(function() {
                window.location.assign("/src/paginas/login.html")

            }, 2000);
            
        }
        
    }

    static async login(data){
        
        const response  = await fetch("https://api-blog-m2.herokuapp.com/user/login", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body":JSON.stringify(data)
        })
        const dados = await response.json()
        
        localStorage.setItem('aut', JSON.stringify(dados))

        await this.listarUser()
        
        if(response.status == 200){
            
            
            setTimeout(function() {
                
                window.location.assign("./../paginas/principal.html")
                
            }, 2000);
        }
        
        
        if(response.status == 400){
            alert('Login failed, check email or password')
        }
        
    }

    static async listarUser (){
        const aut = JSON.parse(localStorage.getItem('aut'))
        let token = aut.token
        let userId = aut.userId


        const response = await fetch(`https://api-blog-m2.herokuapp.com/user/${userId}`, {
            "method": "GET",
            "headers": {
                "Authorization":  `Bearer ${token}`
            }
        })
        const data = response.json()
        const output = await data
        localStorage.setItem('output', JSON.stringify(output))
        
        
        return output
    }

    static async criarPost(data){
        const aut = JSON.parse(localStorage.getItem('aut'))
        let token = aut.token
        const response = await fetch("https://api-blog-m2.herokuapp.com/post", {
            "method": "POST",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            "body":JSON.stringify(data)
        })
        const dadosPost = response.json()
        await User.getPost()
        console.log(dadosPost)
        return dadosPost
    }


    static async getPost(){
        const aut = JSON.parse(localStorage.getItem('aut'))
        let token = aut.token
        
        const response = await fetch( `https://api-blog-m2.herokuapp.com/post`, {
            method: "GET",
            headers: {
            "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json()
        const post = await data.data
        
        localStorage.setItem("postagem", JSON.stringify(post))
        //console.log(post)
        
        //return post
    }

    static async atualizarPost(idPost, data){
        const aut = JSON.parse(localStorage.getItem('aut'))
        let token = aut.token
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post/${idPost}`, {
            "method": "PATCH",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            "body":JSON.stringify(data)
        })
        const dat = await response
        console.log(dat)
    }

    static async removerPost(id){
        const saida     = JSON.parse(localStorage.getItem("postagem"))
        const aut = JSON.parse(localStorage.getItem('aut'))
        let token = aut.token
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post/${id}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        })
        const data  = await response
        console.log(data)
    }
}
export const  aut      = JSON.parse(localStorage.getItem('aut'))
export const dadosUser = JSON.parse(localStorage.getItem('output'))
export const saida     = JSON.parse(localStorage.getItem("postagem"))
export {User}


