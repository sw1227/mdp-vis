import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { calculateHitProbability, EnvironmentConfig } from '../logics/hittingEnvironment';

export const HittingProbabilities = ({ width, envConfig }: {
  width: number,
  envConfig: EnvironmentConfig,
}) => {
  const targetNumber = 5;
  const data = [...Array(9)].map((_, i) => {
    return calculateHitProbability({ width: 3, height: 4, sigma: 3 }, targetNumber, i);
  });

  const height = width * (envConfig.height / envConfig.width);

  const xScale = d3Scale.scaleBand([0, 1, 2], [0, width]).paddingOuter(0.1);
  const yScale = d3Scale.scaleBand([0, 1, 2], [0, height]).paddingOuter(0.1);

  return (
    <div>
      <svg width={width} height={height}>
        {data.map((d, i) => {
          const x = i % 3;
          const y = Math.floor(i / 3);
          return (
            <g
              transform={`translate(
                ${(xScale(x) ?? 0) + (xScale.bandwidth() / 2)},
                ${(yScale(y) ?? 0) + (yScale.bandwidth() / 2)}
              )`}
            >
              <rect
                key={i}
                x={-xScale.bandwidth() / 2}
                y={-yScale.bandwidth() / 2}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                fill={d3ScaleChromatic.interpolateViridis(d * 4)}
                stroke={i === targetNumber ? 'red' : 'none'}
                strokeWidth={i === targetNumber ? 2 : 0}
              />
              <text
                x={0}
                y={18}
                fill='white'
                textAnchor='middle'
                dominantBaseline='hunging'
                fontSize='18px'
              >
                P={d.toFixed(3)}
              </text>
              <text
                x={0}
                y={0}
                fill='white'
                textAnchor='middle'
                dominantBaseline='baseline'
                fontSize='36px'
              >
                {i}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};