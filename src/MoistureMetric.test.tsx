import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Metric from './MoistureMetric';

test('displays the correct moisture percentage', () => {
  const { getByText } = render(<Metric moisture={75} />);
  expect(getByText('75.0%')).toBeInTheDocument();
});