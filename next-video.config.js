/** @type {import('next-video').Options} */
const config = {
	// Maximum width of the video
	maxWidth: 1920,
	// Maximum height of the video
	maxHeight: 1080,
	// Video formats to generate
	formats: ['mp4', 'webm'],
	// Path where videos are stored
	directory: 'videos',
	// Video poster quality (0-100)
	poster: {
		quality: 90,
	},
	provider: {
		name: 'google-storage',
		// Configure remote video provider
		remote: {
			baseUrl: 'https://storage.googleapis.com/demodrive-media'
		}
	}
}

module.exports = config