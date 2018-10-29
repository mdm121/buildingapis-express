let getChirps = (e) => {
    $.get('../api/chirps', (data) => {
        let chirpArray = Object.keys(data).map(chirpID => {
            let posID = chirpID;
            data[chirpID].id = posID;
            return data[chirpID];
        })
        console.log(chirpArray);

        chirpArray.pop();
        chirpArray.reverse();
        chirpArray.forEach(chirp => {
            
            let chirpDiv = $(`
                <div 
                    class="card mx-auto mb-3 p-3 text-center bg-secondary"
                    style="width: 18rem;">
                    
                    <div class="card-body">
                        <img 
                            class="card-img mb-2" 
                            src="./IMG_0021.JPG"
                            alt="Avatar"
                            style="height: 200px; width: 150px" />
                        <h5 class="card-title">USER: ${chirp.user}</h5>
                        <p class="card-text">CHIRPED: ${chirp.text}</p>
                        <p class="card-text">ID: ${chirp.id}</p>
                    </div>
                    <!-- Button trigger modal -->
                    <div class="card-footer text-muted d-flex align-items-center justify-content-around">
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            data-toggle="modal" 
                            data-target="#exampleModal"
                            id="edit"
                            onclick="editChirp(${chirp.id})">Edit</button>
                        <button 
                            type="button"
                            class="btn btn-danger"
                            id="delete"
                            onclick="deleteChirp(${chirp.id})">Delete</button>
                    </div>
                </div>
            `);
            $('#chirpDiv').append(chirpDiv);
            
            
        });

        let editBox = $(`
            <div class="form-group">
                <label>Edit @[USERNAME]:</label>
                <input type="text" class="form-control" id="editUser">
            </div>
            <div class="form-group">
                <label>Edit Chirp:</label>
                <input type="text" class="form-control" id="editChirp">
            </div>
        `);
        $('#modalBody').append(editBox);

    });
};

getChirps();

$('#btnSubmit').click( (e) => {
    e.preventDefault();
    let user = $('#userBox').val();
    let text = $('#chirpBox').val();

    $.post('../api/chirps', { user, text }, (err) => { console.log(err) })
        .then($('#chirpDiv').empty())
        .then(getChirps())
        .then($('#chirpBox').val(''))

});

let deleteChirp = (id) => {
    $.ajax({
        url: `../api/chirps/${id}`,
        type: 'DELETE'
    })
    .then(() => {
        $('#chirpDiv').empty();
        getChirps();
    })
    .catch(err => console.log(err));

};

// $('#delete').dblclick((e, id) => {
//     e.preventDefault();
//     console.log("double click");
//     $.ajax({
//         url: `../api/chirps/${id}`,
//         type: 'DELETE'
//     })
//     .then(() => {
//         $('#chirpDiv').empty();
//         getChirps();
//     })
//     .catch(err => console.log(err));
// })

let editChirp = (id) => {

    $.get(`../api/chirps/${id}`)
    .then(chirp => {
        console.log(chirp);
        $('#editUser').val(chirp.user);
        $('#editChirp').val(chirp.text);


            $('#saveEdit').click(() => {

                let submitEdit = {
                    user: $('#editUser').val(),
                    text: $('#editChirp').val()
                };

                $.ajax({
                    url: `../api/chirps/${id}`,
                    type: 'PUT',
                    data: submitEdit,
                    success: () => {
                        console.log(`Chirp edited.`)
                    }
                
                })
                .then(() => {
                    $('#chirpDiv').empty();
                    getChirps();
                })
                .catch(err => console.log(err));
            });
    });
};


