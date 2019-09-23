$(document).ready(()=>{
    const $list = Array.prototype.slice.apply(document.querySelectorAll('.form__list'));
    const $forms = Array.prototype.slice.apply(document.querySelectorAll('.form__user'));

    document.getElementById('list').addEventListener('click',e =>{
        if(e.target.classList.contains('form__list')){
            const value = $list.indexOf(e.target);
            $list.map(list => list.classList.remove('active'));
            $list[value].classList.add('active');
            $forms.map(forms => forms.classList.remove('active'));
            $forms[value].classList.add('active');
        }
    })

    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Obctubre','Noviembre','Diciembre',]
    
    const $dias = document.getElementById('dias');
    for (let index = 1; index < 32; index++) {
        const $option = document.createElement('option');
        $option.setAttribute('value',`${index}`);
        $option.innerHTML = index;
        $dias.appendChild($option);
    }

    const $meses = document.getElementById('mes');
    meses.forEach(element => {
        const $option = document.createElement('option');
        $option.setAttribute('value',element);
        $option.innerHTML = element;
        $meses.appendChild($option);
    });
    const $ages = document.getElementById('age');
    for (let index = 0; index < 100; index++) {
        const $option = document.createElement('option');
        $option.setAttribute('value',2019-index);
        $option.innerHTML = 2019 - index;
        $ages.appendChild($option);
    }
});
