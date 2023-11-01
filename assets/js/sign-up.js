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

async function signup() {
    console.log('sign-up');
    const userJson = await getUsers();
    console.log('userJson',userJson);

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
    console.log('new userJson',userJson);


    // Write the modified data back to the JSON file
    fetch('./data/users.json', {
        method: 'PUT',
        body: JSON.stringify(userJson),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => console.log('success sign-up'))
    .catch(error => console.error('Error writing to data.json:', error));
}