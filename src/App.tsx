import React from "react"
import "./App.css" // Import the updated CSS file
import useThingSpeakData from "./useThingSpeak"
import Gauge from "./TemperatureGauge"
import Metric from "./MoistureMetric"
import Stats from "./Stats"
import Charts from "./RealTimeCharts"
import ScatterWithTrendLine from "./Scatterplot"
import MovingAverageChart from "./MovingLine"

const DRY_VALUE = 1000
const WET_VALUE = 200

const App: React.FC = () => {
	const feeds = useThingSpeakData()

	const getLatestValues = () => {
		if (feeds.length === 0) return {temp: 0, moisture: 0, moisturePer: 0}
		const latest = feeds[feeds.length - 1]
		const rawMoisture = parseFloat(latest.field2)
		var moisturePer = 0

		if (rawMoisture > DRY_VALUE) moisturePer = 0
		else if (rawMoisture < WET_VALUE) moisturePer = 100
		else
			moisturePer =
				(100 * (DRY_VALUE - rawMoisture)) / (DRY_VALUE - WET_VALUE)

		return {
			temp: parseFloat(latest.field1),
			moisture: parseFloat(latest.field2),
			moisturePer,
		}
	}

	const getStats = () => {
		if (feeds.length === 0)
			return {avgTemp: 0, avgMoisture: 0, minTemp: 0, maxTemp: 0}
		const temps = feeds.map((f) => parseFloat(f.field1))
		const moistures = feeds.map((f) => parseFloat(f.field2))
		return {
			avgTemp: temps.reduce((a, b) => a + b, 0) / temps.length,
			avgMoisture:
				moistures.reduce((a, b) => a + b, 0) / moistures.length,
			minTemp: Math.min(...temps),
			maxTemp: Math.max(...temps),
		}
	}

	const {temp, moisture, moisturePer} = getLatestValues()
	const {avgTemp, avgMoisture, minTemp, maxTemp} = getStats()

	return (
		<div className='App'>
			<h1>ThingSpeak Sensor Data Analytics</h1>

			<div className='metrics-container'>
				<Gauge temp={temp} />
				<Metric moisture={moisturePer} />
				<Stats
					avgTemp={avgTemp}
					avgMoisture={avgMoisture}
					minTemp={minTemp}
					maxTemp={maxTemp}
				/>
			</div>

			<Charts feeds={feeds} />

			<div className='chart-row'>
				<ScatterWithTrendLine feeds={feeds} />
				<MovingAverageChart feeds={feeds} />
			</div>
		</div>
	)
}

export default App
