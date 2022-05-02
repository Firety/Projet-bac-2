$.ajax({
    url: "manga.php",
    type: "GET",
    data: {},
    dataType: "json",
    success: (res, status) => {
        if (res.success) {
            let html = '';

            res.mangas.forEach(manga => {
                html += "<tr id='tr-" + manga.id_Manga + "'>" +
                    "<td>" + manga.name + "</td>" +
                    "<td>" + "<img src='" + "../assets/logos/" + manga.Logo + "'>" + "</td>" +
                    "<td>" + manga.author + "</td>" +
                    "<td>" + manga.release_date + "</td>" +
                    "<td>" + manga.number_episodes + "</td>" +
                    "<td>" + manga.summary + "</td>" +
                    "</tr>"
            });


            $("table").append(html);
        }
    }
});

if (JSON.parse(localStorage.getItem('user')).admin == 1) {
    $("a").prop("href", "../html-css-js/admin/adm_home_page.html");
}