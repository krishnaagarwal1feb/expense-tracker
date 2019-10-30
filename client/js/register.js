const registerSubmitButton = document.getElementById('register-submit-button');


registerSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('email').value;

    if (name === "") {
        alert("Name can't be empty");
    } else if (password === "") {
        alert("Password can't be empty");
    } else if (password !== confirmPassword) {
        alert("Passwords do not match");
    } else {
        fetch(`http://localhost:4000/register?name=${name}&password=${password}&email=${email}`)
            .then(res => res.json())
            .then(res => {
                if (res.affectedRows === 1) {
                    alert('User added successfully!!')
                    window.location.href = "index.html";
                } else if (res.code === "ER_DUP_ENTRY") {
                    alert('User already exists');
                } else {
                    console.log(res);
                    alert('Something went wrong')
                }
            })
            .catch(err => { console.error(err) })
    }


})