$("#register").click((e) => {
    e.preventDefault();

    const lastname = $("#lastname").val();
    const firstname = $("#firstname").val();
    const birth = $("#birth").val();
    const mail = $("#mail").val();
    const log = $("#log").val();
    const pwd = $("#pwd").val();

    if (
        lastname.trim() != '' &&
        firstname.trim() != '' &&
        birth.trim() != '' &&
        mail.trim() != '' &&
        log.trim() != '' &&
        pwd.trim() != ''
    ) {

        $.ajax({
            url: "register.php",
            type: "POST",
            data: {
                lastname,
                firstname,
                birth,
                mail,
                log,
                pwd
            },
            dataType: "json",
            success: (res, status) => {
                if (res.success) {
                    alert("Tu es inscrit, bienvenue!!")
                } else alert(res.msg);
            }
        })
    }
})