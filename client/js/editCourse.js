window.onload = function() {
    // Get the URL
    const url = window.location.href;

    // Split the URL based on '/'
    const urlParts = url.split('/');

    // Get the last part of the URL
    const value = urlParts[urlParts.length - 1];

    $('#C_id').val(value);
    // You can use the retrieved value as needed
};

$(document).ready(function() {
    $('#submit').click(function() {
        const prerequisiteIDs = []; // Array to store the prerequisite course IDs

        // Iterate through each input field with the class "prerequisite"
        $(".prerequisite").each(function() {
            const prerequisiteID = $(this).val(); // Get the value of the input field
            prerequisiteIDs.push(prerequisiteID); // Add the value to the array
        });
        const details = {
            id : $('#C_id').val(),
            name : $('#C_name').val(),
            Lecturer: $('#C_lect').val(),
            start_date: $('#C_start').val(),
            end_date: $('#C_end').val(),
            prerequisite_course: prerequisiteIDs
        }
        $.ajax({
            method: 'PUT',
            url: 'http://localhost:3001/courses/' + details.id,
            data:details,
            success: function(res) {
                console.log(res)
            },
            error: function(err){
                console.log(err);
            }
        })
    })
})

function generateInputs() {
    let numOfPrerequisites = document.getElementById("C_pre").value;
    let inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = ""; // Clear existing inputs

    for (let i = 0; i < numOfPrerequisites; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Course Id " + (i + 1);
        input.className = "prerequisite";
        inputContainer.appendChild(input);
    }
}