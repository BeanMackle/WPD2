document.getElementById('share').addEventListener('click', share);

function share() {


    let url = window.location.href;

    document.getElementById('link').innerText = url;

}