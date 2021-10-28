const formDOM = document.querySelector('.form')
const usernameInputDOM = document.querySelector('.username-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')


formDOM.addEventListener('submit',async (e) =>{
   
  e.preventDefault();
  
  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;
 
  try{
    const { data } = await axios.post('/api/v1/register',{username,password});

    formAlertDOM.style.display ='block';
    formAlertDOM.textContent = data.msg;
    formAlertDOM.classList.add('text-success');
    usernameInputDOM.value='';
    passwordInputDOM.value='';

  }catch(error){
     
      formAlertDOM.style.display= 'block';
      formAlertDOM.textContent=error.response.data.msg;
     
  }
  setTimeout(()=>{
    formAlertDOM.style.display='none';
  },3000)
  
})


