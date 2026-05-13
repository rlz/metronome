import PlayArrow from '@mui/icons-material/PlayArrow'
import Stop from '@mui/icons-material/Stop'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useProxy } from 'valtio/utils'

import { getMetronomeState } from '../utils/metronome.ts'
import { ConstTempo } from './ConstTempo.tsx'

export function TempoPanel() {
    const metronome = useProxy(getMetronomeState())
    const theme = useTheme()
    const small = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Paper elevation={3} sx={{ p: 1, display: 'flex', gap: 1, flexDirection: 'column' }}>
            <Typography variant={small ? 'h6' : 'h5'}>{'Tempo'}</Typography>
            <Tabs centered value={metronome.autoTempo ? 1 : 0} onChange={(_, v) => metronome.autoTempo = v === 1}>
                <Tab value={0} label={'Constant'} />
                <Tab value={1} label={'Auto'} />
            </Tabs>
            <Paper variant={'outlined'} sx={{ height: '70%', p: 1 }}>
                {
                    metronome.autoTempo
                        ? <Box sx={{ flex: '1 0 0' }}>{'TBD'}</Box>
                        : <ConstTempo sx={{ flex: '1 0 0' }} />
                }
            </Paper>
            <Button
                sx={{ flex: '1 0 0' }}
                variant={'contained'}
                onClick={() => metronome.isPlaying = !metronome.isPlaying}
            >
                {metronome.isPlaying ? <Stop sx={{ fontSize: small ? '2rem' : '5rem' }} /> : <PlayArrow sx={{ fontSize: small ? '2rem' : '5rem' }} /> }
            </Button>
        </Paper>
    )
}
