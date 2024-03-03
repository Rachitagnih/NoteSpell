import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const Alert = () => {
    const context  = useContext(noteContext);
    const {alerts} = context;
    return (
        <div>
            <div className="alert alert-info" role="alert">
                {alerts}
            </div>
        </div>
    )
}

export default Alert