// <a class="navbar-brand" href="#" id="linkLogout">Sair do JIL</a>
const linkLogout = document.getElementById('linkLogout');

linkLogout.addEventListener('click', function () {
    localStorage.removeItem('jiltoken');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedUserId');
    window.location.href = "index.html";
});