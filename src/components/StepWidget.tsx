import { useTheme } from '@mui/material'
import Color from 'colorjs.io'

interface Props {
    substepsCount: number
    currentSubstep: number
    step: number
    disabled: boolean
}

export function StepWidget({ step, currentSubstep, substepsCount, disabled }: Props) {
    const theme = useTheme()

    const gap = 35
    const r1 = 68
    const r2 = 97

    const r3 = (r2 - r1) / 2
    const sin = (deg: number) => -Math.sin(Math.PI * (90 - deg) / 180)
    const cos = (deg: number) => Math.cos(Math.PI * (90 - deg) / 180)

    const getColor = (substep: number) => {
        if (disabled) {
            return theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 400]
        }
        return step * substepsCount + substep <= currentSubstep
            ? theme.palette.secondary.main
            : new Color(theme.palette.secondary.light).set({ alpha: 0.38 }).toString()
    }

    return (
        <svg viewBox={'-100 -100 200 200'} css={{ display: 'block', height: '100%' }}>
            {
                substepsCount === 1
                    ? [
                            <mask id={'xxx'} type={'luminance'}>
                                <rect fill={'white'} x={-100} y={-100} width={200} height={200} />
                                <circle fill={'black'} r={r1} />
                            </mask>,
                            <circle
                                fill={getColor(0)}
                                r={r2}
                                mask={'url(#xxx)'}
                            />
                        ]
                    : Array(substepsCount).fill(null).map((_, i) => {
                            const a1 = 360 * i / substepsCount + gap / 2
                            const a2 = 360 * (i + 1) / substepsCount - gap / 2
                            return (
                                <path
                                    fill={getColor(i)}
                                    d={[
                                        `M ${r2 * cos(a1)} ${r2 * sin(a1)}`,
                                        `A ${r3} ${r3} 0 0 0 ${r1 * cos(a1)} ${r1 * sin(a1)}`,
                                        `A ${r1} ${r1} 0 0 1 ${r1 * cos(a2)} ${r1 * sin(a2)}`,
                                        `A ${r3} ${r3} 0 0 0 ${r2 * cos(a2)} ${r2 * sin(a2)}`,
                                        `A ${r2} ${r2} 0 0 0 ${r2 * cos(a1)} ${r2 * sin(a1)}`
                                    ].join(' ')}
                                />
                            )
                        })
            }
            <text
                fontSize={r2}
                fill={disabled ? theme.palette.text.disabled : theme.palette.secondary.main}
                alignmentBaseline={'central'}
                textAnchor={'middle'}
            >
                {step + 1}
            </text>
        </svg>
    )
}
