import { M3eFab } from '@m3e/react/fab'
import { M3eFormField } from '@m3e/react/form-field'
import { M3eHeading } from '@m3e/react/heading'
import { M3eIcon } from '@m3e/react/icon'
import { M3eOption } from '@m3e/react/option'
import { M3eSelect } from '@m3e/react/select'
import { M3eSlider, M3eSliderThumb } from '@m3e/react/slider'
import { useProxy } from 'valtio/utils'

import { metronomeDerivedState, metronomeState } from '../utils/metronome.ts'
import { StepWidget } from './StepWidget.tsx'

export const Metronome = () => {
    const metronome = useProxy(metronomeState)
    const metronomeDerived = useProxy(metronomeDerivedState)

    return (
        <div
            css={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}
        >
            <div css={{ display: 'flex', gap: '16px' }}>
                <M3eSlider
                    css={{ display: 'block', flexGrow: '1' }}
                    style={{ display: 'block' }}
                    min={40}
                    max={300}
                    step={1}
                >
                    <M3eSliderThumb
                        value={metronome.newTempo}
                        onInput={(e) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            metronome.newTempo = (e.target! as any).value
                        }}
                    />
                </M3eSlider>
                <div
                    css={{
                        textAlign: 'center'
                    }}
                >
                    <M3eHeading variant={'label'} size={'large'}>{'Tempo'}</M3eHeading>
                    <div>{metronome.newTempo}</div>
                </div>
            </div>
            <M3eFormField>
                <label slot={'label'}>{'Beats per measure'}</label>
                <M3eSelect
                    onChange={(e) => {
                        // console.log('+', Number.parseInt((e.target! as any).value))
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        metronome.newBeatsPerMeasure = Number.parseInt((e.target! as any).value)
                        if (!metronome.isPlaying) metronome.currentBeatsPerMeasure = metronome.newBeatsPerMeasure
                    }}
                >
                    <M3eOption value={'2'} selected={metronome.newBeatsPerMeasure === 2}>{'2'}</M3eOption>
                    <M3eOption value={'3'} selected={metronome.newBeatsPerMeasure === 3}>{'3'}</M3eOption>
                    <M3eOption value={'4'} selected={metronome.newBeatsPerMeasure === 4}>{'4'}</M3eOption>
                    <M3eOption value={'5'} selected={metronome.newBeatsPerMeasure === 5}>{'5'}</M3eOption>
                    <M3eOption value={'6'} selected={metronome.newBeatsPerMeasure === 6}>{'6'}</M3eOption>
                    <M3eOption value={'7'} selected={metronome.newBeatsPerMeasure === 7}>{'7'}</M3eOption>
                    <M3eOption value={'8'} selected={metronome.newBeatsPerMeasure === 8}>{'8'}</M3eOption>
                </M3eSelect>
            </M3eFormField>
            <M3eFormField>
                <label slot={'label'}>{'Subdivision'}</label>
                <M3eSelect
                    onChange={(e) => {
                        // console.log(Number.parseInt((e.target! as any).value))
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        metronome.newSubdivision = Number.parseInt((e.target! as any).value)
                        if (!metronome.isPlaying) metronome.currentSubdivision = metronome.newSubdivision
                    }}
                >
                    <M3eOption value={'1'} selected={metronome.newSubdivision === 1}>{'1'}</M3eOption>
                    <M3eOption value={'2'} selected={metronome.newSubdivision === 2}>{'2'}</M3eOption>
                    <M3eOption value={'3'} selected={metronome.newSubdivision === 3}>{'3'}</M3eOption>
                    <M3eOption value={'4'} selected={metronome.newSubdivision === 4}>{'4'}</M3eOption>
                </M3eSelect>
            </M3eFormField>
            <div
                css={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}
            >
                {Array(metronome.currentBeatsPerMeasure).fill(null).map((_, i) => (
                    <div css={{ width: '5rem', height: '5rem' }}>
                        <StepWidget
                            key={i}
                            substep={
                                metronome.isPlaying ? metronomeDerived.prevSubbeat : -1
                            }
                            substepsCount={metronome.currentSubdivision}
                            step={i}
                        />
                    </div>
                ))}
            </div>
            <M3eFab
                css={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
                variant={'primary'}
                onClick={() => metronome.isPlaying = !metronome.isPlaying}
            >
                <M3eIcon name={metronome.isPlaying ? 'stop' : 'play_arrow'} />
            </M3eFab>
        </div>
    )
}
