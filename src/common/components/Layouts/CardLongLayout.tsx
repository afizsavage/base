import React from 'react';
import {Box} from "@mui/system";
import {Grid, Typography} from "@mui/material";
import MonimeLogo from "../Applogo";

const marketingPromises: {
    heading: string
    message: string
    icon: string
}[] = [
    {
        heading: 'Fast and secure',
        icon: '/images/icons/market_fastplay.svg',
        message: "With Monime Space, you get a one click experience that allows you to effortlessly complete payments.",
    },
    {
        heading: 'One account for a whole network',
        icon: '/images/icons/market_account.svg',
        message: "No more managing separate accounts. You can use your Monime account across all networks.",
    },
    {
        heading: 'Do business with peace of mind',
        icon: '/images/icons/market_security.svg',
        message: "We encrypt and store your information in compliance with banking regulations.",
    },
]

const MarketingLogo = (props: { alt: string, src: string }) => {
    return (
        <Box sx={{
            width: '35px',
            height: '35px',
            display: 'flex',
            borderRadius: '100%',
            backgroundColor: '#fff',
            justifyContent: 'center',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        }}>
            {/* eslint-disable-next-line */}
            <img width={14.9} src={props.src} alt={props.alt}/>
        </Box>
    )
}

const MarketingPromise = (props: { promise: (typeof marketingPromises[0]) }) => {
    return <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <MarketingLogo src={props.promise.icon} alt={props.promise.heading}/>
        <Box sx={{flex: 1, ml: 2, marginBottom: '40px'}}>
            <Typography variant={"h4"} sx={{
                fontSize: "18px",
                lineHeight: "22px",
                mb: 0.7
            }}>{props.promise.heading}</Typography>
            <Typography variant={"body2"}>
                {props.promise.message}
            </Typography>
        </Box>
    </Box>
}

export default function CardLongLayout(props: {
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
                minWidth: 900,
                maxWidth: 964,
                maxHeight: 562,
                borderRadius: '8px',
                backgroundColor: '#fff',
            }}>
                <Grid container sx={{height: '100%'}}>
                    <Grid item xs={7} sx={{
                        p: 2.5,
                        height: '100%',
                        borderRadius: '8px',
                        backgroundColor: '#E0EDFF',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <MonimeLogo/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%',
                            marginLeft: '80px',
                            marginRight: '80px',
                        }}>
                            {marketingPromises?.map((promise, idx) => {
                                return <MarketingPromise key={idx} promise={promise}/>;
                            })}
                        </Box>
                    </Grid>
                    <Grid item xs={5} sx={{position: 'relative'}}>
                        <Box sx={{
                            p: 2.5,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                            {props.children}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
