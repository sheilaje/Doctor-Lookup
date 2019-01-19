import { DoctorList } from './doctorPromise.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  $("#submitNameButton").click(function() {
    event.preventDefault();
    let name = $("#name").val();
    let location = $("#location").val();
    let query = $("#location").val();
    //console.log(name, location);
    const doctorListObject = new DoctorList();

    let promise1 = doctorListObject.getDoctorsByName(name, location,query);

    promise1.then(function(response) {
      let body = JSON.parse(response);
      //console.log("body:", body);
      doctorParse(body);
      // for(let i=0; i<=body.data.length; i++)
      // {
      //   console.log(body.data[i].specialties[0].name);
      // }
    }).catch(function(error) {
      console.error(error);
    });
  });

  function doctorParse(body){
    let outputList = "";
    $("#doctors").append('<h3>List Of Doctors in Portland</h3>')
    for (let i=0; i<body.data.length; i++)
    {
      outputList += `<div class="doctors" align ="left"> <p>${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</p>`;

      let addressString = printLocation(body.data[i]);
      outputList += addressString;

      outputList += `</div>`;
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

  $("#submitMedicalIssueButton").click(function() {
    event.preventDefault();

    let location = $("#location").val();
    let query = $("#query").val();

    const doctorListObject = new DoctorList();

    let promise2 = doctorListObject.getDoctorsByQuery( location,query);

    promise2.then(function(response) {
      let body = JSON.parse(response);
      console.log("body:", body);
      doctorParse(body);
      // for(let i=0; i<=body.data.length; i++)
      // {
      //   console.log(body.data[i].specialties[0].name);
      // }
    }).catch(function(error) {
      console.error(error);
    });
  });

});
