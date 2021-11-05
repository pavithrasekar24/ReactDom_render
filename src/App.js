import React from 'react';
import './style.css';
import axios from 'axios';
import { useState } from 'react';
export default function App() {
  const [isSubmitted, setISSubmitted] = useState(false);
  const inputStyle = {
    width: '250px',
    padding: '3px 8px',
    margin: '5px 0',
    borderRadius: '5px',
    outline: 'none',
    border: '2px solid blue',
  };
  const error = {
    color: 'red',
    fontSize: '12px',
  };
  const personDetails = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10% 0',
  };
  const submitBtn = {
    margin: 'auto',
    padding: '5px 10px',
    backgroundColor: 'blue',
    border: '1px solid blue',
    minWidth: '50px',
    textTransform: 'capitalize',
    borderRadius: '10px',
    color: '#ffff',
  };
  const [person, setPersonDetails] = useState({
    fullName: '',
    emailId: '',
    phoneNumber: '',
    customerType: '',
  });
  let customerTypeDetails = [
    { id: 1, label: 'Individual', value: 'Individual' },
    { id: 2, label: 'Business', value: 'Business' },
  ];
  let handleClick = (e) => {
    e.preventDefault();
    console.log(person);

    setISSubmitted(true);
    let url = 'url here';
    if (!isEmail() && !isFullName() && !isCustomerType()) {
      alert('your form has been submitted' + JSON.stringify(person));

      axios

        .post(url)
        .then((response) => {
          console.log('response', response);
          setPersonDetails({
            fullName: '',
            emailId: '',
            phoneNumber: '',
            customerType: '',
          });
          if (error.response.status === 200) {
            alert('your form has been submitted');
          } else if (error.response.status === 201) {
            alert('already email Id is exist');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  let handleChange = (e) => {
    let { name, value } = e.target;
    let data = person;
    data[name] = value;
    if (name == 'phoneNumber') {
      let condn = isNumber(e);
      if (condn) {
        setPersonDetails({ ...person }, data);
      }
    } else {
      setPersonDetails({ ...person }, data);
    }
  };
  let isCustomerType = () => {
    if (person.customerType == '') {
      return true;
    } else {
      return false;
    }
  };
  let isEmail = () => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(person.emailId)) {
      return true;
    } else {
      return false;
    }
  };
  let isFullName = () => {
    let regex = /^[a-zA-Z].*[\s\.]*$/g;
    if (!regex.test(person.fullName)) {
      return true;
    } else {
      return false;
    }
  };
  let isNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <form onSubmit={(e) => handleClick(e)}>
      <div style={personDetails}>
        <label>FullName</label>
        <input
          style={inputStyle}
          type="text"
          name="fullName"
          value={person.fullName}
          onChange={handleChange}
        />
        {isSubmitted && isFullName() ? (
          <span style={error}>Invalid FullName</span>
        ) : (
          ''
        )}

        <label>EmailId</label>
        <input
          style={inputStyle}
          type="email"
          name="emailId"
          value={person.emailId}
          onChange={handleChange}
        />
        {isSubmitted && isEmail() ? (
          <span style={error}>Invalid Email</span>
        ) : (
          ''
        )}

        <label>phoneNumber</label>
        <input
          style={inputStyle}
          type="text"
          name="phoneNumber"
          value={person.phoneNumber}
          onChange={handleChange}
          maxLength={10}
        />
        <label>Customer Type</label>

        <select style={inputStyle} onChange={handleChange} name="customerType">
          <option value="0">Select Type</option>
          {customerTypeDetails.map((item) => {
            return (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            );
          })}
        </select>
        {isSubmitted && isCustomerType() ? (
          <span style={error}>Choose type</span>
        ) : (
          ''
        )}

        <button type="submit" style={submitBtn}>
          Submit
        </button>
      </div>
    </form>
  );
}
