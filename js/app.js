/**
 * Cuando el documento este list, carga el Codigo
 */
$(document).ready(()=>{
    /**
     * Captura la lista de items de la lista ul y del formulario de Inision de Sesion y Registro
     */
    const $list = Array.prototype.slice.apply(document.querySelectorAll('.form__list'));
    const $forms = Array.prototype.slice.apply(document.querySelectorAll('.form__user'));

    /**
     * Cambio de Estilos de active para la lista y formulario
     */
    document.getElementById('list').addEventListener('click',e =>{
        if(e.target.classList.contains('form__list')){
            const value = $list.indexOf(e.target);
            $list.map(list => list.classList.remove('active'));
            $list[value].classList.add('active');
            $forms.map(forms => forms.classList.remove('active'));
            $forms[value].classList.add('active');
        }
    })

    /**
     * Lista de Meses para la etiqueta <select>
     */
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Obctubre','Noviembre','Diciembre',]
    
    /**
     * Genera la lista de Dias 
     */
    const $dias = document.getElementById('dias');
    for (let index = 1; index < 32; index++) {
        const $option = document.createElement('option');
        $option.setAttribute('value',`${index}`);
        $option.innerHTML = index;
        $dias.appendChild($option);
    }

    /**
     * Genera la Lista de Meses
     */
    const $meses = document.getElementById('mes');
    meses.forEach(element => {
        const $option = document.createElement('option');
        $option.setAttribute('value',element);
        $option.innerHTML = element;
        $meses.appendChild($option);
    });

    /**
     * Genera la Lista de age
     */
    const $ages = document.getElementById('age');
    for (let index = 0; index < 100; index++) {
        const $option = document.createElement('option');
        $option.setAttribute('value',2019-index);
        $option.innerHTML = 2019 - index;
        $ages.appendChild($option);
    }
});
