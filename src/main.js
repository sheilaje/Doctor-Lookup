import { DoctorList } from './doctorPromise.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#submitNameButton").click(function() {
    event.preventDefault();
    let name = $("#name").val();
    $("#name").val("");
    const doctorListObject = new DoctorList();

    let promise1 = doctorListObject.getDoctorsByName(name);

    promise1.then(function(response) {
      let body = JSON.parse(response);
      if(body.data.length < 1){
        $("#doctors").html("No matches found !!");
      }else {
        doctorParse(body);
      }
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
      addressList += `<div class='location'><span class='address'> ${uniqueArray[i].visit_address.street}, ${uniqueArray[i].visit_address.city}, ${uniqueArray[i].visit_address.state}. ${uniqueArray[i].visit_address.zip}</span>
      <span class='newPatient'><p> Accepting New Patients -${body.practices[i].accepts_new_patients}</p></span>
      </div>`;
    }
    return addressList;
  }

  $("#submitMedicalIssueButton").click(function() {
    event.preventDefault();

    let query = $("#query").val();
    $("#query").val("");

    const doctorListObject = new DoctorList();

    let promise2 = doctorListObject.getDoctorsByQuery(query);

    promise2.then(function(response) {
      let body = JSON.parse(response);
      if(body.data.length < 1){
        $("#doctors").html("No Matches Found!!")
      }else {
        doctorParse(body);
      }
    }).catch(function(error) {
      console.error(error);
    });
  });
});
