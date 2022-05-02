$("input:submit").click((e) => {
    e.preventDefault();

    const log = $("#log").val();
    const pwd = $("#pwd").val();

    $.ajax({
        url: "connection.php",
        type: "POST",
        data: {
            log,
            pwd
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                if (res.user.admin == 1) {
                    localStorage.setItem('user', JSON.stringify(res.user));
                    const test = JSON.parse(localStorage.getItem('user'));
                    window.location.replace("../html-css-js/admin/adm_home_page.html");
                } else {
                    localStorage.setItem('user', JSON.stringify(res.user));
                    const test = JSON.parse(localStorage.getItem('user'));
                    window.location.replace("homepage.html");
                }
            } else alert("Login ou mot de passe erroné");
        }
    })
})