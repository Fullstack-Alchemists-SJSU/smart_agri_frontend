import {buildStyles, CircularProgressbar} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const Metric = ({moisture}: {moisture: number}) => {
	return (
		<div className='metric-card'>
			<h2>Current Moisture</h2>
			<CircularProgressbar
				value={moisture}
				text={`${moisture.toFixed(1)}%`}
				styles={buildStyles({
					textColor: "#000",
					pathColor: "#3498db",
					trailColor: "#d6d6d6",
					textSize: "16px", // Adjust text size
					pathTransitionDuration: 0.5,
				})}
			/>
		</div>
	)
}

export default Metric
