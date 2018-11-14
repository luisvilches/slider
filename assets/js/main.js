// slider configuration
document.addEventListener('DOMContentLoaded', function(){
    // the init method is called to initialize the slider
    slider.init({
        // Installed the slider container
        container:'.slider',
        // change time between slides
        time:5000,
        // the prev and next buttons are instantiated
        prev:'.prev',
        next:'.next'
    })
})