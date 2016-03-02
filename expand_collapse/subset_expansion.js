$(document).ready(function() {
    $("#jdom a").click(function() {                     // when element a is clicked on
        $(this).prev().toggleClass("hide");             // toggle the second div class
        if($(this).prev().attr("class") != "hide") {    // if the the class is not hide
            $(this).prev().show();                      // show the second div element
            $(this).text("Show less");                  // change the link text to display "Show less"
        }
        else {                                          // if the class is hide
            $(this).prev().hide();                      // hide the second div element
            $(this).text("Show more");                  // change the link text to display "Show more"
        }
    }); // end click
})      // end ready