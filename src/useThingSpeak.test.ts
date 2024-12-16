import { renderHook } from '@testing-library/react-hooks';
import useThingSpeakData from '../src/useThingSpeak';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

test('fetches data from ThingSpeak', async () => {
  const mockData = {
    feeds: [
      { created_at: '2023-01-01T00:00:00Z', field1: '25', field2: '75' },
    ],
  };
  mock.onGet('https://api.thingspeak.com/channels/2669427/feeds.json?results=20').reply(200, mockData);

  const { result, waitForNextUpdate } = renderHook(() => useThingSpeakData());

  await waitForNextUpdate();

  expect(result.current).toEqual(mockData.feeds);
});