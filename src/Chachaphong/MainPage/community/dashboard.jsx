import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

export default function Dashboard() {
    return (
        <React.Fragment>
            <CssBaseline />
            <div>Dashboard</div>
            <a href="/community">
                <button>Community</button>
            </a>
        </React.Fragment>
    );
}