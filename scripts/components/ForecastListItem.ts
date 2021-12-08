import ForecastListItemDesign from 'generated/my-components/ForecastListItem';

export default class ForecastListItem extends ForecastListItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
