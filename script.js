const buttons = document.querySelectorAll('button');

let check = true;

buttons.forEach(function(button) {
    button.addEventListener('click', () => {
        if(check) {
            button.textContent = 'X';
            check = false;
            button.disabled = true;
            button.style.color = 'darkgreen';
        } else if(check === false){
            button.textContent = 'O';
            button.disabled = true;
            button.style.color = 'darkred';
            check = true;
        }
    });
});