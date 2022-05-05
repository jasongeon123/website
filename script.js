$(document).ready(function(){
    // typing text animation script
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 0){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 0){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });


    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });



    var typed = new Typed(".typing", {
        strings: ["Gamer", "Developer", "Student", "Designer", "Golfer"],
        typeSpeed: 130,
        backSpeed: 75,
        loop: true
    });


    
});