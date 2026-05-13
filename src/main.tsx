import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Metronome } from './components/Metronome.tsx'

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const theme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            primary: {
                main: '#dd6a04'
            },
            secondary: {
                main: '#0478dd'
            }
        },
        typography: {
            fontFamily: '"Roboto"'
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Metronome />
        </ThemeProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
