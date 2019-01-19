import { DoctorList } from './doctorPromise.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  $("#submitButton").click(function() {
    event.preventDefault();
    let name = $("#name").val();
    let location = $("#location").val();
    console.log(name, location);
    const doctorListObject = new DoctorList();

    let promise1 = doctorListObject.getDoctors(name, location);

    promise1.then(function(response) {
      let body = JSON.parse(response);
      console.log("body:", body);
      doctorParse(body);
      for(let i=0; i<=body.data.length; i++)
      {
          console.log(body.data[i].specialties[0].name);
        }
    }).catch(function(error) {
      console.error(error);
    });


  function doctorParse(body){
    let outputList = "";
    $("#doctors").append('<h3>List Of Doctors in Portland</h3>')

    for (let i=0; i<body.data.length; i++)
    {
    outputList += `<div class="doctors" align ="left"> <p>${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</p>`;

    let addressString = printLocation(body.data[i]);
    console.log("Address String: " + addressString);
    outputList += addressString;

    outputList += `</div>`;
    //console.log(outputList);
  }
  $("#doctors").append(outputList);
  }

  function printLocation(body){
    let addressList = "";
    for(let i=0; i<body.practices.length; i++){
      addressList += `<p> ${body.practices[i].visit_address.street} ${body.practices[i].visit_address.city} ${body.practices[i].visit_address.state} ${body.practices[i].visit_address.zip}</p>`;
    }
    return addressList;
  }

});

});
