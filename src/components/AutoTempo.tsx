import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useProxy } from 'valtio/utils'

import { getMetronomeState } from '../utils/metronome.ts'

export function AutoTempo() {
    const m = useProxy(getMetronomeState())

    return (
        <Stack>
            <Box>
                {'AutoTempo:'}
                {m.autoTempo}
            </Box>
            <Box>
                {'Start Tempo:'}
                {m.startTempo}
            </Box>
            <Box>
                {'Step:'}
                {m.step}
            </Box>
            <Box>
                {'Step After:'}
                {m.stepAfter}
            </Box>
            <Box>
                {'Steps Count:'}
                {m.stepsCount}
            </Box>
            <Box>
                {'Progress:'}
                {m.progress}
            </Box>
            <Box>
                {'New Tempo:'}
                {m.newTempo}
            </Box>
            <Box>
                {'Current Tempo:'}
                {m.currentTempo}
            </Box>
        </Stack>
    )
}
