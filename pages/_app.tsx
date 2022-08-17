import {composeMuiTheme, nextReduxApp} from "@monime-lab/frontend-core/material";

composeMuiTheme(
    {
        shape: {
          borderRadius: 6,
        },
        palette: {
            background: {
                default: '#00204D',
            }
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        customPalette: {
            colors: {
                primaryMain: "#006CFF",
            },
        },
    },
    (_theme) => ({
        components: {
            MuiTypography: {
                styleOverrides: {
                    root: {
                        fontSize: "1.0625",
                        lineHeight: "1.9",
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        color: "#f9fffc",
                    },
                },
            },
        },
    })
);

export default nextReduxApp<any>({
        // add the reducers, enhancers and middlewares
        // you want to eagerly or statically configure
        reducers: {},
        enhancers: [],
        middlewares: []
    }, {
        core: {
            def: {
                name: 'space-alias-ui',
                logo: {
                    light: {
                        url: "/images/icons/logo.svg"
                    }
                },
            },
        }
    }
);
