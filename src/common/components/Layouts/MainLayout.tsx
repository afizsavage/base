import React from 'react';
import {Box} from "@mui/system";
import {Outlet} from 'react-router-dom';

export default function MainLayout() {
    return (
        <Box>
            <Outlet/>
        </Box>
    );
}
