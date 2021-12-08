import WeatherCard2Design from 'generated/my-components/WeatherCard2';

export default class WeatherCard2 extends WeatherCard2Design {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
