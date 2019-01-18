import { DoctorList } from './doctorPromise.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  $("#submitButton").click(function() {
    let name = $("#name").val();
    let location = $("#location").val();
  console.log(name);
  console.log(location);
    const doctorListObject = new DoctorList();

    let promise1 = doctorListObject.getDoctors(location);

    promise1.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      for(let i=0; i<=body.data.length; i++)
      {
        console.log(body.data[i].specialties[0].name);
      }
      doctorParse(body);
    }).catch(function(error) {
      console.error(error);
    });
  });


  function doctorParse(body){
    let outputList = "";
    // <h3>List Of Doctors in Portland</h3>
    for (let i=0; i<body.data.length; i++)
    {
    outputList += `<div class="doctors" align ="center"> <p>${body.data[i].profile.first_name}</p></div>`;
    //console.log(outputList);
  }
  $("#doctors").append(outputList);
  }

});
