let submit = document.getElementById('addUser')
if(submit){
    submit.addEventListener('submit',()=>{
        alert('Data saved Successfully');
    
    });

}

$("#updateUser").submit(function(event){
    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    let request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        window.location.href = 'http://localhost:3000/';
    })

});

if(window.location.pathname == "/"){
    let del = $(".table tbody td a.delete");
    del.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

