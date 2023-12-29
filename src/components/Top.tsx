import { FC, useState } from 'react';
import {
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';
import { HittingProbabilities } from './HittingProbabilities';
import { EnvironmentConfig } from '../logics/hittingEnvironment';
import { StateGraph } from './StateGraph';

export const Top: FC = () => {
  const [envConfig, setEnvConfig] = useState<EnvironmentConfig>({
    width: 3,
    height: 4,
    sigma: 3,
  });

  return (
    <VStack spacing={6} marginTop={12}>
      <Card w="100%">
        <CardHeader>
          <Heading size='md'>Hitting Probabilities</Heading>
        </CardHeader>
        <CardBody>
          <VStack w='100%' spacing={6}>
            <HStack w='100%'>
              <p>Width: </p>
              <ConfigValueSlider value={envConfig.width} onChangeValue={width => setEnvConfig({ ...envConfig, width })} />
            </HStack>
            <HStack w='100%'>
              <p>Height: </p>
              <ConfigValueSlider value={envConfig.height} onChangeValue={height => setEnvConfig({ ...envConfig, height })} />
            </HStack>
            <HStack w='100%'>
              <p>Stddev: </p>
              <ConfigValueSlider value={envConfig.sigma} onChangeValue={sigma => setEnvConfig({ ...envConfig, sigma })} />
            </HStack>
            <HittingProbabilities width={60 * envConfig.width} envConfig={envConfig} />
          </VStack>
        </CardBody>
      </Card>

      <Card w="100%">
        <CardHeader>
          <Heading size='md'>States</Heading>
        </CardHeader>
        <CardBody>
          <StateGraph width={500} />
        </CardBody>
      </Card>
    </VStack>
  );
};

const ConfigValueSlider = ({ value, onChangeValue }: { value: number, onChangeValue: (val: number) => void }) => {
  return (
    <Slider
      min={1}
      max={10}
      step={1}
      onChange={onChangeValue}
      value={value}
    >
      <SliderMark
        value={value}
        textAlign='center'
        bg='blue.500'
        color='white'
        mt='-10'
        ml='-4'
        w='10'
      >
        {value}
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};
