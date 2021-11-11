$(document).ready(function(){
    // typing text animation script
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    var typed = new Typed(".typing", {
        strings: ["Gamer", "Developer", "Student", "Designer", "Golfer"],
        typeSpeed: 130,
        backSpeed: 75,
        loop: true
    });
});