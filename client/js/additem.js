const addItemSubmitButton = document.getElementById('additem-submit-button');
const username = localStorage.getItem("name");
//add event listener , take all values which have been used 
// do validation of values if needed
//send req using fetch
// on index.js add insert function and alert item added successfully and then 
//redircet to dashboard 
//create logout button on dashboard 
//on logout button -- clear local storage with .clear no need to go to the server for this task


addItemSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const itemname = document.getElementById('itemname').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;

    if (itemname === "") {
        alert("Item name can't be empty");
    } else if (category === "") {
        alert("category can't be empty");
    } else if (amount === "") {
        alert("Amount can't be empty");
    } else if (isNaN(amount)) {
        alert("amount should be integer")
    } else {
        fetch(`http://localhost:4000/additem?username=${username}&itemname=${itemname}&category=${category}&amount=${amount}`)
            .then(res => res.json())
            .then(res => {
                if (res.affectedRows === 1) {
                    alert('Item added successfully!!')
                    window.location.href = "dashboard.html";
                } else {
                    console.log(res);
                    alert('Something went wrong')
                }
            })
            .catch(err => { console.error(err) })
    }


})