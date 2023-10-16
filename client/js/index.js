$(document).ready(function(){
    $('.add-butt').click(function(){
      window.location.href = "http://localhost:3001/course"
    })
}

);
$(document).ready(function(){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3001/courses',
        success: function(data){
            $.each(data, function(index, course) {
                let tableBody = $("#table-body");
                // Create a new row HTML string
                let editButtonID = 'edit-btn-' + course.id;
                let deleteButtonID = 'delete-btn-' + course.id;
                let addStudentID = 'addS-btn-' + course.id;
                let StudentListID = 'StudentList-btn-' + course.id;
                let newRow = '<tr id="row-' + course.id + '">' +
                    '<td>' + course.id + '</td>' +
                    '<td>' + course.name + '</td>' +
                    '<td>' + course.Lecturer + '</td>' +
                    '<td>' + course.start_date + '</td>' +
                    '<td>' + course.end_date + '</td>' +
                    '<td>' + course.prerequisite_course + '</td>' +
                    '<td>' +
                    '<div class="button-row">' +
                    '<button id="' + editButtonID + '" class="edit">Edit</button>' +
                    '<button id="' + deleteButtonID + '" class="delete">Delete</button>' +
                    '<button id="' + addStudentID + '" class="addStudent">Add students</button>' +
                    '<button id="' + StudentListID + '" class="StudentList">Student List</button>' +
                    '</div>' +
                    '</td>' +
                    '</tr>';

                // Append the new row to the table body
                tableBody.append(newRow);
            })
        },
        error: function (err){
            console.log(err);
        }
    })
})
$(document).ready(function() {
    $(document).on('click', '.delete', function() {
        let deleteButtonId = $(this).attr('id');
        console.log("Clicked delete button ID:", deleteButtonId);
        deleteButtonId = deleteButtonId.substring(11);

        // Get the row ID
        let rowId = 'row-' + deleteButtonId;

        $.ajax({
            type: "DELETE",
            url: "http://localhost:3001/courses/" + deleteButtonId,
            success: function(response) {
                // Remove the row from the table using the row ID
                $('#' + rowId).remove();

                // Handle the success response
            },
            error: function(error) {
                console.error(error);
                // Handle the error response
            }
        });
    });
});
$(document).ready(function() {
    $(document).on('click', '.edit', function() {
        // Get the course ID from the button's ID
        let editButtonId = $(this).attr('id');
        let courseId = editButtonId.substring(9);

       window.location.href = "http://localhost:3001/course/" + courseId;
       console.log(courseId);

    });
});

$(document).ready(function() {
    $(document).on('click', '.addStudent', function() {
        // Get the course ID from the button's ID
        let editButtonId = $(this).attr('id');
        let courseId = editButtonId.substring(9);
        window.location.href = "http://localhost:3001/course/" + courseId + "/student";
        console.log(courseId);

    });
});






// $(document).ready(function() {
//     // Open the popup when the "Add Course" button is clicked
//     $('').click(function() {
//         $('.popup-container').fadeIn();
//         $('.overlay').fadeIn();
//     });
//
//     // Close the popup when the overlay or close button is clicked
//     $('.overlay, .close-button').click(function() {
//         $('.popup-container').fadeOut();
//         $('.overlay').fadeOut();
//     });
// });