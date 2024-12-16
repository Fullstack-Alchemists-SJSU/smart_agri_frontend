import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import useThingSpeakData from './useThingSpeak';

jest.mock('./useThingSpeak');

test('renders dashboard with charts', () => {
  (useThingSpeakData as jest.Mock).mockReturnValue([
    { created_at: '2023-01-01T00:00:00Z', field1: '25', field2: '75' },
  ]);

  render(<App />);

  expect(screen.getByText('ThingSpeak Sensor Data Analytics')).toBeInTheDocument();
  expect(screen.getByText('Current Temperature')).toBeInTheDocument();
  expect(screen.getByText('Current Moisture')).toBeInTheDocument();
  expect(screen.getByText('Statistics')).toBeInTheDocument();
  expect(screen.getByText('Temperature Over Time')).toBeInTheDocument();
  expect(screen.getByText('Moisture Over Time')).toBeInTheDocument();
});