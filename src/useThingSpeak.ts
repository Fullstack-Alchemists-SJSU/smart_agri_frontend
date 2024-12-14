import React, {useEffect, useState} from "react"
import axios from "axios"

// Define the data structure for temperature and moisture
export interface Feed {
	created_at: string
	field1: string // Temperature
	field2: string // Moisture
}

const useThingSpeakData = () => {
	const [feeds, setFeeds] = useState<Feed[]>([])

	// Fetch data from ThingSpeak
	const fetchData = async () => {
		try {
			const response = await axios.get(
				"https://api.thingspeak.com/channels/2669427/feeds.json?results=20"
			)
			setFeeds((prevFeeds) => {
				const newFeeds = [...prevFeeds, ...response.data.feeds]
				return newFeeds
			})
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	useEffect(() => {
		fetchData()
		const interval = setInterval(fetchData, 15000) // Fetch data every 15 seconds
		return () => clearInterval(interval) // Cleanup on unmount
	}, [])

	return feeds
}

export default useThingSpeakData
