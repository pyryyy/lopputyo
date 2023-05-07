import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import dayjs from "dayjs";

export default function Training() {

    const [trainings, setTrainings] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstname', headerName: 'First Name', width: 200 },
        { field: 'lastname', headerName: 'Last Name', width: 200 },
        { field: 'date', headerName: 'Date and Time', width: 200 },
        { field: 'duration', headerName: 'Duration (minutes)', width: 200 },
        { field: 'activity', headerName: 'Activity', width: 200 },
      ];

    fetch('http://traineeapp.azurewebsites.net/api/trainings')
    .then(response => response.json())
    .then(data => {
        const promises = data.content.map(training => {
            return fetch(training.links[2].href)
            .then(response => response.json())
            .then(customerData => ({...training, customer: customerData}));
    });

    Promise.all(promises)
        .then(updatedData => {
        setTrainings(updatedData);
        });
    })
    .catch(error => console.error(error));
    
    const detailsRows = trainings.map((row) => {
        const osoite = row.links[2].href;
        const id = osoite.match(/\d+/g);
        const date = row.date;
        const dateformat = dayjs(date).format('DD.MM.YYYY HH:mm');

        return {
        id: id,
        firstname: row.customer.firstname,
        lastname: row.customer.lastname,
        date: dateformat,
        duration: row.duration,
        activity: row.activity,
        }
        });

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