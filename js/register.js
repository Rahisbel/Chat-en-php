$(document).ready(()=>{

    const $name = document.getElementById('name');
    const $user = document.getElementById('user');
    const $pass = document.getElementById('pass');
    const $email = document.getElementById('email');
    const $dias = document.getElementById('dias');
    const $mes = document.getElementById('mes');
    const $age = document.getElementById('age');
    const $sex = document.getElementsByName('sex');
    const $btn_register = document.getElementById('btn-register');

    let error = '';
    const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    $btn_register.addEventListener('click',()=>{
        if($name.value = ""){

        }
        if($user.value = ""){

        }
        if($pass.value = ""){

        }
        if(!emailValidation.test($email.value)){
            console.log('Campo Valido')
        }
    })
})