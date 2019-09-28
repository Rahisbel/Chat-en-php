$(document).ready(()=>{

    const $userDe = document.querySelector('.user-name').value;
    const $logout = document.getElementById('logout');

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
                    $('#scrollAmigos').append(`<li class="list"><span><span class="state-connected"></span> ${resultados.de}</span> <span class="icon-trash trash-user"></span></li>`)
                }else if(resultados.de == $userDe){
                    $('#scrollAmigos').append(`<li class="list"><span><span class="state-connected"></span> ${resultados.para}</span> <span class="icon-trash trash-user"></span></li>`)
                }
            })
        }).always(()=>{
            //listarEventos();
        })
    }

    $logout.addEventListener('click',()=>{
        document.location = "cerrar.php";
    })

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

    const cambiarEstado = ()=>{
        const $listaEstado = document.querySelectorAll('.state');

        $listaEstado.forEach((element)=>{
            element.addEventListener('click',()=>{
                console.log(element.dataset.state)
                $.ajax({
                    type: 'POST',
                    url: 'cambiarEstado.php',
                    data: {
                        user: $userDe,
                        state: element.dataset.state
                    }
                }).done(()=>{
                    mostrarEstado();
                })
            })
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
                            listarContactos();
                        })
                    }
                })
            })
        })
    }

    mostrarEstado();
    verificarListaSolicitud();
    verificarListaAmigos();
    cambiarEstado();
})