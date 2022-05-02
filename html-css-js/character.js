const urlParams = new URLSearchParams(window.location.search);
const character_id = urlParams.get('id');

function getcharacter(id) {

    $.ajax({
        url: "character.php",
        type: "GET",
        data: {
            choice: "character",
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                let only = '';

                res.characters.forEach(character => {
                    only += "<div class='centre'>" +
                        "<img src='" + "../assets/logos/" + character.logo + "'>" +
                        "</div>" +
                        "<div class='row'>" +
                        "<div class='centre'>" +
                        "<img src='" + "../assets/characters/" + character.Image + "'>" +
                        "</div>" +
                        "<p>" + character.description + "</p>" +
                        "<div>" +
                        "<table>" +
                        "<tr>" +
                        "<th>" + "Nom" + "</th>" +
                        "<th>" + "prenom" + "</th>" +
                        "<th>" + "Surnom" + "</th>" +
                        "</tr>" +
                        "<tr>" +
                        "<td>" + character.last_name + "</td>" +
                        "<td>" + character.first_name + "</td>" +
                        "<td>" + character.nickname + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "<th>" + "Date d'anniversaire" + "</th>" +
                        "<th>" + "âge" + "</th>" +
                        "<th>" + "taille" + "</th>" +
                        "</tr>" +
                        "<tr>" +
                        "<td>" + character.date_birth + "</td>" +
                        "<td>" + character.age + "</td>" +
                        "<td>" + character.height + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "<th>" + "Race" + "</th>" +
                        "<th>" + "Manga" + "</th>" +
                        "<th>" + "voix" + "</th>" +
                        "</tr>" +
                        "<tr>" +
                        "<td>" + character.race + "</td>" +
                        "<td>" + character.manga + "</td>" +
                        "<td>" + "<audio src= '" + "../assets/voice/" + character.voice + "' controls ></audio>" + "</td>" +
                        "</tr>" +
                        "</table>" +
                        "</div>" +
                        "</div>"

                });

                $('main').append(only);
            }
        }
    })
}

character_id ? getcharacter(character_id) : alert('error');

$("input:submit").click((e) => {
    e.preventDefault();

    const date_comment = $("#date_comment").val();
    const note = $("#note").val();
    const comment_user = $("#comment_user").val();

    commentUser(date_comment, note, comment_user);
})


$.ajax({
    url: "comment.php",
    type: "GET",
    data: {
        choice: 'select',
        character_id
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let c = "";

            res.comments.forEach(comment => {
                c += "<tr id='tr-" + comment.id_Comment + "'>" +
                    "<td>" + comment.date + "</td>" +
                    "<td>" + comment.note + "</td>" +
                    "<td>" + comment.content + "</td>" +
                    "<td>" + comment.prenom + "</td>" +
                    "</tr>";
            });

            $('#comment').append(c);
        } else $("#error").html(res.msg)
    }
})

function commentUser(date_comment, note, comment_user) {
    $.ajax({
        url: "comment.php",
        type: "POST",
        data: {
            choice: 'insert',
            date_comment,
            note,
            comment_user,
            character_id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                const newComment = "<tr id='tr-" + res.newid + "'>" +
                    "<td>" + date_comment + "</td>" +
                    "<td>" + note + "</td>" +
                    "<td>" + comment_user + "</td>" +
                    "</tr>";
                $('#comment').append(newComment);
            } else $("#error").html(res.msg);

            document.querySelector('form').reset();
        }
    });
}

if (JSON.parse(localStorage.getItem('user')).admin == 1) {
    $("#returnadmin").prop("href", "../html-css-js/admin/adm_home_page.html");
}