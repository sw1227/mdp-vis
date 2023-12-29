import { FC } from 'react';
import { VStack } from '@chakra-ui/react';
import { HittingProbabilities } from './HittingProbabilities';
import { EnvironmentConfig } from '../logics/hittingEnvironment';

export const Top: FC = () => {
  const ENV_CONFIG: EnvironmentConfig = {
    width: 3,
    height: 4,
    sigma: 3,
  };

  return (
    <VStack>
      <HittingProbabilities width={500} envConfig={ENV_CONFIG} />
    </VStack>
  );
};
