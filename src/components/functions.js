import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';

export function Customers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch("http://traineeapp.azurewebsites.net/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }
    console.log(customers)


    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'firstname', headerName: 'First name', width: 130 },
        { field: 'lastname', headerName: 'Last name', width: 130 },
        { field: 'streetaddress', headerName: 'Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 130 },
        { field: 'city', headerName: 'City', width: 130,},
        { field: 'email', headerName: 'Email', width: 200,},
        { field: 'phone', headerName: 'Phone', width: 130,},
      ];
      
      const detailsRows = customers.map((row) => {
        const url = row.links[0].href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        return {
          id: id,
          firstname: row.firstname,
          lastname: row.lastname,
          streetaddress: row.streetaddress,
          postcode: row.postcode,
          city: row.city,
          email: row.email,
          phone: row.phone
        }});

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid
                rows={detailsRows}
                columns={columns}
                paginationModel={{ page: 0, pageSize: 25 }}
                checkboxSelection
            />
        </div>
    )
}

export function Calendar() {

    return (
        <div>Tähän tulis kalenteri</div>
    )
}