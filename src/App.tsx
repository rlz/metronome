import { M3eTheme } from '@m3e/react/theme'
import { DesignToken } from '@m3e/web/core'

import { Metronome } from './components/Metronome.tsx'

function App() {
    return (
        <M3eTheme color={'#8f4c38'} scheme={'auto'} strongFocus>
            <div css={{
                height: '100vh',
                backgroundColor: DesignToken.color.surface.cssText,
                color: DesignToken.color.onSurface.cssText
            }}
            >
                <Metronome />
            </div>
        </M3eTheme>
    )
}

export default App
