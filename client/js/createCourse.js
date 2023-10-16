$(document).ready(function() {
  $('#submit').click(function() {

  const id = $('#C_id').val();
  const name = $('#C_name').val();
  const Lecturer = $('#C_lect').val();
    const prerequisiteIDs = []; // Array to store the prerequisite course IDs

    // Iterate through each input field with the class "prerequisite"
    $(".prerequisite").each(function() {
      const prerequisiteID = $(this).val(); // Get the value of the input field
      prerequisiteIDs.push(prerequisiteID); // Add the value to the array
    });

    // Display the prerequisite course IDs in the console
    console.log(prerequisiteIDs);
  const start_date = $('#C_start').val();
  const end_date = $('#C_end').val();
  const details = {
    id: id,
    name: name,
    Lecturer: Lecturer,
    start_date: start_date,
    end_date: end_date,
    prerequisite_course: prerequisiteIDs,
    students: {}
  }


console.log(details);
    $.ajax({
      type: "POST",
      url: "http://localhost:3001/courses",
      data: details,
      success: function(response) {
        console.log(response);
        window.location.href = "http://localhost:3001/list";
      },
      error: function(error) {
        console.error(error);
      }
    });



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