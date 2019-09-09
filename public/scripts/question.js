var selected = 'none'
function selectOption(x){
    let optionBoxes = document.getElementsByClassName('option-box')
    for(let i = 0; i < optionBoxes.length; i++)
        optionBoxes[i].classList.remove('selected');
    document.getElementById(x).classList.add('selected');
    selected = x;
}