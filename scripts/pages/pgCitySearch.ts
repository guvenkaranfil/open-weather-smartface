import { getCities } from 'api';
import PgCitySearchDesign from 'generated/pages/pgCitySearch';

export default class PgCitySearch extends PgCitySearchDesign {
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    async getAllCities() {
        const response = await getCities();
        console.log('typeof response of cities:', typeof response)
        console.log('typeof response of cities:', response[0])
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgCitySearch, superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgCitySearch, superOnLoad: () => void) {
    superOnLoad();

    this.getAllCities();
}
