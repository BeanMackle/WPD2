
document.getElementById('share').addEventListener('click', share);
document.getElementById('private').addEventListener('click', makePrivate);


function share() {

        let id = document.getElementById("shareid").innerText;
    $.ajax({
        url: "/coursework/share/" + id,
        method: 'POST',
    }).done(function(success) {

        console.log(success);
        if(success === 'true') {


            let url = window.location.href;

            document.getElementById('share').style.display = 'none';
            document.getElementById('private').style.display = 'block';


            document.getElementById('link').innerText = url;
        }
        else
            {
                document.getElementById('link').innerText = "Something Has Gone Wrong!"
            }

    });
}
function makePrivate() {
                console.log('IN');
        let id = document.getElementById("privateid").innerText;
    $.ajax({
        url: "/coursework/deshare/" + id,
        method: 'POST',
    }).done(function(success) {

        console.log(success);
        if(success === 'true') {


                document.getElementById('share').style.display = 'block';
                document.getElementById('private').style.display = 'none';

            document.getElementById('link').innerText = "CourseWork Successfully made Private"
        }
        else
            {
                document.getElementById('link').innerText = "Something Has Gone Wrong!"
            }

    });
}
