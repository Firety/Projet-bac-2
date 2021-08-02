$("#cancelUpdate").hide();

function insertManga(name_manga, logo_manga, author, release, episodes, resume) {
    $.ajax({
        url: "modification_manga.php",
        type: "POST",
        data: {
            choice: 'insert',
            name_manga,
            logo_manga,
            author,
            release,
            episodes,
            resume
        },
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                const newManga = "<tr id='tr-" + res.newid + "'>" +
                    "<td>" + name_manga + "</td>" +
                    "<td><img src='" + logo_manga + "'></td>" +
                    "<td>" + author + "</td>" +
                    "<td>" + release + "</td>" +
                    "<td>" + episodes + "</td>" +
                    "<td>" + resume + "</td>" +
                    "<td><button onclick='wantToUpdate(" + res.newid + ")'>Modifier</button></td>" +
                    "<td><button onclick='wantToDelete(" + res.newid + ", " + manga.name + ")'>Supprimer</button></td>" +
                    "</tr>";
                $('table').append(newManga);
            } else $("#error").html(res.msg);

            document.querySelector('form').reset();
        }
    });
}

function updateManga(id, name_manga, logo_manga, author, release, episodes, resume) {
    $.ajax({
        url: "modification_manga.php",
        type: "POST",
        data: {
            choice: 'update',
            id,
            name_manga,
            logo_manga,
            author,
            release,
            episodes,
            resume
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                const updatedManga = "<td>" + name_manga + "</td>" +
                    "<td>" + "<img src='" + "../../assets/logos/" + logo_manga + "'>" + "</td>" +
                    "<td>" + author + "</td>" +
                    "<td>" + release + "</td>" +
                    "<td>" + episodes + "</td>" +
                    "<td>" + resume + "</td>" +
                    "<td><button onclick='wantToUpdate(" + id + ")'>Modifier</button></td>" +
                    "<td><button onclick='wantToDelete(" + id + ", " + name_manga + ")'>Supprimer</button></td>";
                $('#tr-' + id).html(updatedManga);
            } else $("error").html(res.msg);

            document.querySelector('form').reset();
        }
    });
}

function wantToDelete(id, name_manga) {
    const wantTo = confirm("supprimmer le manga " + name_manga + "?");

    if (wantTo) {
        $.ajax({
            url: "modification_manga.php",
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
    url: "modification_manga.php",
    type: "GET",
    data: {
        choice: 'select'
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let html = '';

            res.mangas.forEach(manga => {
                html += "<tr id='tr-" + manga.id_Manga + "'>" +
                    "<td>" + manga.name + "</td>" +
                    "<td>" + "<img src='" + "../../assets/logos/" + manga.Logo + "'>" + "</td>" +
                    "<td>" + manga.author + "</td>" +
                    "<td>" + manga.release_date + "</td>" +
                    "<td>" + manga.number_episodes + "</td>" +
                    "<td>" + manga.summary + "</td>" +
                    "<td><button onclick='wantToUpdate(" + manga.id_Manga + ")'>Modifier</button></td>" +
                    "<td><button onclick='wantToDelete(" + manga.id_Manga + ", \"" + manga.name + "\")'>Supprimer</button></td>" +
                    "</tr>";
            });

            $('table').append(html);
        } else $("#error").html(res.msg)
    }
});

function wantToUpdate(id) {
    $("cancelUpdate").show();

    $.ajax({
        url: "modification_manga.php",
        type: "GET",
        data: {
            choice: 'select_id',
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                $("#id_manga").val(res.manga.id_Manga);
                $("#name_manga").val(res.manga.name);
                $("#logo_manga").val(res.manga.Logo);
                $("#author").val(res.manga.author);
                $("#release").val(res.manga.release_date);
                $("#episodes").val(res.manga.number_episodes);
                $("#resume").val(res.manga.summary);
            }
        }
    })
}

$("input:submit").click((e) => {
    e.preventDefault();

    const id = $("#id_manga").val();
    const name_manga = $("#name_manga").val();
    const logo_manga = $("#logo_manga").val();
    const author = $("#author").val();
    const release = $("#release").val();
    const episodes = $("#episodes").val();
    const resume = $("#resume").val();

    if (id != '') updateManga(id, name_manga, logo_manga, author, release, episodes, resume);
    else insertManga(name_manga, logo_manga, author, release, episodes, resume);
});

$("#cancelUpdate").click((e) => {
    e.preventDefault();

    document.querySelector('form').reset();
    $("#cancelUpdate").hide();
})