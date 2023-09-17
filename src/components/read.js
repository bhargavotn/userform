import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Read() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`).then((response) => {
      console.log(response.data);
      setAPIData(response.data);
    });
  }, []);

  const setData = (data) => {
    let { id, firstName, lastName, email, mobile, address1, state, zipCode, country, checkbox } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('First Name', firstName);
    localStorage.setItem('Last Name', lastName);
    localStorage.setItem('Email', email);
    localStorage.setItem('Mobile', mobile);
    localStorage.setItem('Address', address1);
    localStorage.setItem('State', state);
    localStorage.setItem('Zip Code', zipCode);
    localStorage.setItem('Country', country);
    localStorage.setItem('Checkbox Value', checkbox);
  };

  const getData = () => {
    axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`).then((getData) => {
      setAPIData(getData.data);
    });
  };

  const onDelete = (id) => {
    axios.delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`).then(() => {
      getData();
    });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center whitespace-nowrap">First Name</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">Last Name</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">Email</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">Mobile</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">Address</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">State</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">Zip Code</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">Country</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">Checkbox Value</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">Update</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">Delete</th>
            </tr>
          </thead>
          <tbody>
            {APIData.map((data) => {
              return (
                <tr key={data.id}>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{data.firstName}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{data.lastName}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{data.email}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{data.mobile}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{data.address1}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{data.state}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{data.zipCode}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">{data.country}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    {data.checkbox ? 'Checked' : 'Unchecked'}
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <Link to="/update">
                      <Button onClick={() => setData(data)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                        Update
                      </Button>
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <Button onClick={() => onDelete(data.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
