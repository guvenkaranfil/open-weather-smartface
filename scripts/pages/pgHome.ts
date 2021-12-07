import PgHomeDesign from 'generated/pages/pgHome';

import Location from '@smartface/native/device/location';
import PermissionUtil from '@smartface/extension-utils/lib/permission';
import { getWeatherByCityName, getWeatherByLocation } from '../api/weatherRepository';
import { getLocation } from '@smartface/extension-utils/lib/location';
import { NativeStackRouter } from '@smartface/router';

export default class PgHome extends PgHomeDesign {
    router: any

    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.weeklyButton.onPress = () => {
            this.router.push('/pages/pgWeekly')
        }

        this.getUserLocation();

        
    }

    async getWeatherInfoByLocation(latitude: number, longitude: number) {
        try {
            const response = await getWeatherByLocation(latitude, longitude)
            if (response) {
                this.cityName.text = response.name
                this.weatherType.text = response.weather[0].main
                this.weatherDegree.text = response.main.temp
            }
        } catch (error) {

        }

    }

    async getUserLocation() {
        console.log('location permission status: ', Location.ios.getAuthorizationStatus);
        try {
            const location = await getLocation();
            if (location) {
                this.getWeatherInfoByLocation(location.latitude, location.longitude)
            }
        } catch (error) {

        }
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgHome, superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgHome, superOnLoad: () => void) {
    superOnLoad();
}
