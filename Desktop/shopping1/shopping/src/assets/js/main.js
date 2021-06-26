$("document").ready(function() {
    $("#contact_us").click(function() {
        console.log('running')
        $('body').animate({
            scrollTop:innerHeight
        })
        return false;
    });
})