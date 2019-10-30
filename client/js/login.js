const loginSubmitButton = document.getElementById('login-submit-button');


loginSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    if (name === "") {
        alert("Name can't be empty");
    } else if (password === "") {
        alert("Password can't be empty");
    } else {
        fetch(`http://localhost:4000/login?name=${name}&password=${password}`)
            .then(res => res.json())
            .then(res => {
                if (res.length == 0) {
                    alert("user does't exist , Please register")
                } else if (res[0].password === password) {
                    alert('login successful')
                    localStorage.setItem("name", name)
                    window.location.href = "dashboard.html";
                    //create a new page which will redirect the logged in user to the dashboard
                    //maintain the login state as true when logged in as a particular user
                } else {
                    alert('Password did not match')
                }
            })
            .catch(err => { console.error(err) })
    }


})