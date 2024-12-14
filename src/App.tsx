import React from "react"
import "./App.css" // Import the updated CSS file
import useThingSpeakData from "./useThingSpeak"
import Gauge from "./TemperatureGauge"
import Metric from "./MoistureMetric"
import Stats from "./Stats"
import Charts from "./RealTimeCharts"
import ScatterWithTrendLine from "./Scatterplot"
import MovingAverageChart from "./MovingLine"
import Chatbot from "./Chatbot"

// Constants for moisture value thresholds
const DRY_VALUE = 1000
const WET_VALUE = 200

const App: React.FC = () => {
	// Fetch data from ThingSpeak
	const feeds = useThingSpeakData()

	// Convert raw moisture value to percentage
	const convertRawMoistureToPercent = (rawMoisture: number): number => {
		if (rawMoisture > DRY_VALUE) return 0
		else if (rawMoisture < WET_VALUE) return 100
		else return (100 * (DRY_VALUE - rawMoisture)) / (DRY_VALUE - WET_VALUE)
	}

	// Get the latest temperature and moisture values
	const getLatestValues = () => {
		if (feeds.length === 0) return {temp: 0, moisture: 0, moisturePer: 0}
		const latest = feeds[feeds.length - 1]

		return {
			temp: parseFloat(latest.field1),
			moisture: parseFloat(latest.field2),
			moisturePer: convertRawMoistureToPercent(parseFloat(latest.field2)),
		}
	}

	// Calculate statistics for temperature and moisture values
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
					avgMoisture={moisturePer}
					minTemp={minTemp}
					maxTemp={maxTemp}
				/>
			</div>

			<Charts feeds={feeds} />

			<div className='chart-row'>
				<ScatterWithTrendLine feeds={feeds} />
				<MovingAverageChart feeds={feeds} />
			</div>
			<Chatbot />
		</div>
	)
}

export default App
