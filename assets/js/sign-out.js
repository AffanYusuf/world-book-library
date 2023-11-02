function signout() {
    if (confirm('Are you sure want to sign out?')) {
        sessionStorage.clear();
        alert('Successfully sign out!');
        window.location.href = 'index.html';
    };

}