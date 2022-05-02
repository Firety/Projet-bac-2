$("input:submit").click((e) => {
    e.preventDefault();

    const id = $("#id_race").val();
    const Name = $("#Name").val();

    insertRace(Name);
});

$.ajax({
    url: "race.php",
    type: "GET",
    data: {
        choice: 'select'
    },
    dataType: "json",
    success: (res, status) => {
        if (res.success) {
            let html = '';

            res.races.forEach(race => {
                html += "<tr id='tr-" + race.id_Race + "'>" +
                    "<td>" + race.name + "</td>" +
                    "<td><button onclick='wantToDelete(" + race.id_Race + ", \"" + race.name + "\")'>Supprimer</button></td>" +
                    "</tr>";
            });

            $('table').append(html);
        } else $("#error").html(res.msg)
    }
})

function insertRace(Name) {
    $.ajax({
        url: "race.php",
        type: "POST",
        data: {
            choice: 'insert',
            Name
        },
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                const newRace = "<tr id='tr-" + res.newid + "'>" +
                    "<td>" + Name + "</td>" +
                    "<td><button onclick='wantToDelete(" + res.newid + ", " + race.name + ")'>Supprimer</button></td>" +
                    "</tr>";

                $('table').append(newRace);
            } else $("#error").html(res.msg);

            document.querySelector('form').reset();
        }
    });
}

function wantToDelete(id, Name) {
    const wantTo = confirm("Supprimer" + Name + "?");

    if (wantTo) {
        $.ajax({
            url: "race.php",
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