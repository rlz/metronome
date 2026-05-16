import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useProxy } from 'valtio/utils'

import { getMetronomeDerivedState, getMetronomeState } from '../utils/metronome.ts'
import { StepWidget } from './StepWidget.tsx'

function SetSdvButton({ subdivision }: { subdivision: number }) {
    const m = useProxy(getMetronomeState())

    return (
        <Button
            variant={m.newSubdivision === subdivision ? 'contained' : 'outlined'}
            onClick={() => {
                m.newSubdivision = subdivision
                if (!m.isPlaying) m.currentSubdivision = subdivision
            }}
        >
            {subdivision}
        </Button>
    )
}

export function BeatsPanel() {
    const m = useProxy(getMetronomeState())
    const md = useProxy(getMetronomeDerivedState())
    const theme = useTheme()
    const small = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Paper elevation={3} sx={{ p: 1, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1, containerType: 'inline-size', containerName: 'beats_panel' }}>
            <Typography variant={small ? 'h6' : 'h5'} sx={{ width: '100%' }}>{'Beats'}</Typography>
            <Stack direction={'column'} sx={{ flex: '1 0 0', alignItems: 'center', justifyContent: 'center', gap: small ? 1 : 3 }}>
                <Typography variant={'h6'}>{'Subdivision'}</Typography>
                <ButtonGroup size={'large'} fullWidth color={'secondary'} sx={{ minWidth: '20rem' }}>
                    <SetSdvButton subdivision={1} />
                    <SetSdvButton subdivision={2} />
                    <SetSdvButton subdivision={3} />
                    <SetSdvButton subdivision={4} />
                </ButtonGroup>
            </Stack>
            <Typography variant={'h6'}>{'Beats per measure'}</Typography>
            <Box
                sx={{
                    flex: '1 0 8rem',
                    [theme.containerQueries('beats_panel').up('xs')]: {
                        maxHeight: `min(50cqw, calc(${theme.spacing(small ? 34 : 59)} / 2))`,
                        maxWidth: theme.spacing(small ? 35 : 60)
                    },
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: 1
                }}
            >
                {
                    Array(8).fill(null).map((_, i) => {
                        return (
                            <button
                                key={i}
                                css={
                                    {
                                        'padding': 0,
                                        'borderWidth': 0, 'borderRadius': theme.spacing(1),
                                        'backgroundColor': (
                                            m.currentBeatsPerMeasure === m.newBeatsPerMeasure
                                            || m.newBeatsPerMeasure !== i + 1
                                                ? 'transparent'
                                                : (theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300])
                                        ),
                                        'cursor': 'pointer',
                                        'WebkitTapHighlightColor': 'transparent',
                                        '@media(hover: hover) and (pointer: fine)': {
                                            '&:hover': {
                                                backgroundColor: (
                                                    m.currentBeatsPerMeasure === m.newBeatsPerMeasure
                                                    || m.newBeatsPerMeasure !== i + 1
                                                        ? (theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[100])
                                                        : (theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[100])
                                                )
                                            }
                                        }
                                    }
                                }
                                onClick={() => {
                                    m.newBeatsPerMeasure = i + 1
                                    if (!m.isPlaying) m.currentBeatsPerMeasure = i + 1
                                }}
                            >
                                <StepWidget
                                    currentSubstep={
                                        m.isPlaying ? md.prevSubbeat : -1
                                    }
                                    substepsCount={m.currentSubdivision}
                                    step={i}
                                    disabled={i >= m.currentBeatsPerMeasure}
                                />
                            </button>
                        )
                    })
                }
            </Box>
        </Paper>
    )
}
