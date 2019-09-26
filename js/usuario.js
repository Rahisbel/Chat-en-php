$(document).ready(()=>{
    const $userDe = document.querySelector('.user-name').value;
    $('#btn-add').click(()=>{
        Swal.fire({
            title: 'Enviar Solicitud de Amistad',
            text: 'Ingrese un Usuario',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            showLoaderOnConfirm: true,
            preConfirm: (user)=>{
                $.ajax({
                    type: 'POST',
                    url: "contacto.php",
                    data: {
                        de: $userDe,
                        para: user,
                        option: "agregar"
                    },
                    success: function (response) {
                        switch (response) {
                            case 'userIgual':
                                notificacion('info','No puedes enviar solicitud a ti mismo');
                                break;
                            case 'noExiste':
                                notificacion('error','El Usuario no existe');
                                break;
                            case 'noEnviado':
                                notificacion('info','Ya enviaste una solicitud');
                                break;
                            case 'siEnviado':
                                notificacion('success','Solicitud Enviada');
                                break;
                        }
                    }
                })
            }
        })
    })

    const listarSolicitud = ()=>{
       $.ajax({
           type: 'POST',
           url: 'listar.php',
           data: {
               list:'listar'
           },
           success:function (response) {
               const data = JSON.parse(response);
                data.data.forEach((resultados)=>{
                    if(resultados.para == $userDe){
                        $('#scrollSolicitudes').html(`<li>${resultados.de} <span class="icon-add-solid add-user"></span></li>`)
                    }
                })


           }
       })
    }

    const notificacion = (tipo,titulo)=>{
        Swal.fire({
            type: tipo,
            title: titulo,
            showConfirmButton: false,
            timer: 1500
        })
    }

    listarSolicitud();

})