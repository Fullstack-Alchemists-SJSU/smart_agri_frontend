import React from 'react';
import { render } from '@testing-library/react';
import Gauge from './TemperatureGauge';

test('displays the correct temperature', () => {
  const { getByText } = render(<Gauge temp={25} />);
  expect(getByText('25.0°C')).toBeInTheDocument();
});