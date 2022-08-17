import React from 'react';
import {Box} from "@mui/system";
import MonimeLogo from "../Applogo";

export default function CardShortLayout(props: {
    children: React.ReactNode
}) {
    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            flexDirection: 'row',
        }}>
            <Box sx={{
                height: '80%',
                width: {
                    sx: '100%',
                    md: '70%',
                },
                margin: 'auto',
                minWidth: 380,
                maxWidth: 422,
                maxHeight: 480,
                borderRadius: '8px',
                backgroundColor: '#fff',
            }}>
                <Box sx={{p: 3, my: 1, height: '100%'}}>
                    <MonimeLogo/>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                    }}>
                        {props.children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
