interface StatProps {
	avgTemp: number
	avgMoisture: number
	minTemp: number
	maxTemp: number
}
const Stats = ({avgTemp, avgMoisture, minTemp, maxTemp}: StatProps) => {
	return (
		<div className='stats-container metric-card'>
			<h2>Statistics</h2>
			<ul>
				<li>Average Temperature: {avgTemp.toFixed(1)}°C</li>
				<li>Average Moisture: {avgMoisture.toFixed(1)}%</li>
				<li>Min Temperature: {minTemp.toFixed(1)}°C</li>
				<li>Max Temperature: {maxTemp.toFixed(1)}°C</li>
			</ul>
		</div>
	)
}

export default Stats
