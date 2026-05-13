import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Slider from '@mui/material/Slider'
import { SxProps } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useProxy } from 'valtio/utils'

import { getMetronomeState } from '../utils/metronome.ts'

export function ConstTempo({ sx }: { sx: SxProps }) {
    const m = useProxy(getMetronomeState())
    const theme = useTheme()
    const small = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: small ? 2 : 6,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                ...sx
            }}
        >
            <ButtonGroup size={small ? 'medium' : 'large'}>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    onClick={() => m.newTempo--}
                >
                    <Remove />
                </Button>
                <Button sx={{ width: '7rem' }} color={'secondary'}>
                    {m.newTempo}
                </Button>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    onClick={() => m.newTempo++}
                >
                    <Add />
                </Button>
            </ButtonGroup>
            <Slider
                sx={{
                    '& .MuiSlider-rail': {
                        height: small ? '1rem' : '1.5rem',
                        borderRadius: small ? '0.5rem' : '1rem'
                    },
                    '& .MuiSlider-track': {
                        height: small ? '1rem' : '1.5rem',
                        borderRadius: small ? '0.5rem 0 0 0.5rem' : '1rem 0 0 1rem'
                    },
                    '& .MuiSlider-thumb': {
                        borderRadius: small ? '0.5rem' : '1rem',
                        width: small ? '0.4rem' : '0.3rem',
                        height: small ? '1.5rem' : '2.5rem'
                    }
                }}
                color={'secondary'}
                min={40}
                max={300}
                step={1}
                value={m.newTempo}
                onChange={(_, v) => m.newTempo = v}
            />
        </Box>
    )
}
