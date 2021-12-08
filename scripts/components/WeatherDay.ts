import WeatherDayDesign from 'generated/my-components/WeatherDay';

export default class WeatherDay extends WeatherDayDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
