import { PlayArrow, Stop } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import { useProxy } from 'valtio/utils'

import { metronomeDerivedState, metronomeState } from '../utils/metronome.ts'
import { StepWidget } from './StepWidget.tsx'
import { TempoWidget } from './TempoWidget.tsx'

export const Metronome = () => {
    const metronome = useProxy(metronomeState)
    const metronomeDerived = useProxy(metronomeDerivedState)
    const theme = useTheme()

    return (
        <Paper elevation={3} sx={{ p: 1, gap: 1, display: 'flex', flexDirection: 'column' }}>
            <TempoWidget />

            <FormControl>
                <InputLabel id={'bpmeasure'}>{'Beats per measure'}</InputLabel>
                <Select
                    labelId={'bpmeasure'}
                    value={metronome.newBeatsPerMeasure}
                    label={'Beats per measure'}
                    onChange={(e) => {
                        metronome.newBeatsPerMeasure = e.target.value
                        if (!metronome.isPlaying) metronome.currentBeatsPerMeasure = e.target.value
                    }}
                >
                    <MenuItem value={2}>{'2'}</MenuItem>
                    <MenuItem value={3}>{'3'}</MenuItem>
                    <MenuItem value={4}>{'4'}</MenuItem>
                    <MenuItem value={5}>{'5'}</MenuItem>
                    <MenuItem value={6}>{'6'}</MenuItem>
                    <MenuItem value={7}>{'7'}</MenuItem>
                    <MenuItem value={8}>{'8'}</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id={'subdivision'}>{'Subdivision'}</InputLabel>
                <Select
                    labelId={'subdivision'}
                    value={metronome.newSubdivision}
                    label={'Subdivision'}
                    onChange={(e) => {
                        metronome.newSubdivision = e.target.value
                        if (!metronome.isPlaying) metronome.currentSubdivision = e.target.value
                    }}
                >
                    <MenuItem value={1}>{'1'}</MenuItem>
                    <MenuItem value={2}>{'2'}</MenuItem>
                    <MenuItem value={3}>{'3'}</MenuItem>
                    <MenuItem value={4}>{'4'}</MenuItem>
                </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                {Array(Math.min(metronome.currentBeatsPerMeasure, 4)).fill(null).map((_, i) => (
                    <Box sx={{ flex: '0 1 6rem', maxWidth: '6rem' }}>
                        <StepWidget
                            key={i}
                            substep={
                                metronome.isPlaying ? metronomeDerived.prevSubbeat : -1
                            }
                            substepsCount={metronome.currentSubdivision}
                            step={i}
                        />
                    </Box>
                ))}
            </Box>
            {
                metronome.currentBeatsPerMeasure > 4
                && (
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        {Array(Math.min(metronome.currentBeatsPerMeasure - 4, 4)).fill(null).map((_, i) => (
                            <Box sx={{ flex: '0 1 6rem', maxWidth: '6rem' }}>
                                <StepWidget
                                    key={i}
                                    substep={
                                        metronome.isPlaying ? metronomeDerived.prevSubbeat : -1
                                    }
                                    substepsCount={metronome.currentSubdivision}
                                    step={i + 4}
                                />
                            </Box>
                        ))}
                    </Box>
                )
            }

            <Fab
                sx={{ position: 'absolute', bottom: theme.spacing(1), right: theme.spacing(1) }}
                onClick={() => metronome.isPlaying = !metronome.isPlaying}
            >
                {metronome.isPlaying ? <Stop /> : <PlayArrow /> }
            </Fab>
        </Paper>
    )
}
