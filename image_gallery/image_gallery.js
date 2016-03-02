$(document).ready(function() {
    $("#image_list").each(function() {
        var swappedImage = new Image();
        swappedImage.src = $(this).attr("href");
    });

    // set up even handlers for links
    $("#image_list a").click(function(evt) {
        // swap image
        var imageURL = $(this).attr("href");        // assigns the clicked image href to var
        $("#image").attr("src", imageURL);          // displays clicked image

        // swap caption
        var caption = $(this).attr("title");        // assigns the clicked image caption to var
        $("#caption").text(caption);                // displays the new caption

        // cancel the default action of the link
        evt.preventDefault();
    });     // end click

    // move focus to the first link when page is loaded
    $("li:first-child a").focus();
});         // end ready