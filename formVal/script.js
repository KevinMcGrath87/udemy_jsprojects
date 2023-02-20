
//form here uses the document .get by Id method to retrieve the form as an object to manipulate
const form = document.getElementById('form');
const username  = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error"
    const small = formControl.querySelector("small");
    small.innerText = message;}
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    
}
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if (input.value.trim() == "") {
            showError(input,`${getFieldName(input)} is required`);
        }
        else {
            showSuccess(input);
        }
    }
    );

}

function checkPasswordsMatch(pass, check){
    if (!(pass.value == check.value)){
        showError(pass, `${getFieldName(pass)} must match the confirm password`)
        showError(check, `${getFieldName(check)} must match the password`)
    }
    else {
        showSuccess(pass);
        showSuccess(check);
    }
}

function checkLength(input, min, max){
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at lease ${min} characters long`);
    }
    else if (input.value.length > max){
        showError(input, `${getFieldName(input)} must be no more than ${max} characters long`);
    }
    else {
        showSuccess(input);
    }
}

function checkEmail(input){
    if(validEmail(input)){
        showSuccess(input);
    }
    else{
        showError(input, `${getFieldName(input)} must be a valid email`);
    }
}
// function for checking valid emails
function validEmail(email){
    const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email.value).toLowerCase());
}
form.addEventListener('submit', function(e) {

    //e is the "event" parameter 
    // i think prevent default prevents the default request method
    e.preventDefault(); 
    // the elements we queried are js objects with methods i.e. value
    checkRequired([username,password,email,confirmPassword]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, confirmPassword);

})