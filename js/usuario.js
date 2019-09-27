$(document).ready(()=>{

    $.ajax({
        type: 'POST',
        url: 'listar.php',
        data: {
            list:'listar'
        }
    }).done(function (response) {
        const data = JSON.parse(response);
        data.data.forEach((resultados)=>{
            if(resultados.para == $userDe){
                $('#scrollSolicitudes').append(`<li data-user="${resultados.de}">${resultados.de} <span class="icon-add-solid add-user"></span></li>`)
            }
        })
    }).always(()=>{
        listarEventos();
    })

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

    const notificacion = (tipo,titulo)=>{
        Swal.fire({
            type: tipo,
            title: titulo,
            showConfirmButton: false,
            timer: 1500
        })
    }

    const listarEventos = ()=>{
        const $listaUsers = Array.prototype.slice.apply(document.querySelectorAll('.add-user'));
        const $user = Array.prototype.slice.apply(document.querySelectorAll('#scrollSolicitudes li'));

        $listaUsers.forEach((element)=>{
            element.addEventListener('click',(e)=>{
                let index = $listaUsers.indexOf(e.target);
                let valueUser = $user[index].dataset.user;

                Swal.fire({
                    type: 'info',
                    title: `Acpetar Solicitu de ${valueUser}`,
                    showCancelButton: true,
                    confirmButtonText: 'Enviar',
                    showLoaderOnConfirm: true,
                    preConfirm: (user)=>{
                        $.ajax({
                            type: 'POST',
                            url: "contacto.php",
                            data: {
                                de: valueUser,
                                para: $userDe,
                                option: "aceptar"
                            }
                        }).done(()=>{
                            $user[index].remove();
                            Swal.fire({
                                type: 'success',
                                title: `Agregado a tu lista de contactos.`,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }).always(()=>{

                        })
                    }
                })
            })
        })
    }
})