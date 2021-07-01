var slide = new Array("Logos/one piece logo.png", "Logos/Logo Naruto Shippuden.png", "Logos/Dragon Ball Super Logo.png", "Logos/Fairy-Tail-Logo.png", "Logos/MHA logo.png", "Logos/Demon slayer logo.png");
var numero = 0;

function ChangeSlide(sens) {
    numero = numero + sens;
    if (numero < 0)
        numero = slide.length - 1;
    if (numero > slide.length - 1)
        numero = 0;
    document.getElementById("slide").src = slide[numero];

}

setInterval("ChangeSlide(1)", 3000);