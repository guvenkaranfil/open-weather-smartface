import CityListItemDesign from 'generated/my-components/CityListItem';

export default class CityListItem extends CityListItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
