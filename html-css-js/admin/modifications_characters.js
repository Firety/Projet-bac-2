$("#cancelUpdate").hide();

function insertCharacter(lastname, firstname, nickname, birthday, age, height, audio, race, manga, picture, desc) {
    $.ajax({
        url: "modifications_characters.php",
        type: "POST",
        data: {
            choice: 'insert',
            lastname,
            firstname,
            nickname,
            birthday,
            age,
            height,
            audio,
            race,
            manga,
            picture,
            desc
        },
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                const newCharacter = "<tr id='tr-" + res.newid + "'>" +
                    "<td>" + lastname + "</td>" +
                    "<td>" + firstname + "</td>" +
                    "<td>" + nickname + "</td>" +
                    "<td>" + birthday + "</td>" +
                    "<td>" + age + "</td>" +
                    "<td>" + height + "</td>" +
                    "<td>" + "<audio src= '" + "../../assets/voice/" + audio + "' controls ></audio>" + "</td>" +
                    "<td>" + race + "</td>" +
                    "<td>" + manga + "</td>" +
                    "<td>" + "<img src='" + "../../assets/characters/" + picture + "'>" + "</td>" +
                    "<td>" + desc + "</td>" +
                    "<td><button onclick='wantToUpdate(" + res.newid + ")'>Modifier</button></td>" +
                    "<td><button onclick='wantToDelete(" + res.newid + ", " + character.first_name + ")'>Supprimer</button></td>" +
                    "</tr>";
                $('table').append(newCharacter);
            } else $("#error").html(res.msg);

            dosument.querySelector('form').reset();
        }
    })
}

function updateCharacter(id, lastname, firstname, nickname, birthday, age, height, audio, race, manga, picture, desc) {
    $.ajax({
        url: "modifications_characters.php",
        type: "POST",
        data: {
            choice: 'update',
            id,
            lastname,
            firstname,
            nickname,
            birthday,
            age,
            height,
            audio,
            race,
            manga,
            picture,
            desc
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                const updateCharacter = "<td>" + lastname + "</td>" +
                    "<td>" + firstname + "</td>" +
                    "<td>" + nickname + "</td>" +
                    "<td>" + birthday + "</td>" +
                    "<td>" + age + "</td>" +
                    "<td>" + height + "</td>" +
                    "<td>" + "<audio src= '" + "../../assets/voice/" + audio + "' controls ></audio>" + "</td>" +
                    "<td>" + race + "</td>" +
                    "<td>" + manga + "</td>" +
                    "<td>" + "<img src='" + "../../assets/characters/" + picture + "'>" + "</td>" +
                    "<td>" + desc + "</td>" +
                    "<td><button onclick='wantToUpdate(" + id + ")'>Modifier</button></td>" +
                    "<td><button onclick='wantToDelete(" + id + ", " + firstname + ")'>Supprimer</button></td>";
                $('#tr-' + id).html(updateCharacter);
            } else("#error").html(res.msg);

            document.querySelector('form').reset();
        }
    });
}

function wantToDelete(id, firstname) {
    const wantTo = confirm("Supprimer" + firstname + "?");

    if (wantTo) {
        $.ajax({
            url: "modifications_characters.php",
            type: "POST",
            data: {
                choice: 'delete',
                id
            },
            dataType: "json",
            success: (res, status) => {
                if (res.success) {
                    $("#tr-" + id).remove();
                } else $("#error").html(res.msg);
            }
        });
    }
}

$.ajax({
    url: "modifications_characters.php",
    type: "GET",
    data: {
        choice: 'select'
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let html = '';

            res.characters.forEach(character => {
                html += "<tr id='tr-" + character.id_Character + "'>" +
                    "<td>" + character.last_name + "</td>" +
                    "<td>" + character.first_name + "</td>" +
                    "<td>" + character.nickname + "</td>" +
                    "<td>" + character.date_birth + "</td>" +
                    "<td>" + character.age + "</td>" +
                    "<td>" + character.height + "</td>" +
                    "<td>" + "<audio src= '" + "../../assets/voice/" + character.voice + "' controls ></audio>" + "</td>" +
                    "<td>" + character.Race_id_Race + "</td>" +
                    "<td>" + character.Manga_id_Manga + "</td>" +
                    "<td>" + "<img src='" + "../../assets/characters/" + character.Image + "'>" + "</td>" +
                    "<td>" + character.description + "</td>" +
                    "<td><button onclick='wantToUpdate(" + character.id_Character + ")'>Modifier</button></td>" +
                    "<td><button onclick='wantToDelete(" + character.id_Character + ", \"" + character.first_name + "\")'>Supprimer</button></td>" +
                    "</tr>";
            });

            $('table').append(html);
        } else alert("Erreur");
    }
});

function wantToUpdate(id) {
    $("#cancelUpdate").show();

    $.ajax({
        url: "modifications_characters.php",
        type: "GET",
        data: {
            choice: 'select_id',
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                $("#id_character").val(res.character.id_Character);
                $("#lastname").val(res.character.last_name);
                $("#firstname").val(res.character.first_name);
                $("#nickname").val(res.character.nickname);
                $("#birthday").val(res.character.date_birth);
                $("#age").val(res.character.age);
                $("#height").val(res.character.height);
                $("#audio").val(res.character.voice);
                $("#race").val(res.character.Race_id_Race);
                $("#manga").val(res.character.Manga_id_Manga);
                $("#picture").val(res.character.Image);
                $("#desc").val(res.character.description);
            }
        }
    })
}

$("input:submit").click((e) => {
    e.preventDefault();

    const id = $("#id_character").val();
    const lastname = $("#lastname").val();
    const firstname = $("#firstname").val();
    const nickname = $("#nickname").val();
    const birthday = $("#birthday").val();
    const age = $("#age").val();
    const height = $("#height").val();
    const audio = $("#audio").val();
    const race = $("#race").val();
    const manga = $("#manga").val();
    const picture = $("#picture").val();
    const desc = $("#desc").val();

    if (id != '') updateCharacter(id, lastname, firstname, nickname, birthday, age, height, audio, race, manga, picture, desc);
    else insertCharacter(lastname, firstname, nickname, birthday, age, height, audio, race, manga, picture, desc);
});

$("#cancelUpdate").click((e) => {
    e.preventDefault();

    document.querySelector('form').reset();
    $("#cancelUpdate").hide();
})