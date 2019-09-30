$(document).ready(()=>{

    const $userDe = document.querySelector('.user-name').value;
    const $logout = document.getElementById('logout');
    const $chat = document.getElementById('txt');
    const $chatUsuario = document.getElementById('chat__user');

    const verificarListaSolicitud = ()=>{
        $.ajax({
            type: 'POST',
            url: 'verificarLista.php',
            data: {
                option: 'verificarSolicitud'
            }
        }).done(function (response) {
            if(response == 'siLista'){
                listarSolicitud();
            }
        })
    }

    const verificarListaAmigos = ()=>{
        $.ajax({
            type: 'POST',
            url: 'verificarLista.php',
            data: {
                option: 'verificarAmigos'
            }
        }).done(function (response) {
            if(response == 'siLista'){
                listarContactos();
            }
        })
    }

    const verificarListaMensajes = ()=>{
        $.ajax({
            type: 'POST',
            url: '',
            data: {
                option: 'verificarMensaje'
            }
        }).done((response)=>{
            if(response == 'siSMS'){

            }
        })
    }

    const listarSolicitud = ()=>{
        $.ajax({
            type: 'POST',
            url: 'listar.php',
            data: {
                option: 'solicitud'
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
    }

    const listarContactos = ()=>{
        $.ajax({
            type: 'POST',
            url: 'listar.php',
            data: {
                option: 'amigos'
            }
        }).done(function (response) {
            const $listContactos = document.querySelectorAll('.list');
            $listContactos.forEach((element)=>{
                element.remove();
            })

            const data = JSON.parse(response);

            data.data.forEach((resultados)=>{
                if(resultados.para == $userDe){
                    $('#scrollAmigos').append(`<li class="list"><span class="list-user"><span class="state-users" data-id="${resultados.id}" data-user="${resultados.de}"></span> ${resultados.de}</span> <span class="icon-trash trash-user"></span></li>`)
                }else if(resultados.de == $userDe){
                    $('#scrollAmigos').append(`<li class="list"><span class="list-user"><span class="state-users" data-id="${resultados.id}" data-user="${resultados.para}"></span> ${resultados.para}</span> <span class="icon-trash trash-user"></span></li>`)
                }
            })
        }).always(()=>{
            verEstado();
            deleteUser();
            chatUser();
        })
    }

    const listarMensajes = ()=>{
        $.ajax({
            type: 'POST',
        })
    }

    const verEstado = ()=>{
        $.ajax({
            type: 'POST',
            url: 'listarUsers.php',
            data: {
                option: 'listar'
            }
        }).done((response)=>{
            const data = JSON.parse(response)
            const $listadoContactos = document.querySelectorAll('.state-users');

            $listadoContactos.forEach((element)=>{
                data.data.forEach((resultados)=>{
                    if(element.dataset.user == resultados.usuario){
                        element.classList.add('user-'+resultados.estado);
                        element.setAttribute('data-state',resultados.estado);
                    }
                })
            })
        })
    }

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

    const mostrarEstado = ()=>{
        $.ajax({
            type: 'POST',
            url: 'estado.php',
            data: {
                user: $userDe,
            }
        }).done((response)=>{
            const $mostrarEstado = document.getElementById('user__state');
            const data = JSON.parse(response);

            switch (data.data[0].estado) {
                case '1':
                    $mostrarEstado.textContent = 'Conectado';
                    break;
                case '2':
                    $mostrarEstado.textContent = 'Ausente';
                    break;
                case '3':
                    $mostrarEstado.textContent = 'Ocupado';
                    break;
                case '0':
                    $mostrarEstado.textContent = 'Desconectado';
                    break;
            }
        })
    }

    const opcionesEstado = (estado,opcion)=>{
        $.ajax({
            type: 'POST',
            url: 'cambiarEstado.php',
            data: {
                user: $userDe,
                state: estado,
                option: opcion
            }
        }).done(()=>{
            mostrarEstado();
        }).always((response)=>{
            if(response == "cerrar") document.location = "cerrar.php";
        })
    }

    const cambiarEstado = ()=>{
        const $listaEstado = document.querySelectorAll('.state');

        $listaEstado.forEach((element)=>{
            element.addEventListener('click',()=>{
                opcionesEstado(element.dataset.state,"cambiar");
            })
        })
    }

    $logout.addEventListener('click',()=>{
        opcionesEstado(0,"logout");
    })

    const confirmacion = (valueUser,$user,index,opcion,mensaje,mensaje2)=>{
        Swal.fire({
            type: 'info',
            title: mensaje + valueUser,
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            showLoaderOnConfirm: true,
            preConfirm: ()=>{
                $.ajax({
                    type: 'POST',
                    url: "contacto.php",
                    data: {
                        de: valueUser,
                        para: $userDe,
                        option: opcion
                    }
                }).done(()=>{
                    $user[index].remove();
                    Swal.fire({
                        type: 'success',
                        title: mensaje2,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }).always(()=>{
                    listarContactos();
                })
            }
        })
    }

    const listarEventos = ()=>{
        const $listaUsers = Array.prototype.slice.apply(document.querySelectorAll('.add-user'));
        const $user = Array.prototype.slice.apply(document.querySelectorAll('#scrollSolicitudes li'));

        $listaUsers.forEach((element)=>{
            element.addEventListener('click',(e)=>{
                let index = $listaUsers.indexOf(e.target);
                let valueUser = $user[index].dataset.user;

                confirmacion(valueUser,$user,index,"aceptar","Aceptar Solicitud de ","Agregado a tu lista de amigos");

            })
        })
    }

    const deleteUser = ()=>{

        const $trashIcon = Array.prototype.slice.apply(document.querySelectorAll('.trash-user'));
        const $user = Array.prototype.slice.apply(document.querySelectorAll('.state-users'));

        $trashIcon.forEach((element)=>{
            element.addEventListener('click',(e)=>{
                let index = $trashIcon.indexOf(e.target);
                let valueUser = $user[index].dataset.user;

                confirmacion(valueUser,$user,index,"eliminar","Eliminar de contactos a ","Eliminado de la la lista de amigos");

            })
        })
    }

    const chatUser = ()=>{
        const $chatUser = Array.prototype.slice.apply(document.querySelectorAll('.list-user'));
        const $stateUser = Array.prototype.slice.apply(document.querySelectorAll('.state-users'));

        $chatUser.forEach((element)=>{
            element.addEventListener('click',(e)=>{
                let index = $chatUser.indexOf(e.target);

                if($stateUser[index].dataset.state != 0){
                    console.log($stateUser[index].dataset.user)
                    $chatUsuario.textContent = $stateUser[index].dataset.user;
                    $chat.setAttribute('data-id',$stateUser[index].dataset.id);
                }else{
                    console.log('no se puede')
                }
            })
        })
    }

    $chat.addEventListener('keypress',(e)=>{
        if(e.keyCode == 13 ) {
            console.log(e.keyCode)
            console.log($chat.value)
        }
    })

    mostrarEstado();
    verificarListaSolicitud();
    verificarListaAmigos();
    cambiarEstado();
})