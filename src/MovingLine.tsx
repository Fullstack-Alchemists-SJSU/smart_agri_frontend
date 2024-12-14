import React from "react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
	Label,
} from "recharts"
import {Feed} from "./useThingSpeak"

// Calculate moving average for a given period
const calculateMovingAverage = (data: number[], period: number) => {
	let averages = []
	for (let i = 0; i < data.length; i++) {
		if (i < period - 1) {
			averages.push(null) // Not enough data points yet
		} else {
			const sum = data
				.slice(i - period + 1, i + 1)
				.reduce((acc, val) => acc + val, 0)
			averages.push(sum / period)
		}
	}
	return averages
}

const MovingAverageChart = ({feeds}: {feeds: Feed[]}) => {
	const data = feeds.map((feed) => ({
		time: new Date(feed.created_at).toLocaleTimeString(),
		temperature: parseFloat(feed.field1),
		moisture: parseFloat(feed.field2),
	}))

	// Calculate the 3-point moving average
	const temperatureMA = calculateMovingAverage(
		data.map((d) => d.temperature),
		3
	)
	const moistureMA = calculateMovingAverage(
		data.map((d) => d.moisture),
		3
	)

	const chartData = data.map((d, index) => ({
		time: d.time,
		temperature: d.temperature,
		moisture: d.moisture,
		temperatureMA: temperatureMA[index],
		moistureMA: moistureMA[index],
	}))

	return (
		<div className='chart-container'>
			<h2>Temperature and Moisture with Moving Average</h2>
			<ResponsiveContainer width='100%' height={400}>
				<LineChart data={chartData}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='time'>
						<Label value='Time' position='insideBottom' />
					</XAxis>
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type='monotone'
						dataKey='temperatureMA'
						stroke='#ff7300'
						name='Temperature MA'
					/>
					<Line
						type='monotone'
						dataKey='moistureMA'
						stroke='#387908'
						name='Moisture MA'
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default MovingAverageChart
