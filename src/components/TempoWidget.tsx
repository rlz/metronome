import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { useProxy } from 'valtio/utils'

import { metronomeState } from '../utils/metronome'

export function TempoWidget() {
    const metronome = useProxy(metronomeState)

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Slider
                min={40}
                max={300}
                step={1}
                value={metronome.newTempo}
                onChange={(_, v) => metronome.newTempo = v}
            />
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant={'h4'}>{'Tempo'}</Typography>
                <Typography variant={'body1'}>{metronome.newTempo}</Typography>
            </Box>
        </Box>
    )
}
