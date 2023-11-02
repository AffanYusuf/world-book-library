async function signup() {
    document.querySelector('#signup-alert').style.display = 'none';
    console.log('sign-up');
    const getUsers = localStorage.getItem('user-data');
    const users = JSON.parse(getUsers) || [];
    console.log('users',users);

    const userLength = users.length;
    const lastUser = userLength ? users[userLength-1] : null;
    const newUserId = lastUser ? parseInt(lastUser?.id)+1 : 1;
    const name = document.getElementById("sign-up-name").value;
    const email = document.getElementById("sign-up-email").value;
    const password = document.getElementById("sign-up-password").value;

    if (userLength) {
        const result = users.find(user => user.email === email);
        if (result) {
            document.querySelector('#signup-alert').style.display = 'block';
            return;
        }   
    }

    const newUser = {
        id: newUserId,
        name,
        email,
        password,
        role: 'member',
    }
    users.push(newUser);
    localStorage.removeItem('user-data');
    localStorage.setItem('user-data', JSON.stringify(users));
    alert('Successfully sign up!');
    window.location.href = 'sign-in.html';
   ;
}