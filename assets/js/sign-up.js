async function  getUsers() { 
    try {
        const response = await fetch('./data/users.json') // Replace 'data.json' with the path to your JSON file
            ;
        const data = await response.json();
        // Data is the parsed JSON object
        console.log('data', data);
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}

// Function untuk mencari berdasarkan email dan password
function searchByEmailAndPassword(email, password, jsonData) {
    // Membuat indeks berdasarkan email
    var emailIndex = {};
    jsonData.data.forEach(function(user) {
        emailIndex[user.email] = user;
    });

    var user = emailIndex[email];
    if (user && user.password === password) {
        return user;
    }
    return null;
}

async function signin() { 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log('email', email);
    console.log('password', password);
    const users = await getUsers();
    console.log('users', users);

    var result = searchByEmailAndPassword(email, password, users);

    if (result) {
        sessionStorage.setItem("user-name", result.name);
        window.location.href = 'index.html';
    } else {
        document.querySelector('#signin-alert').style.display = 'block';
    }
}

async function signup() {
    const userJson = await getUsers();

    // Modify the JSON data
    const userLength = userJson.data.length;
    const lastUser = userJson.data[userLength-1];
    const newUserId = parseInt(lastUser.id)+1;
    const name = document.getElementById("sign-up-name").value;
    const email = document.getElementById("sign-up-email").value;
    const password = document.getElementById("sign-up-password").value;
    const newUser = {
        id: newUserId,
        name,
        email,
        password,
        role: 'member',
    }
    userJson.data.push(newUser);

    // Write the modified data back to the JSON file
    fetch('./data/users.json', {
        method: 'PUT',
        body: JSON.stringify(userJson),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        return window.location.href = 'sign-in.html';
    })
    .catch(error => console.error('Error writing to data.json:', error));
}