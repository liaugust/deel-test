import { app } from './app.js';
import { config } from './utils/config.js';

init();

async function init() {
	try {
		app.listen(config.port, () => {
			console.log(`Express App Listening on Port ${config.port}`);
		});
	} catch (error) {
		console.error(`An error occurred: ${JSON.stringify(error)}`);
		process.exit(1);
	}
}
