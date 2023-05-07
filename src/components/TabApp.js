import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Customers, Calendar } from "./functions";
import Training from "./training";

function TabApp() {
    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
        };
    
    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Customers" />
                <Tab value="two" label="Training" />
                <Tab value="three" label="Calendar" />
            </Tabs>
            {value === 'one' && <div><Customers/></div>}
            {value === 'two' && <div><Training /></div>}
            {value === 'three' && <div><Calendar/></div>}
        </div>
        
    );
    }
export default TabApp;
