import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import {Feed} from "./useThingSpeak"

const Charts = ({feeds}: {feeds: Feed[]}) => {
	return (
		<div className='chart-row'>
			<div className='chart-container'>
				<h2>Temperature Over Time</h2>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={feeds}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='created_at' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type='monotone'
							dataKey='field1'
							stroke='#8884d8'
							name='Temperature'
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className='chart-container'>
				<h2>Moisture Over Time</h2>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={feeds}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='created_at' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type='monotone'
							dataKey='field2'
							stroke='#82ca9d'
							name='Moisture'
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default Charts
