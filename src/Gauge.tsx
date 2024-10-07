import GaugeChart from "react-gauge-chart"

const Gauge = ({temp}: {temp: number}) => {
	return (
		<div className='metric-card'>
			<h2>Current Temperature</h2>
			<GaugeChart
				id='temperature-gauge'
				nrOfLevels={3}
				colors={["#00FF00", "#FFFF00", "#FF0000"]}
				arcWidth={0.3}
				percent={temp / 100}
				textColor='#000000'
				formatTextValue={(value) =>
					`${(value as unknown as number).toFixed(1)}°C`
				}
				animate={true} // Enable animation
			/>
		</div>
	)
}

export default Gauge
