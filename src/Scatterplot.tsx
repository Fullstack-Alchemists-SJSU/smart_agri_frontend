import React from "react"
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Label,
} from "recharts"
import {Feed} from "./useThingSpeak"

const ScatterWithTrendLine = ({feeds}: {feeds: Feed[]}) => {
	const data = feeds.map((feed) => ({
		temperature: parseFloat(feed.field1),
		moisture: parseFloat(feed.field2),
	}))

	// A simple trend line calculation (y = mx + b)
	const trendLine = (data: {temperature: number; moisture: number}[]) => {
		let sumX = 0,
			sumY = 0,
			sumXY = 0,
			sumX2 = 0
		const n = data.length
		data.forEach((d) => {
			sumX += d.temperature
			sumY += d.moisture
			sumXY += d.temperature * d.moisture
			sumX2 += d.temperature * d.temperature
		})

		const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
		const intercept = (sumY - slope * sumX) / n

		return data.map((d) => ({
			temperature: d.temperature,
			trend: slope * d.temperature + intercept,
		}))
	}

	const trendData = trendLine(data)

	return (
		<div className='chart-container'>
			<h2>Temperature vs Moisture Scatter Plot with Trend Line</h2>
			<ResponsiveContainer width='100%' height={400}>
				<ScatterChart>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis
						type='number'
						dataKey='temperature'
						name='Temperature (°C)'
						unit='°C'>
						<Label
							value='Temperature (°C)'
							position='insideBottom'
						/>
					</XAxis>
					<YAxis
						type='number'
						dataKey='moisture'
						name='Moisture (%)'
						unit='%'
					/>
					<Tooltip cursor={{strokeDasharray: "3 3"}} />
					<Scatter
						name='Temp vs Moisture'
						data={data}
						fill='#8884d8'
					/>
					<Scatter
						name='Trend Line'
						data={trendData}
						line
						fill='#82ca9d'
					/>
				</ScatterChart>
			</ResponsiveContainer>
		</div>
	)
}

export default ScatterWithTrendLine
