$(document).ready(()=>{

    const $userDe = document.querySelector('.user-name').value;
    const $logout = document.getElementById('logout');
    const $chat = document.getElementById('txt');
    const $chatUsuario = document.getElementById('chat__user');
    const $group = document.getElementById('btn-group');

    const $containerInputs = document.getElementById('container--inputs');
    const $btnGrupo = document.getElementById('btn-group');
    const $inputGrupo = document.getElementById('txt-grupo');
    const $iconSend = document.getElementById('icon-grupo');
    const $titulo = document.getElementById('opcion-title');
    const $botonSalida = document.getElementById('opcion-grupo');
    const $addUser = document.getElementById('add-user-grupo');

    let validation = false;
    const verificarListaSolicitud = ()=>{
        $.ajax({
            type: 'POST',
            url: 'verificarLista.php',
            data: {
                id: '',
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
                id: '',
                option: 'verificarAmigos'
            }
        }).done(function (response) {
            if(response == 'siLista'){
                listarContactos();
            }
        })
    }

    const verificarListaMensajes = (id,sms)=>{
        $.ajax({
            type: 'POST',
            url: 'verificarLista.php',
            data: {
                id: id,
                option: 'verificarMensajes'
            }
        }).done((response)=>{
            if(response == 'siSMS'){
                listarMensajes(id,sms);
            }else{
                console.log("no ahi mensajes")
            }
        })
    }

    const verificarListaGrupos = ()=>{
        $.ajax({
            type: 'POST',
            url: 'grupos.php',
            data: {
                user: $userDe,
                option: 'verificarLista'
            }
        }).done((response)=>{
            if (response == "siGrupos"){
                listarGrupos();
            }
        })
    }

    const listarGrupos = ()=>{
        $.ajax({
            type: 'POST',
            url: 'grupos.php',
            data: {
                user: $userDe,
                option: 'listarGrupos'
            }
        }).done((response)=>{
            const $list = document.querySelectorAll('.container--grupos .right')

            $list.forEach((element)=>{
                element.remove();
            })
            const data = JSON.parse(response);

            data.data.forEach((element)=>{
                const templateHTML = `<li class="right name-grupo" data-grupo="${element.nombre}">
                                        <i class="icon-user-group"></i>
                                        <div class="text">
                                            <p>${element.nombre}</p>
                                        </div>
                                    </li>`
                $('#grupos').append(templateHTML);
            })
        }).always(()=>{
            selecionarGrupo();
        })
    }

    const verificarMensajesGrupos = (nameGrupo)=>{
        $.ajax({
            type: 'POST',
            url: 'grupos.php',
            data:{
                name: nameGrupo,
                option: 'verificarMensajes'
            }
        }).done((response)=>{
            if(response == 'siMensajes'){
                listarMensajesGrupos(nameGrupo);
            }
        })
    }

    const listarMensajesGrupos = (nameGrupo)=>{
        $('#listar-grupos').append(`<ul id="grupos"></ul>`);

        $.ajax({
            type: 'POST',
            url: 'grupos.php',
            data:{
                name: nameGrupo,
                option: 'listarMensajes'
            }
        }).done((response)=>{
            console.log(response)
            const data = JSON.parse(response);

            data.data.forEach((element)=>{
                const templateHTML = `<li class="right">
                                        <i class="icon-user-solid-circle"></i>
                                        <div class="text">
                                            <p>${element.mensaje}</p>
                                            <p class="usuario">Enviado por: <span>${element.usuario}</span></p>
                                        </div>
                                     </li>`
                $('#grupos').append(templateHTML);
            })
            $('#grupos').append(`<span id="final1"></span>`)
        })
    }

    const listarSolicitud = ()=>{
        $.ajax({
            type: 'POST',
            url: 'listar.php',
            data: {
                id: '',
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
                id: '',
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

    const listarMensajes = (id,sms)=>{
        $.ajax({
            type: 'POST',
            url: 'listar.php',
            data: {
                id: id,
                option: 'mensajes'
            }
        }).done((response)=>{
            const data = JSON.parse(response);

            if(validation){
                const $listMensajes = document.querySelectorAll('.container--mensajes .right');
                $listMensajes.forEach((element)=>{
                    element.remove();
                })
                const scrollElement = document.getElementById('final');
                scrollElement.remove();
            }



            data.data.forEach((element)=>{
                const templateHTML = `<li class="right">
                                        <i class="icon-user-solid-circle"></i>
                                        <div class="text">
                                            <p>${element.mensaje}</p>
                                            <p class="usuario">Enviado por: <span>${element.usuario}</span></p>
                                        </div>
                                     </li>`
                $('#mensajes').append(templateHTML);
            })
            $('#mensajes').append(`<span id="final"></span>`)

        }).always(()=>{
            validation = true;
            const scroll =  document.getElementById('final');
            scroll.scrollIntoView(true);

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
                        de: $userDe,
                        para: valueUser,
                        option: opcion
                    }
                }).done((response)=>{
                    if(response == "aceptar"){
                        acceptAndDeleteFriend($user[index],mensaje2);
                    }

                    if(response == "eliminar"){
                        acceptAndDeleteFriend($user[index],mensaje2);
                    }
                }).always(()=>{
                    listarContactos();
                })
            }
        })
    }

    const acceptAndDeleteFriend = (element,mensaje2)=>{
        element.remove();
        Swal.fire({
            type: 'success',
            title: mensaje2,
            showConfirmButton: false,
            timer: 1500
        })
    }

    const selecionarGrupo = ()=>{
        const $listaGrupos = document.querySelectorAll('.name-grupo');

        $listaGrupos.forEach((element)=>{
            element.addEventListener('click',()=>{
                $('#grupos').remove();
                $containerInputs.classList.add('chat--text');
                $btnGrupo.classList.add('btn-disabled');
                $addUser.classList.remove('icon');
                $inputGrupo.classList.remove('input-grupo');
                $inputGrupo.setAttribute('data-grupo',element.dataset.grupo);
                $iconSend.classList.remove('icon');
                $titulo.classList.add('title-grupo')
                $botonSalida.classList.remove('opcion-grupo');
                $botonSalida.classList.add('icon-arrow-thick-left');

                verificarMensajesGrupos($inputGrupo.dataset.grupo);
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
                    $chatUsuario.textContent = $stateUser[index].dataset.user;
                    $chat.setAttribute('data-id',$stateUser[index].dataset.id);
                    verificarListaMensajes($chat.dataset.id,$chat.value)
                }else{
                    console.log('no se puede')
                }
            })
        })
    }
    $botonSalida.addEventListener('click',()=>{
        $('#grupos').remove();

        $containerInputs.classList.remove('chat--text');
        $btnGrupo.classList.remove('btn-disabled');
        $inputGrupo.classList.add('input-grupo');
        $addUser.classList.add('icon');
        $inputGrupo.removeAttribute('data-grupo');
        $iconSend.classList.add('icon');
        $titulo.classList.remove('title-grupo')
        $botonSalida.classList.add('opcion-grupo');
        $botonSalida.classList.remove('icon-arrow-thick-left');

        $('#listar-grupos').append(`<ul id="grupos"></ul>`);
        listarGrupos();
    })

    $addUser.addEventListener('click',()=>{
        //alert($inputGrupo.dataset.grupo)
        Swal.fire({
            title: 'Agregar un usuario al Grupo',
            text: 'Ingrese un usuario',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            showLoaderOnConfirm: true,
            preConfirm: (name) => {
                $.ajax({
                    type: 'POST',
                    url: "grupos.php",
                    data: {
                        name: name,
                        user: $userDe,
                        grupo: $inputGrupo.dataset.grupo,
                        option: 'agregar'
                    }
                }).done((response) => {
                    console.log(response)

                    if (response == "guardado") {
                        Swal.fire({
                            type: 'success',
                            title: "Usuario Agregado",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                    if (response == "existe") {
                        Swal.fire({
                            type: 'info',
                            title: "El Usuario ya esta en el Grupo!",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                    if (response == "noGuardar"){
                        Swal.fire({
                            type: 'info',
                            title: "El Usuario no Existe o no son Amigos!",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
            }
        })
    })

    $chat.addEventListener('keypress',(e)=>{
        if(e.keyCode == 13 ) {
            $.ajax({
                type: 'POST',
                url: 'mensajes.php',
                data:{
                    id: $chat.dataset.id,
                    sms: $chat.value,
                    user: $userDe,
                    option: 'guardar'
                }
            }).done((response)=>{
                console.log(response)

            }).always(()=>{
                $chat.value = '';
                verificarListaMensajes($chat.dataset.id,'s');
            })
        }
    })

    $inputGrupo.addEventListener('keypress',(e)=>{
        if (e.keyCode == 13){
            console.log($inputGrupo.dataset.grupo)
            console.log($inputGrupo.value);
            console.log($userDe);
            $.ajax({
                type: 'POST',
                url: 'grupos.php',
                data: {
                    name: $inputGrupo.dataset.grupo,
                    user: $userDe,
                    sms: $inputGrupo.value,
                    option: 'guardarMensajes'
                }
            }).done(()=>{
                $inputGrupo.value = "";
                $('#grupos').remove();
            }).always(()=>{
                verificarMensajesGrupos($inputGrupo.dataset.grupo);
            })
        }
    })

    $group.addEventListener('click',()=>{
        Swal.fire({
            title: 'Crear un Grupo',
            text: 'Ingrese un nombre',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            showLoaderOnConfirm: true,
            preConfirm: (name)=>{
                $.ajax({
                    type: 'POST',
                    url: "grupos.php",
                    data: {
                        name: name,
                        user: $userDe,
                        option: 'crear'
                    }
                }).done((response)=>{
                    if(response == "grupoCreado"){
                        Swal.fire({
                            type: 'success',
                            title: "Grupo Creado Sastifactoriamente!",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                    if(response == "grupoRepeat"){
                        Swal.fire({
                            type: 'info',
                            title: "El Grupo ya esta creado!",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }).always(()=>{
                    setTimeout(verificarListaGrupos(),1000)
                })
            }
        })
    })

    mostrarEstado();
    verificarListaSolicitud();
    verificarListaAmigos();
    verificarListaGrupos();
    cambiarEstado();

})