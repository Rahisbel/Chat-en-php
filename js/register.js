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
    const $registro = document.getElementById('registro');

    const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const validationRegister = ()=>{
        let error = '';
        let contRadio = 0;
        let value_sex = "";

        if($name.value == ""){
            error += '<li>Ingrese un Nombre</li>';
        }
        if($user.value == ""){
            error += '<li>Ingrese un Usuario</li>';
        }
        if($pass.value == ""){
            error += '<li>Ingrese una Contrasena</li>';
        }
        if(!emailValidation.test($email.value)){
            error += '<li>Ingrese un Corrreo Valido</li>';
        }
        if($dias.value.toLowerCase() == 'dias' || $mes.value.toLowerCase() == 'mes' || $age.value.toLowerCase() == 'age'){
            error += '<li>Ingrese una Fecha Valida</li>'
        }
        $sex.forEach(element => {
            if(element.checked){
                value_sex = element.value;
            }else{
                contRadio++;
            }
        });

        if(contRadio == 2){
            error += '<li>Seleciona el sexo</li>';
        }

        if(error == ''){
            $.ajax({
                type: 'POST',
                url: "register.php",
                data: {
                    name: $name.value,
                    username: $user.value,
                    password: $pass.value,
                    email: $email.value,
                    date: $dias.value +" " +$mes.value+ " " +$age.value,
                    sex: value_sex
                },
                success: function(response){
                    if(response == "newUser"){
                        Swal.fire({
                            type: 'success',
                            title: 'Cuenta Registrada!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        $name.value = "";
                        $user.value = "";
                        $pass.value = "";
                        $email.value = "";
                        $dias.value = "Dias";
                        $mes.value = "Mes";
                        $age.value = "Age";
                    }else if(response == "emailRepeat"){
                        Swal.fire({
                            type: 'info',
                            title: 'El correo Electronico Existe',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else if(response == 'userRepeat'){
                        Swal.fire({
                            type: 'info',
                            title: 'El Usuario Existe',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            })
        }else{
            Swal.fire({
                type: 'error',
                title: 'Datos Faltantes',
                html: `<ul style="list-style: none;">${error}</ul>`,
            })
        }
    }

    $btn_register.addEventListener('click',(e)=>{
        e.preventDefault();
        validationRegister();
    })

    $registro.addEventListener('submit',(e)=>{
        e.preventDefault();
        validationRegister();
    })

})