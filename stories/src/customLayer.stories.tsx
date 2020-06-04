import * as React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, text} from '@storybook/addon-knobs'
import {Config, Plot, LASER} from '../../giraffe/src'

import {PlotContainer} from './helpers'
import {CPU} from './data/cpu'
import {singleStatTable} from './data/singleStatLayer'

storiesOf('Custom Layer', module)
  .addDecorator(withKnobs)
  .add('Highlighted Region', () => {
    const config: Config = {
      table: CPU,
      layers: [
        {
          type: 'scatter',
          x: '_time',
          y: '_value',
        },
        {
          type: 'custom',
          render: ({key, yScale}) => {
            return (
              <div
                key={key}
                style={{
                  width: '100%',
                  position: 'absolute',
                  top: `${yScale(20)}px`,
                  height: `${yScale(10) - yScale(20)}px`,
                  background: 'tomato',
                  opacity: 0.3,
                }}
              />
            )
          },
        },
      ],
    }

    return (
      <PlotContainer>
        <Plot config={config} />
      </PlotContainer>
    )
  })
  .add('Single Stat', () => {
    const decimalPlaces = Number(text('Decimal Places', '4'))
    const config: Config = {
      table: singleStatTable,
      showAxes: false,
      layers: [
        {
          type: 'single stat',
          prefix: '',
          suffix: '',
          decimalPlaces: {
            isEnforced: true,
            digits: decimalPlaces,
          },
          textColor: LASER,
        },
      ],
    }
    return (
      <PlotContainer>
        <Plot config={config} />
      </PlotContainer>
    )
  })
