$(document).ready(function() {
 $('#submit').click(function() {
     const S_details = {
         id: $('#S_id').val(),
         firstname: $('#S_first').val(),
         surname: $('#S_last').val(),
         picture: $('#S_url').val(),
         grade: $('#S_grade').val(),
     }
     const url = new URL(window.location.href);
     const value = url.pathname.split("/")[2];

     console.log(value);



     $('#C_id').val(value);
     $.ajax({
         method : 'POST',
         url : 'http://localhost:3001/courses/' + value + '/student',
         data: S_details,
         success: function(res) {
             console.log(res);
         },
         error: function(err){
             console.log(err);
         }
     })
 })
})