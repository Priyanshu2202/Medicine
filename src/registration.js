import React, { useState, useEffect } from 'react'
import './style.css'
import axios from 'axios';

const RegistrationForm = () => {

  const [values, setValues]=useState({
    dateOfRegistration:'',
        name:'',
        address:'',
        homephone:'',
        telephone:'',
        religion:'',
        community:'',
        age:'',
        date:'',
        occ:'',
        income:'',
        fname:'',
        sname:'',
        stele:''
  }) 

  const [statelist, setStatelist] = useState(null);
  const [currentCounter, setCurrentCounter] = useState(
    parseInt(sessionStorage.getItem('counter')) || 1
  );
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/state.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStatelist(data);
  
        if (!sessionStorage.getItem('counter')) {
          setCurrentCounter(1);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error, e.g., set an error state or show a user-friendly message
      });
  }, []);

const renderDistricts = () => {
  const districts = statelist?.[selectedState];
  return (
    districts &&
    Object.keys(districts).map((district) => (
      <option key={district} value={district}>
        {district}
      </option>
    ))
  );
};

const renderTaluks = () => {
  const taluks = statelist?.[selectedState]?.[selectedDistrict];
  return (
    taluks &&
    taluks.map((taluk) => (
      <option key={taluk} value={taluk}>
        {taluk}
      </option>
    ))
  );
};

const handleStateChange = (event) => {
  setSelectedState(event.target.value);
  setSelectedDistrict('');
};

const handleDistrictChange = (event) => {
  setSelectedDistrict(event.target.value);
};
  function calculateAge() {
    const dobInput = document.getElementById('date');
    const ageInput = document.getElementById('age');

    const dob = new Date(dobInput.value);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - dob.getFullYear();

    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
    ) {
      ageInput.value = age - 1;
    } else {
      ageInput.value = age;
    }
    values.age=ageInput.value;
    values.date=dob;
  }

  const handleChange = (event) => {
     setValues({...values,[event.target.name]:[event.target.value]})
    
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formValidation()) {
      setCurrentCounter(currentCounter + 1);
      sessionStorage.setItem('counter', currentCounter + 1);
      document.getElementById('counter').innerText = currentCounter + 1;
      document.getElementById('downloadButton').style.display = 'block';
      console.log(values)
      axios.post('http://localhost:8081/registration', values)
     
//   .then(res => console.log("Server Response:", res))
//   .catch(err => console.error("Axios Error:", err));

       .then(res => console.log("Registered Successfully"))
       .catch(err => console.log(err));
    }
  };

  function downloadAsPDF() {
    window.print();
  }

  function formValidation() {
    var name = document.getElementById("name");
    var homephone = document.getElementById('homephone');
    var telephone = document.getElementById('telephone');
    var religion = document.getElementById('religion');
    var community = document.getElementById('community');
    var education = document.getElementById('eduq');
    var occupation = document.getElementById('occ');
    var income = document.getElementById('income');
    var fname = document.getElementById('fname');
    var sname = document.getElementById('sname');
    var stele = document.getElementById('stele');

    if (!validateName(name.value, 'Name should contain only letters and should not be empty'))
      return false;
    if (!validatePhone(homephone.value, 'Homephone should have only 10 digits and should not be empty'))
      return false;
    if (!validatePhone(telephone.value, 'Telephone should have only 10 digits and should not be empty'))
      return false;
    if (!validateText(religion.value, 'Religion should be text only and should not be empty'))
      return false;
    if (!validateText(community.value, 'Community should be text only and should not be empty'))
      return false;
    if (!validateText(education.value, 'Education should be text only and should not be empty'))
      return false;
    if (!validateText(occupation.value, 'Occupation should be text only and should not be empty'))
      return false;
    if (!validateNumber(income.value, 'Income should have only digits and should not be empty'))
      return false;
    if (!validateText(fname.value, 'Family name should be text only and should not be empty'))
      return false;
    if (!validateText(sname.value, 'Support person name should be text only and should not be empty'))
      return false;
    if (!validatePhone(stele.value, 'Telephone of support person should have exactly 10 digits and should not be empty'))
      return false;

    return true;
  }

  function validateName(value, errorMessage) {
    var letters = /^[A-Za-z]+$/;
    return validateField(value, letters, errorMessage);
  }

  function validateText(value, errorMessage) {
    var letters = /^[A-Za-z]+$/;
    return validateField(value, letters, errorMessage);
  }

  function validateNumber(value, errorMessage) {
    var numbers = /^[0-9]+$/;
    return validateField(value, numbers, errorMessage);
  }

  function validatePhone(value, errorMessage) {
    var numbers = /^[0-9]+$/;
    return validateField(value, numbers, errorMessage, value.length === 10);
  }

  function validateField(value, pattern, errorMessage, additionalCondition = true) {
    if (!pattern.test(value) || !additionalCondition) {
      alert(errorMessage);
      return false;
    }
    return true;
  }

  return (
    <div className="form-wrapper">
      <h4>CASE HISTORY FROM AND TREATMENT PLAN</h4><br />
      <h5>Socio-demographic information</h5>
      <h2>TAPOVANA AYURVEDIC MEDICAL COLLEGE & HOSPITAL</h2>


      <form id="registrationForm" onSubmit={handleFormSubmit} >
        <div id="reg1"> Registration Number: <div id="counter"></div><br />
          Date of registration: <input type="date" id="dateOfRegistration" name="dateOfRegistration" onChange={handleChange} /></div>
        <div id="tname">Name: <input type="text" id="name" name="name" onChange={handleChange}/><br />
          <div id="textar"><label htmlFor="address" id="adtxt">Address: </label><textarea id="address" name="address"
            rows="4" cols="250" onChange={handleChange}></textarea>
          </div>
          <br />
          State:
          <select id="stateDropdown" onChange={handleStateChange} value={selectedState}>
            <option value="">Select State</option>
            {statelist &&
              Object.keys(statelist).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
          </select>
          District:
          <select id="districtDropdown" onChange={handleDistrictChange} value={selectedDistrict}>
            <option value="">Select District</option>
            {renderDistricts()}
          </select>
          Taluk:
          <select id="talukDropdown">
            <option value="">Select Taluk</option>
            {renderTaluks()}
          </select>
          <br />
          Homephone: <input type="tel" className="telephone" name="homephone" id="homephone" onChange={handleChange} />
          Telephone: <input type="tel" className="telephone" name="telephone" id="telephone" onChange={handleChange} />
        </div>
        <table>
          <thead>
            <tr>
              <th>Sex</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Religion</th>
              <th>Community</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><select id="sex" name="sex"      >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="othe">Other</option>
              </select>
              </td>
              <td><input type="date" id="date" name="date" onChange={calculateAge} /> </td>
              <td><input type="number" id="age" name="age" onChange={handleChange} readOnly /> </td>

              <td><input type="text" id="religion" name="religion" onChange={handleChange} /> </td>
              <td><input type="text" id="community" name="community" onChange={handleChange} /> </td>
            </tr>
          </tbody>
        </table>



        <table>

          <tbody>
            <tr>
              <td>
                Educational Qualification(specify):

              </td>
              <td><input type="text" id="eduq" name="eduq" onChange={handleChange} /> </td>
            </tr>
          </tbody>

        </table>

        <table>
          <tbody>
            <tr>
              <td>
                Occupation:

              </td>
              <td><input type="text" id="occ" name="occ" onChange={handleChange} /> </td>
              <td>Income:</td>
              <td ><input type="text" id="income" name="income" onChange={handleChange} /></td>
              <td>Marital Status:</td>
              <td><select id="ms" name="ms"      >
                <option value="married">Married</option>
                <option value="single">Unmarried</option>
              </select></td>
            </tr>
          </tbody>

        </table>
        <br />
        <br />
        <br />
        Living arrangements:<br /><br />
        <table>
          <tbody>
            <tr>
              <td>Living with family</td>
              <td><input type="radio" name="livingArrangements" id="family" value="family" onChange={handleChange} /> </td>
            </tr>
            <tr>
              <td>Living with Friends or distant relatives</td>
              <td><input type="radio" name="livingArrangements" id="friends" value="friends" onChange={handleChange}/> </td>
            </tr>
            <tr>
              <td>Lives alone</td>
              <td><input type="radio" name="livingArrangements" id="alone" value="alone" onChange={handleChange} /> </td>
            </tr>
            <tr>
              <td>On the street </td>
              <td> <input type="radio" name="livingArrangements" id="onTheStreet" value="onTheStreet" onChange={handleChange}/> </td>
            </tr>
          </tbody>

        </table>
        <br /><br />

        <table>
          <tbody>
            <tr>
              <td>
                Name of family member(specify):

              </td>
              <td><input type="text" id="fname" name="fname" onChange={handleChange} /> </td>
            </tr>
            <tr>
              <td>Name of support person:</td>
              <td><input type="text" id="sname" name="sname"  onChange={handleChange}/></td>
            </tr>
            <tr>
              <td>Address accompanied the person:</td>
              <td><input type="text" id="acc" name="acc"  onChange={handleChange}/></td>
            </tr>
            <tr>
              <td>Telephone no.:</td>
              <td><input type="tel" id="stele" name="stele" onChange={handleChange}/></td>
            </tr>
          </tbody>

        </table>
        <br /><br />
        Referral:
        <br />
        <table>
          <tbody>
            <tr>
              <td>Self</td>
              <td><input type="checkbox" name="ref" id="self" value="self"onChange={handleChange} /> </td>
              <td>Recovered addict</td>
              <td><input type="checkbox" name="ref" id="Recoveredaddict" value="Recoveredaddict" onChange={handleChange}/> </td>
            </tr>
            <tr>
              <td>Friends</td>
              <td><input type="checkbox" name="ref" id="friend" value="friend" onChange={handleChange}/> </td>
              <td>Employer</td>
              <td><input type="checkbox" name="ref" id="employer" value="employer" onChange={handleChange} /> </td>
            </tr>
            <tr>
              <td>Family</td>
              <td><input type="checkbox" name="ref" id="family" value="family" onChange={handleChange} /> </td>
              <td>Media</td>
              <td><input type="checkbox" name="ref" id="media" value="media" onChange={handleChange} /> </td>
            </tr>
            <tr>
              <td>Social worker</td>
              <td><input type="checkbox" name="ref" id="socialworker" value="socialworker" onChange={handleChange} /> </td>
              <td>Through awareness program</td>
              <td><input type="checkbox" name="ref" id="program" value="program" onChange={handleChange} /> </td>
            </tr>
            <tr>
              <td>Physicians</td>
              <td><input type="checkbox" name="ref" id="physicians" value="physicians" onChange={handleChange}/> </td>
              <td>Anyone other</td>
              <td><input type="checkbox" name="ref" id="other" value="other" onChange={handleChange}/> </td>
            </tr>
          </tbody>

        </table>
        <br /><br />

        <br />
        <div className="submit">
          <input type="submit" value="Submit"  />
        </div>
        <button id="downloadButton" onClick={downloadAsPDF} >Download as PDF</button>

      </form>
    </div>
  );
};

export default RegistrationForm;