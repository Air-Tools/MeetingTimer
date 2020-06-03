// javascript (using jquery syntax)
// javascript code                                         purpose                                    
// ------------------                                      -------
// $('[data-toggle="tooltip"]').tooltip();                 to get the tooltip working properly
// $('[data-toggle="popover"]').popover();                 to get the popover working properly
// $('.popover-dismiss').popover({ trigger: 'focus' });    to dismiss the popover by clicking anywhere on the page (otherwise user must click on the button or link again to dismiss the popover)
//

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('.popover-dismiss').popover({
        trigger: 'focus'
    });

});
$(document).ready(function () {
    $("#mycarousel").carousel({ interval: 2000 });
    // separate buttons for play and pause
    //     $("#carousel-pause").click(function () {
    //         $("#mycarousel").carousel('pause');
    //     });
    //     $("#carousel-play").click(function () {
    //         $("#mycarousel").carousel('cycle');
    //     });

    // single button for pause & play
    $("#carouselButton").click(function () {
        if ($("#carouselButton").children("span").hasClass('fa-pause')) {
            $("#mycarousel").carousel('pause');
            $("#carouselButton").children("span").removeClass('fa-pause');
            $("#carouselButton").children("span").addClass('fa-play');
        }
        else if ($("#carouselButton").children("span").hasClass('fa-play')) {
            $("#mycarousel").carousel('cycle');
            $("#carouselButton").children("span").removeClass('fa-play');
            $("#carouselButton").children("span").addClass('fa-pause');
        }
    });

    $("#reserveTableButton").click(function () {
        $("#reserveModal").modal('toggle');
    });

    $("#loginButton").click(function () {
        $("#loginModal").modal('toggle');
    });

});
