var selected = 'none'
var answer = document.getElementById('answer').value;
var submitted = false;
function selectOption(x){
    if(!submitted){
    let optionBoxes = document.getElementsByClassName('option-box')
    for(let i = 0; i < optionBoxes.length; i++)
        optionBoxes[i].classList.remove('selected');
    document.getElementById(x).classList.add('selected');
    selected = x;
    document.getElementById('selected-option').value = selected;
    }
}

function submit(){
    if(selected == answer){
        let selectedAns = document.getElementsByClassName('selected')[0]
        selectedAns.classList.remove('selected')
        selectedAns.classList.add('correct');
        document.getElementById('correct').classList.remove('hidden2')

    }
    else{
        let selectedAns = document.getElementsByClassName('selected')[0]
        selectedAns.classList.remove('selected')
        selectedAns.classList.add('incorrect');

        document.getElementById(answer).classList.add('correct');
        document.getElementById('incorrect').classList.remove('hidden2')

    }

    document.getElementById('reject').classList.remove('hidden2');
    document.getElementById('accept').classList.add('hidden2');

    submitted = true;
}


function confirm(){
    if(!submitted){
        window.onbeforeunload = function() {
            return 'Are you sure you want to leave this page?';
        };
    }
}