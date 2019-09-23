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
})