var slide = new Array("../../assets/logos/one piece logo.png", "../../assets/logos/Logo Naruto Shippuden.png", "../../assets/logos/Dragon Ball Super Logo.png", "../../assets/logos/Fairy-Tail-Logo.png", "../../assets/logos/MHA logo.png", "../../assets/logos/Demon slayer logo.png");
var numero = 0;

function ChangeSlide(sens) {
    numero = numero + sens;
    if (numero < 0)
        numero = slide.length - 1;
    if (numero > slide.length - 1)
        numero = 0;
    document.getElementById("slide").src = slide[numero];

}

setInterval("ChangeSlide(1)", 2000);

var slideb = new Array("../../assets/characters/one piece/Luffy(mgw).jpg", "../../assets/characters/naruto/Naruto.png", "../../assets/characters/dragon ball super/Goku.png", "../../assets/characters/fairy tail/Natsu.png", "../../assets/characters/mha/Midoriya.png", "../../assets/characters/demon slayer/Tanjiro.png", );
var numerob = 0;

function ChangeSlideb(sensb) {
    numerob = numerob + sensb;
    if (numerob < 0)
        numerob = slideb.length - 1;
    if (numerob > slideb.length - 1)
        numerob = 0;
    document.getElementById("slideb").src = slideb[numerob];

}

setInterval("ChangeSlideb(1)", 2000);

$('button').click(() => {
    $('aside, #overlay').addClass('open');
});

$('#overlay').click(() => {
    $('aside, #overlay').removeClass('open');
})