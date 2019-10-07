$(document).ready(()=>{
    let dataAmigos;
    let data;
    let newData;
    let band = false;
    let bandSMS = false;
    const $opciones = document.querySelectorAll('.opcion');

    const $fullName = document.getElementById('full-name');
    const $nameUser = document.getElementById('name-user');
    const $email = document.getElementById('email');
    const $date = document.getElementById('date');
    const $contact = document.getElementById('contact');

    const listarUsuarios = (option,ordenar)=>{
        $.ajax({
            type: 'POST',
            url: 'listarUsers.php',
            data:{
                option: option
            }
        }).done((response)=>{
            if(response != 'Error'){
                data = JSON.parse(response);
                data = data.data;
                if(band){
                    const $deleteList = document.querySelectorAll('.user');
                    $deleteList.forEach((element)=>{
                        element.remove();
                    })
                }
                if (ordenar == 'alf'){
                    newData = data.sort((a,b)=>{
                        const x = a['usuario'];
                        const y = b['usuario'];

                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    })

                    data = newData;
                }

                data.forEach((element,index)=>{
                    if(element.administrador != 1){
                        $('#list-user').append(`<li class="user" data-posicion="${index}">${element.usuario}<i class="icon-trash trash-user" data-user="${element.usuario}" data-id="${element.id}"></i></li>`)
                    }
                })

                band = true;
            }
        }).always((response)=>{
            if(response != 'Error'){
                eventosLista();
                deleteUserInfo();
            }
        })
    }

    const contarMensajes = (arrayId)=>{
        let id = 0;
        let tam = 0;

        arrayId.forEach((element)=>{
            let cont = [];
            $.ajax({
                type: 'POST',
                url: 'contactoFavorito.php',
                data: {
                    identifiacion: element,
                    option: 'mensajes'
                }
            }).done((response)=>{
                if(response != 'error'){
                    const data = JSON.parse(response);
                    const sms = new Mensaje(data.data[0],data.data.length)
                    cont.push(sms);
                }
            }).always(()=>{
                cont.forEach((element)=>{
                    if(element.tam > tam){
                        tam = element.tam;
                        id = element.id.id_amigo;
                    }
                })

                dataAmigos.forEach((element)=>{
                    if(element.id == id){
                        if($nameUser.textContent != element.de){
                            $contact.textContent = element.de;
                        }else if($nameUser.textContent != element.para){
                            $contact.textContent = element.para;
                        }
                    }
                })
            })
        })

    }

    function Mensaje(id,tam){
        this.id = id;
        this.tam = tam;
    }

    const contactoFavorito = (id)=>{
        $.ajax({
            type: 'POST',
            url: 'contactoFavorito.php',
            data: {
                identifiacion: id,
                option: 'amigos'
            }
        }).done((response)=>{
            if(response != 'error'){
                const d = JSON.parse(response);
                const arrayId = [];
                d.data.forEach((element)=>{
                    if(element.de == $nameUser.textContent || element.para == $nameUser.textContent){
                        arrayId.push(element.id);
                    }
                })
                dataAmigos = d.data
                contarMensajes(arrayId);
            }else{
                $contact.textContent = 'No ahi Contacto Favorito';
            }
        })
    }

    const listarTodosMensajes = (id)=>{
        $.ajax({
            type: 'POST',
            url: 'contactoFavorito.php',
            data: {
                identifiacion: id,
                option: 'listarMensajes'
            }
        }).done((response)=>{
            if(response != 'error'){
                const d = JSON.parse(response);
                if(bandSMS){
                    const $deleteList = document.querySelectorAll('.sms');
                    $deleteList.forEach((element)=>{
                        element.remove();
                    })
                }

                d.data.forEach((element)=>{
                    $('#mensajesList').append(`<li class="sms">${element.mensaje}<i class="icon-trash trash-sms" data-id="${element.id}"></i></li>`);
                })
                bandSMS = true;
            }else{
                if(bandSMS){
                    const $deleteList = document.querySelectorAll('.sms');
                    $deleteList.forEach((element)=>{
                        element.remove();
                    })
                }
            }
        }).always(()=>{
            const $listDelete = document.querySelectorAll('.trash-sms');

            $listDelete.forEach(($element,index)=>{
                $element.addEventListener('click',()=>{
                    deleteMensajes($element.dataset.id,index);
                })
            })
        })
    }

    const deleteMensajes = (id,index)=>{
        Swal.fire({
            title: 'Deseas eliminar el mensaje?',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            showLoaderOnConfirm: true,
            preConfirm: ()=>{
                $.ajax({
                    type: 'POST',
                    url: 'contactoFavorito.php',
                    data: {
                        identifiacion: id,
                        option: 'borrarMensajes'
                    }
                }).always((response)=>{
                    const $deleteList = document.querySelectorAll('.sms');
                    if(response == 'eliminar'){
                        $deleteList[index].remove();
                       console.log($deleteList[index]);
                       console.log($deleteList);
                       console.log(index);
                    }
                })
            }
        })

    }

    const deleteUserInfo = ()=>{
        const $listUser = document.querySelectorAll('.trash-user');

        $listUser.forEach(($element,index)=>{
            $element.addEventListener('click',()=>{
                Swal.fire({
                    title: 'Deseas eliminar toda inforamcion del usuario?',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    showLoaderOnConfirm: true,
                    preConfirm: ()=>{
                        $.ajax({
                            type: 'POST',
                            url: 'contactoFavorito.php',
                            data: {
                                identifiacion: $element.dataset.id,
                                user: $element.dataset.user,
                                option: 'borrarUsuario'
                            }
                        }).always((response)=>{
                            const $deleteUser = document.querySelectorAll('.user');
                            if(response == 'eliminar'){
                                $deleteUser[index].remove();
                            }
                        })
                    }
                })
            })
        })
    }

    const eventosLista = ()=>{
        const $listUsers = document.querySelectorAll('.user');

        $listUsers.forEach((element)=>{
            element.addEventListener('click',()=>{
                const userInfo = data[element.dataset.posicion];
                $fullName.textContent = userInfo.nombre;
                $nameUser.textContent = userInfo.usuario;
                $email.textContent = userInfo.correo;
                $date.textContent = userInfo.fecha;
                listarTodosMensajes(userInfo.usuario)
                contactoFavorito(userInfo.usuario);
            })
        })
    }

    $opciones.forEach(($element)=>{
        $element.addEventListener('click',()=>{
            if($element.dataset.option == 'all' || $element.dataset.option == 'alf'){
                listarUsuarios('listar',$element.dataset.option);
            }else{
                listarUsuarios($element.dataset.option,$element.dataset.option);
            }

        })
    })

})