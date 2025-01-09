import React from 'react';
import { Link } from 'react-router-dom';

function DashboardPage() {
    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <p>You have successfully logged in!</p>
            <Link to="/">Logout</Link>
        </div>
    );
}

export default DashboardPage;
