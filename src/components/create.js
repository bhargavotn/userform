import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export default function Create() {
  let history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [address1Error, setAddress1Error] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setMobileError('');
    setAddress1Error('');
    setZipCodeError('');
  }, [firstName, lastName, email, mobile, address1, zipCode]);

  const postData = () => {
    let isValid = true;

    if (firstName.length < 5) {
      setFirstNameError('First Name must be at least 5 characters');
      isValid = false;
    }

    if (lastName.length < 5) {
      setLastNameError('Last Name must be at least 5 characters');
      isValid = false;
    }

    if (!isEmailValid(email)) {
      setEmailError('Invalid Email');
      isValid = false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setMobileError('Invalid Mobile Number');
      isValid = false;
    }

    if (!address1) {
      setAddress1Error('Address 1 is mandatory');
      isValid = false;
    }

    if (!/^\d{5}$/.test(zipCode)) {
      setZipCodeError('Invalid Zip Code');
      isValid = false;
    }

    if (isValid) {
      axios
        .post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`, {
          firstName,
          lastName,
          email,
          mobile,
          address1,
          address2,
          state,
          zipCode,
          country,
          checkbox,
        })
        .then(() => {
          history.push('/read');
        });
    }
  };

  const stateOptions = [
    { key: 'ny', text: 'New York', value: 'New York' },
    { key: 'ca', text: 'California', value: 'California' },
    // Add more states as needed
  ];

  const countryOptions = [
    { key: 'us', text: 'United States', value: 'United States' },
    { key: 'ca', text: 'Canada', value: 'Canada' },
    // Add more countries as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <Form className="create-form">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Form.Field>
              <label className="text-gray-700">First Name</label>
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="text-red-500">{firstNameError}</div>
            </Form.Field>
          </div>
          <div>
            <Form.Field>
              <label className="text-gray-700">Last Name</label>
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <div className="text-red-500">{lastNameError}</div>
            </Form.Field>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Form.Field>
              <label className="text-gray-700">Email</label>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-red-500">{emailError}</div>
            </Form.Field>
          </div>
          <div>
            <Form.Field>
              <label className="text-gray-700">Mobile</label>
              <Input
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <div className="text-red-500">{mobileError}</div>
            </Form.Field>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Form.Field>
              <label className="text-gray-700">Address 1</label>
              <Input
                placeholder="Address 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <div className="text-red-500">{address1Error}</div>
            </Form.Field>
          </div>
          <div>
            <Form.Field>
              <label className="text-gray-700">Address 2</label>
              <Input
                placeholder="Address 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Form.Field>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Form.Field>
              <label className="text-gray-700">State</label>
              <Dropdown
                placeholder="Select State"
                fluid
                selection
                options={stateOptions}
                value={state}
                onChange={(e, { value }) => setState(value)}
              />
            </Form.Field>
          </div>
          <div>
            <Form.Field>
              <label className="text-gray-700">Zip Code</label>
              <Input
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <div className="text-red-500">{zipCodeError}</div>
            </Form.Field>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Form.Field>
              <label className="text-gray-700">Country</label>
              <Dropdown
                placeholder="Select Country"
                fluid
                selection
                options={countryOptions}
                value={country}
                onChange={(e, { value }) => setCountry(value)}
              />
            </Form.Field>
          </div>
          <div>
            <Form.Field>
              <label className="text-gray-700">&nbsp;</label>
              <Button onClick={postData} type="submit" className="bg-blue-500 text-white">
                Submit
              </Button>
            </Form.Field>
          </div>
        </div>
        <Form.Field>
          <div className="grid grid-cols-1">
            <div>
              <label className="checkbox-label">
                <Checkbox
                  label="I agree to the Terms and Conditions"
                  checked={checkbox}
                  onChange={(e) => setCheckbox(!checkbox)}
                />
              </label>
            </div>
          </div>
        </Form.Field>
      </Form>
    </div>
  );
}
