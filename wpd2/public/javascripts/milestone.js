
document.getElementById('View').addEventListener('click', View);

function View()
{
    console.log('HERE');
    let id = document.getElementById('newCoursework').innerText;

    location.replace("http://localhost:3000/coursework/view/" + id);
}