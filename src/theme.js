import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',

        primary: {
            main: '#2E7D32',
            light: '#4CAF50',
            dark: '#1B5E20',
            contrastText: '#FFFFFF'
        },

        secondary: {
            main: '#00897B',
            light: '#4DB6AC',
            dark: '#00695C',
            contrastText: '#FFFFFF'
        },

        success: {
            main: '#43A047',
            light: '#66BB6A',
            dark: '#2E7D32',
            contrastText: '#FFFFFF'
        },

        info: {
            main: '#1976D2',
            light: '#42A5F5',
            dark: '#1565C0',
            contrastText: '#FFFFFF'
        },

        warning: {
            main: '#ED6C02',
            light: '#FF9800',
            dark: '#E65100',
            contrastText: '#FFFFFF'
        },

        error: {
            main: '#D32F2F',
            light: '#EF5350',
            dark: '#C62828',
            contrastText: '#FFFFFF'
        },

        background: {
            default: '#E8F3EA',
            paper: '#FFFFFF'
        },

        text: {
            primary: '#1F2D24',
            secondary: '#5F6F65'
        },

        divider: '#D5E3D8'
    },

    typography: {
        fontFamily: 'Inter, Roboto, Arial, sans-serif',

        h4: {
            fontWeight: 700,
            letterSpacing: '-0.5px'
        },

        h5: {
            fontWeight: 700,
            letterSpacing: '-0.3px'
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
        borderRadius: 12
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    overflowY: 'scroll',
                    width: '100%',
                    overflowX: 'hidden'
                },

                body: {
                    backgroundColor: '#E8F3EA',
                    color: '#1F2D24',
                    width: '100%',
                    overflowX: 'hidden'
                },

                '#root': {
                    width: '100%',
                    minWidth: 0
                }
            }
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5E3D8',
                    boxShadow:
                        '0 4px 14px rgba(31, 70, 42, 0.06)'
                }
            }
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5E3D8',
                    borderRadius: 14,
                    boxShadow:
                        '0 4px 14px rgba(31, 70, 42, 0.06)',
                    transition:
                        'transform 0.2s ease, box-shadow 0.2s ease',

                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow:
                            '0 8px 22px rgba(31, 70, 42, 0.09)'
                    }
                }
            }
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 9,
                    padding: '9px 17px',
                    fontWeight: 600
                },

                containedPrimary: {
                    boxShadow:
                        '0 5px 12px rgba(46, 125, 50, 0.18)',

                    '&:hover': {
                        boxShadow:
                            '0 7px 16px rgba(46, 125, 50, 0.25)'
                    }
                },

                containedSecondary: {
                    boxShadow:
                        '0 5px 12px rgba(0, 137, 123, 0.18)',

                    '&:hover': {
                        boxShadow:
                            '0 7px 16px rgba(0, 137, 123, 0.25)'
                    }
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
                        borderRadius: 9,
                        backgroundColor: '#FFFFFF',

                        '&:hover fieldset': {
                            borderColor: '#81C784'
                        },

                        '&.Mui-focused fieldset': {
                            borderWidth: 2
                        },
                        '& .MuiOutlinedInput-input': {
                        caretColor: '#1F2D24'
                        }
                    }
                }
            }
        },

        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 14
                }
            }
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: '#D5E3D8',
                    padding: '14px 16px'
                },

                head: {
                    fontWeight: 700,
                    color: '#52635A',
                    backgroundColor: '#F1F7F2'
                }
            }
        },

        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#F5FAF6'
                    }
                }
            }
        },

        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                    border: '1px solid #D5E3D8',
                    boxShadow:
                        '0 18px 45px rgba(31, 70, 42, 0.15)'
                }
            }
        },

        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontWeight: 700
                }
            }
        }
    }
});

export default theme;