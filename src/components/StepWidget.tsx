import { DesignToken } from '@m3e/web/core'

interface Props {
    substepsCount: number
    substep: number
    step: number
}

export function StepWidget({ step: step, substep: substep, substepsCount: substepsCount }: Props) {
    const gap = 24
    const r1 = 80
    const r2 = 100

    const r3 = (r2 - r1) / 2
    const sin = (deg: number) => -Math.sin(Math.PI * (90 - deg) / 180)
    const cos = (deg: number) => Math.cos(Math.PI * (90 - deg) / 180)

    return (
        <svg viewBox={'-100 -100 200 200'}>
            {
                substepsCount === 1
                    ? [
                            <mask id={'xxx'} type={'luminance'}>
                                <rect fill={'white'} x={-100} y={-100} width={200} height={200} />
                                <circle fill={'black'} r={r1} />
                            </mask>,
                            <circle
                                fill={step * substepsCount <= substep ? DesignToken.color.primaryContainer.cssText : DesignToken.color.surfaceContainer.cssText}
                                r={r2}
                                mask={'url(#xxx)'}
                            />
                        ]
                    : Array(substepsCount).fill(null).map((_, i) => {
                            const a1 = 360 * i / substepsCount + gap / 2
                            const a2 = 360 * (i + 1) / substepsCount - gap / 2
                            return (
                                <path
                                    fill={step * substepsCount + i <= substep ? DesignToken.color.primaryContainer.cssText : DesignToken.color.surfaceContainer.cssText}
                                    d={[
                                        `M ${r2 * cos(a1)} ${r2 * sin(a1)}`,
                                        `A ${r3} ${r3} 0 0 0 ${r1 * cos(a1)} ${r1 * sin(a1)}`,
                                        `A 80 80 0 0 1 ${r1 * cos(a2)} ${r1 * sin(a2)}`,
                                        `A ${r3} ${r3} 0 0 0 ${r2 * cos(a2)} ${r2 * sin(a2)}`,
                                        `A ${r2} ${r2} 0 0 0 ${r2 * cos(a1)} ${r2 * sin(a1)}`
                                    ].join(' ')}
                                />
                            )
                        })
            }
            <text
                fontSize={r2}
                fill={DesignToken.color.onSurface.cssText}
                alignmentBaseline={'central'}
                textAnchor={'middle'}
            >
                {step + 1}
            </text>
        </svg>
    )
}
