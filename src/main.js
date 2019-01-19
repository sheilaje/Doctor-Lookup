import { DoctorList } from './doctorPromise.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

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
      outputList += `<div class="doctorsWrapper" align ="left"> <div class="doctors" >${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</div>`;

      let addressString = printLocation(body.data[i]);
      outputList += addressString;

      outputList += `</div>`;
    }
    $("#doctors").html(outputList);
  }

  function printLocation(body){
    let addressList = "";
    
    let uniqueArray = body.practices.filter(function(item, pos) {
        return body.practices.indexOf(item) == pos;
    })

    for(let i=0; i<uniqueArray.length; i++){
      addressList += `<div class='location'><span class='address'> ${uniqueArray[i].visit_address.street} ${uniqueArray[i].visit_address.city} ${uniqueArray[i].visit_address.state} ${uniqueArray[i].visit_address.zip}</span>
      <span class='newPatient'>${body.practices[i].accepts_new_patients}</span>
      </div>`;
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
