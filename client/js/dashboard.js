const list = document.getElementById('items-list');
const username = localStorage.getItem('name');
const addItemButton = document.getElementById('add-item-button');
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("name");
    localStorage.clear();
    window.location.href = "index.html";
})

addItemButton.addEventListener('click', () => {
    window.location.href = "additem.html";
})

const createNode = (divName, value) => {
    var textnode = document.createTextNode(value);
    divName.appendChild(textnode);
}

const fillListItems = (name, category, amount) => {
    var node = document.createElement("li");
    node.className = "collection-item";
    var itemNameDiv = document.createElement('div');
    itemNameDiv.className = "listitem-itemname";
    var categoryNameDiv = document.createElement('div');
    categoryNameDiv.className = "listitem-category";
    var amountDiv = document.createElement('div');
    amountDiv.className = "listitem-amount";
    createNode(itemNameDiv, name);
    createNode(categoryNameDiv, category);
    createNode(amountDiv, amount);
    node.appendChild(itemNameDiv);
    node.appendChild(categoryNameDiv);
    node.appendChild(amountDiv);
    list.appendChild(node);
}

const fetchItems = () => {
    var total = 0;
    fetch(`http://localhost:4000/items?username=${username}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            res.forEach(({ itemname, amount, category }) => {
                total += amount;
                fillListItems(itemname, category, amount);
            });
            document.getElementById('total-expense').innerHTML = total;
        })
        .catch(err => {
            console.error(err);
        })
}

window.onload = () => {
    document.getElementById("user-name").innerHTML = username;
    fetchItems();
}