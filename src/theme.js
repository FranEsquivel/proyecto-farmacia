import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',

        primary: {
            main: '#1976D2',
            light: '#42A5F5',
            dark: '#1565C0'
        },

        secondary: {
            main: '#26A69A',
            light: '#4DB6AC',
            dark: '#00897B'
        },

        success: {
            main: '#00A896',
            light: '#4DCDBF',
            dark: '#008F7A'
        },

        info: {
            main: '#7E57C2',
            light: '#9575CD',
            dark: '#673AB7'
        },

        warning: {
            main: '#ED6C02'
        },

        error: {
            main: '#D32F2F'
        },

        background: {
            default: '#F5F8FA',
            paper: '#FFFFFF'
        },

        text: {
            primary: '#1F2937',
            secondary: '#667085'
        },

        divider: '#E4EAF0'
    },

    typography: {
        fontFamily: 'Inter, Roboto, Arial, sans-serif',

        h4: {
            fontWeight: 700
        },

        h5: {
            fontWeight: 700
        },

        h6: {
            fontWeight: 600
        },

        button: {
            textTransform: 'none',
            fontWeight: 600
        }
    },

    shape: {
        borderRadius: 10
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#F5F8FA',
                    color: '#1F2937'
                }
            }
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#FFFFFF'
                }
            }
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E4EAF0',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(31, 41, 55, 0.05)'
                }
            }
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 16px'
                }
            }
        },

        MuiTextField: {
            defaultProps: {
                variant: 'outlined'
            },

            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8
                    }
                }
            }
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: '#E4EAF0'
                },

                head: {
                    fontWeight: 700,
                    color: '#667085'
                }
            }
        }
    }
});

export default theme;