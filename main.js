
///////////////////////////logout/////////////////////////
document.querySelector('#logoutButton').addEventListener('click', ()=> {
    localStorage.clear()
  
    document.querySelector('#loginMain').classList.remove('hidden')
    document.querySelector('#middlePage').classList.add('hidden')
    location.reload()
})
//////////////////////////Newpost button///////////////////
document.querySelector('#newpostButton').addEventListener('click', ()=> {
    document.querySelector('#middlePage').classList.add('hidden')
    document.querySelector('#textPage').classList.remove('hidden')
})

//////////////////goto singup page/////////////////////
document.querySelector('#createButton').addEventListener('click', ()=>{
    document.querySelector('#middlePage').classList.add('hidden')
    document.querySelector('#loginMain').classList.add('hidden')
    document.querySelector('#signUpMain').classList.remove('hidden')
})

//////////////////////signUp /////////////////////////////
document.querySelector('#signupForm').addEventListener('submit', async (event) => {event.preventDefault()
try {
    const response = await axios.post('http://localhost:3001/users',{
        email:document.querySelector('#signupEmail').value,
        password:document.querySelector('#singupPassword').value
    })
    } catch (error) {
    alert('use other email !!!!!!!!!!')
}
document.querySelector('#signUpMain').classList.add('hidden')
document.querySelector('#loginMain').classList.remove('hidden')
})

/////////////////////////logIn////////////////////////////////
document.querySelector('#loginForm').addEventListener('submit', async (event)=>{event.preventDefault()
 try {
     const response = await axios.post('http://localhost:3001/users/login',{
         email: document.querySelector('#loginEmail').value,
         password: document.querySelector('#loginPassword').value
     })
     console.log(response)
     const idd = response.data.user.id
     console.log(idd)
          
     localStorage.setItem("userId",idd);
    } catch (error) {
     alert('login nono')
 }
 document.querySelector('#middlePage').classList.remove
 ('hidden')
 document.querySelector('#loginMain').classList.add('hidden')
}) 

///////////////////savepost/////////////////////////
document.querySelector('#postSaveButton').addEventListener('click', async (event)=>{
    try {
        const response = await axios.post(`http://localhost:3001/users/${localStorage.userId}/posts`,{
            title: document.querySelector('#titleBox').value,
            content: document.querySelector('#contentBox').value
                    
        })
          console.log(response)
        
       } catch (error) {
        alert('post nono')
        console.log(error)
    }
    document.querySelector('#middlePage').classList.remove
    ('hidden')
    document.querySelector('#loginMain').classList.add('hidden')
    document.querySelector('#textPage').classList.add('hidden')
    
   }) 
   
///////////////get all post by userId////////////////
document.querySelector('#showButton').addEventListener('click', async (event) =>{event.preventDefault()
    try {
        const response = await axios.get(`http://localhost:3001/posts/${localStorage.userId}`)
        for (let post of response.data.post){
            // console.log(post)
            // console.log(post.title)
            // console.log(post.content)
            let postContainer = document.querySelector('#postContainer')
            let div = document.createElement('div')
            
            let postTitle = document.createElement('h2')
            postTitle.innerText = post.title
            postTitle.setAttribute("id","postTitleId")
            div.append(postTitle)

            let postContent = document.createElement('input')
            postContent.value = post.content
            postContent.setAttribute("id","contentInTheBox")
            div.append(postContent)

            let editButton = document.createElement('button')
            editButton.innerText = 'Post Edit'
            editButton.setAttribute("id","editButtons")
            editButton.addEventListener('click', async (event)=>{
                event.preventDefault()
               
                const newinfo = document.querySelector('#contentInTheBox').value
                console.log(newinfo)
                await axios.put(`http://localhost:3001/posts/${post.id}`,{                    
                    content: newinfo
                })
            })
            div.append(editButton)

            let delButton = document.createElement('button')
            delButton.innerText = 'Post Delete'
            delButton.setAttribute("id","delButtons")
            delButton.addEventListener('click',async (event)=>{
                event.preventDefault()
                console.log(post.id)
                console.log(post)
                await axios.delete(`http://localhost:3001/users/${localStorage.userId}/delete/${post.id}`)
            })
            div.append(delButton)


            postContainer.append(div)
            
        }
        // console.log(response.data.post[0].title)
        // console.log(response)
    } catch (error) {
        console.log(error)
        
    }
})

