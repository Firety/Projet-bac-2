var slide = new Array("../assets/logos/one piece logo.png", "../assets/logos/Logo Naruto Shippuden.png", "../assets/logos/Dragon Ball Super Logo.png", "../assets/logos/Fairy-Tail-Logo.png", "../assets/logos/MHA logo.png", "../assets/logos/Demon slayer logo.png");
var image = 0;

function ChangeSlide(sens) {
    image = image + sens;
    if (image < 0)
        image = slide.length - 1;
    if (image > slide.length - 1)
        image = 0;
    document.getElementById("slide").src = slide[image];

}

setInterval("ChangeSlide(1)", 2000);

var slideb = new Array("../assets/characters/one piece/Luffy(mgw).jpg", "../assets/characters/naruto/Naruto.png", "../assets/characters/dragon ball super/Goku.png", "../assets/characters/fairy tail/Natsu.png", "../assets/characters/mha/Midoriya.png", "../assets/characters/demon slayer/Tanjiro.png", );
var imageb = 0;

function ChangeSlideb(sensb) {
    imageb = imageb + sensb;
    if (imageb < 0)
        imageb = slideb.length - 1;
    if (imageb > slideb.length - 1)
        imageb = 0;
    document.getElementById("slideb").src = slideb[imageb];

}

setInterval("ChangeSlideb(1)", 2000);

$('#deco').click((e) => {
    e.preventDefault();
    $.ajax({
        url: "deconnection.php",
        type: "GET",
        data: {

        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                localStorage.removeItem('user');
                window.location.replace("homepage.html")
            } else alert("erreur")
        }
    })
})

if (localStorage.getItem('user')) {
    $('#deco').show();
} else $('#deco').hide();

if (localStorage.getItem('user')) {
    $('#mangas').show();
} else $('#mangas').hide();

if (localStorage.getItem('user')) {
    $('#characters').show();
} else $('#characters').hide();

if (localStorage.getItem('user')) {
    $('#register').hide();
} else $('#register').show();

if (localStorage.getItem('user')) {
    $('#connection').hide();
} else $('#connection').show();