$( document ).ready(function() {
    $('#btnSubmit').click( (e) => {
        e.preventDefault();
        $.get("../api/chirps", router.get('/:id?'))        
    })


});