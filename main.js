///////////////////////////logout/////////////////////////

document.querySelector('#logoutButton').addEventListener('click', ()=> {
    localStorage.clear()
    document.querySelector('#loginMain').classList.remove('hidden')
    document.querySelector('#middlePage').classList.add('hidden')
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
   

//    const allPost = async (data) => {
//        let postContainer = document.querySelector('#postContainer')
//         while (postContainer)
//    }
  
   
   /////////////////show post button////////////////////////
// document.querySelector('#showButton').addEventListener('click', async (event) => {event.preventDefault
// try {
//     const postContainer = document.querySelector('#postContainer')
//     const response = await axios.get(`http://localhost:3001/posts/${localStorage.userId}`)
//     // console.log(response)
//     console.log(response.data.post)

//     let div = document.createElement('div')
//     let title = document.createElement('h1')
//     let deleteButton = document.createElement('button')
//     deleteButton.innerText('delete')
//     let editButton = document.createElement('button')
//     editButton.innerText('edit')

//     div.append(div)
//     div.append(title)
//     div.append(deleteButton)
//     div.append(editButton)
    
// } catch (error) {
    
    
// }
// })