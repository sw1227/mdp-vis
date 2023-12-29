import * as mathjs from 'mathjs';

// Size of each panel and sigma of normal distribution
export type EnvironmentConfig = {
  width: number,
  height: number,
  sigma: number,
};

// Create a CDF(x) of 1D normal distribution for the given mean and stddev
const createNormalCdf = (mean: number, std: number) => (x: number) => {
  return (1 + mathjs.erf((x - mean) / (std * Math.sqrt(2)))) / 2;
};

// Caluculate the probability of hitting the "hit" panel when aiming at the "target" panel
export const calculateHitProbability = (
  size: { width: number, height: number, sigma: number },
  target: number, // 0, 1, ..., 8
  hit: number, // 0, 1, ..., 8
): number => {
  // Aiming point is determined by "target"
  const aimingPoint = [
    size.width / 2 + size.width * (target % 3),
    size.height / 2 + size.height * Math.floor(target / 3)
  ];
  // Normal distribution around aiming point
  const xCdf = createNormalCdf(aimingPoint[0], size.sigma);
  const yCdf = createNormalCdf(aimingPoint[1], size.sigma);
  // x, y range of "hit" panel
  const xMin = size.width * (hit % 3);
  const xMax = xMin + size.width;
  const yMin = size.height * Math.floor(hit / 3);
  const yMax = yMin + size.height;
  // Probability is Px * Py (isotropic)
  return (xCdf(xMax) - xCdf(xMin)) * (yCdf(yMax) - yCdf(yMin));
};
