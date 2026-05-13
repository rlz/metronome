import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

import { BeatsPanel } from './BeatsPanel.tsx'
import { TempoPanel } from './TempoPanel.tsx'

export const Metronome = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                p: 1,
                gap: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                [theme.breakpoints.down('md')]: {
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: '1fr 1fr'
                },
                width: '100vw',
                height: '100vh',
                maxWidth: '100rem',
                maxHeight: '70rem',
                margin: '0 auto'
            }}
        >
            <TempoPanel />
            <BeatsPanel />
        </Box>
    )
}
