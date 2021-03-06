function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateEmail(email) {
    const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    return emailRegex.test(String(email).toLowerCase());
}


function formIsValid(fname, lname, email, password, cpassword) {
    let badColor = 'red',
        isValid = false,
        message = {};
    message.lname_message = document.getElementById('lname_message');
    message.fname_message = document.getElementById('fname_message');
    message.password_message = document.querySelector("#password_message");
    message.email_message = document.querySelector("#email_message");
    message.cpassword_message = document.querySelector("#cpassword_message");


    if (fname.value.length < 3) {
        message.fname_message.innerText = 'First Name is Too short';
        message.fname_message.style.color = badColor;
        isValid = false
    } else if (lname.value.length < 3) {
        message.lname_message.innerText = 'Last Name is Too short';
        message.lname_message.style.color = badColor;
        isValid = false
    } else if (!validateEmail(email.value)) {
        message.email_message.innerText = 'Email is not valid';
        message.email_message.style.color = badColor;
        isValid = false
    } else if (!validatePassword(password.value)) {
        message.password_message.innerText = 'Password is not valid: Password must contain at least one small case character, one uppercase character, one special character and one numeric character and must be at least 8 character long';
        message.password_message.style.color = badColor;
        isValid = false
    } else if (cpassword.value !== password.value) {
        message.cpassword_message.innerText = 'Passwords do not match.';
        message.cpassword_message.style.color = badColor;
        isValid = false

    } else {
        isValid = true
        message.fname_message.innerText = ''
        message.lname_message.innerText = ''
        message.email_message.innerText = ''
        message.password_message.innerText = ''
        message.cpassword_message.innerText = ''
    }

    return isValid;
}


function loadData() {
    let users_table = document.querySelector('#users_table');
    users_table.innerHTML = '';

    let users = localStorage.getItem('users');
    if (users) {
        let savedUsers = JSON.parse(users);
        if (savedUsers.length > 0) {
            for (let i = 0; i < savedUsers.length; i++) {
                let savedUser = savedUsers[i];
                users_table.innerHTML += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${savedUser.fname}</td>
                        <td>${savedUser.lname}</td>
                        <td>${savedUser.email}</td>
                        <td><button type="button" class="btn btn-link">Edit</button></td>
                    </tr>
                `
            }
        }
    }
}

function saveUser() {
    let fname = document.querySelector("#fname"),
        lname = document.querySelector("#lname"),
        email = document.querySelector("#email"),
        password = document.querySelector("#password"),
        cpassword = document.querySelector("#cpassword");

    if (!formIsValid(fname, lname, email, password, cpassword)) {
        alert('form is not valid');
    } else {

        let users = [];
        let savedUser = localStorage.getItem("users");
        if (savedUser) {
            users = JSON.parse(savedUser);
        }

        let user = {
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            password: password.value
        };

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));

        alert('User was save successfully');
        loadData();
        fname.value = '';
        lname.value = '';
        email.value = '';
        password.value = '';
        cpassword.value = '';
    }


}




loadData();



