import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

export const StateGraph = ({ width }: { width: number }) => {
  // stat[i][j]: value of the j-th bit of the state corresponding to i in decimal
  const states = [...Array(2 ** 9)].map((_, i) => {
    return i.toString(2).padStart(9, '0').split('').reverse().map(d => parseInt(d));
  });

  // Calculate humming distance between two states
  const hummingDistance = (a: number[], b: number[]): number => {
    return a.map((d, i): number => d !== b[i] ? 1 : 0).reduce((acc, val) => acc + val);
  };

  // Drawing parameters
  const height = width * 1.5;
  const margin = { width: width * 0.1, height: height * 0.1 };
  const xScale = d3Scale.scaleLinear([0, 9], [margin.width, width - margin.width]);
  const yScale = d3Scale.scaleLinear([0, states.length], [margin.height, height - margin.height]);

  return (
    <div>
      <svg width={width} height={height}>
        {states.map((state, idx) => {
          const hummingDistanceFromOrigin = hummingDistance(state, states[0]);
          const x = xScale(hummingDistanceFromOrigin);
          const y = yScale(idx);
          return (
            <g>
              {[...Array(9)].map((_, adjIdx) => {
                if (state[adjIdx] === 1) {
                  return <></>;
                } else {
                  const adjacentState = state.map((d, i) => i === adjIdx ? 1 : d);
                  const adjacentStateInDecimal = parseInt(adjacentState.reverse().join(''), 2);
                  return (
                    <line
                      x1={x}
                      y1={y}
                      x2={xScale(hummingDistanceFromOrigin + 1)}
                      y2={yScale(adjacentStateInDecimal)}
                      stroke='#ccc'
                      strokeWidth={1}
                      strokeOpacity={0.5}
                    />
                  );
                }
              })}
              <circle
                cx={x}
                cy={y}
                r={2}
                fill={d3ScaleChromatic.schemeCategory10[hummingDistanceFromOrigin]}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
