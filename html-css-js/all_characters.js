$.ajax({
    url: "../html-css-js/admin/characters.php",
    type: "GET",
    data: {
        choice: "select"
    },
    dataType: "json",
    success: (res, status) => {
        if (res.success) {
            let all = '';

            res.characters.forEach(character => {
                all += "<div class='bloc'>" +
                    "<h1 class='centre'>" + character.first_name + "</h1>" +
                    "<a href='character.html?id=" + character.id_Character + "'>" + "<img src='" + "../assets/characters/" + character.Image + "'>" + "</a>" +
                    "</div>"
            });

            $('section').append(all);
        } else alert("Erreur");
    }
});

if (JSON.parse(localStorage.getItem('user')).admin == 1) {
    $("#link").prop("href", "../html-css-js/admin/adm_home_page.html");
}