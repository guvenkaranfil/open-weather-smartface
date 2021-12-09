import PgHomeDesign from 'generated/pages/pgHome';

import Location from '@smartface/native/device/location';
import PermissionUtil from '@smartface/extension-utils/lib/permission';
import { getWeatherByCityName, getWeatherByLocation } from '../api/weatherRepository';
import { getLocation } from '@smartface/extension-utils/lib/location';
import Color from '@smartface/native/ui/color';
import Screen from '@smartface/native/device/screen';


import { config } from 'settings.json';
import ImageView from '@smartface/native/ui/imageview';
import View from '@smartface/native/ui/view';
import WeatherCard from 'components/WeatherCard';
import GridViewItem from '@smartface/native/ui/gridviewitem';
import Simple_gridviewItem from 'components/Simple_gridviewItem';
import WeatherCard2 from 'components/WeatherCard2';
import { getCities } from 'api';

import store from 'duck/store';
import SessionActions from 'duck/session/actions'


export default class PgHome extends PgHomeDesign {
    router: any
    currentLocationCity: string

    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.citySearch.on(View.Events.Touch, () => {
            this.router.push('/pages/pgCitySearch');
        })

        this.imageView2.on(View.Events.Touch, () => {
            this.router.push('/pages/pgForecastWeekly', { headerTitle: this.currentLocationCity });
        })

        this.getUserLocation();


    }

    async getWeatherInfoByLocation(latitude: number, longitude: number) {
        try {
            const response = await getWeatherByLocation(latitude, longitude)
            if (response) {
                this.currentLocationCity = response.name
                this.cityName.text = response.name
                this.weatherType.text = response.weather[0].main
                this.weatherDegree.text = response.main.temp

                this.pgHomeContainer.backgroundColor = getBackgroundColor(response.main.temp)
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

    initWeatherCards() {
        this.weatherCards.layoutManager.onItemLength = () => {
            return Screen.width - 40
        }

        this.weatherCards.onItemBind = (gridViewItem: WeatherCard2) => {
            gridViewItem.lblTitle.text = WEATHER_INFOS[0].time
            gridViewItem.lblInfo.text = WEATHER_INFOS[0].info
            gridViewItem.backgroundColor = Color.create('#323746')
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


    const currentCityName = this.cityName.text;
    const sessionCity = store.getState().session.city
    if ((currentCityName != sessionCity.name) && sessionCity.id != -1) {
        console.log('convertion:', Number(sessionCity.latitude), Number(sessionCity.longitude))
        this.getWeatherInfoByLocation(Number(sessionCity.latitude), Number(sessionCity.longitude))

    }

}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgHome, superOnLoad: () => void) {
    superOnLoad();

    const session = store.getState();
    console.log('state: ', store.getState())

    this.initWeatherCards();
}

function getBackgroundColor(degree: number): Color {
    if (degree < 10) {
        return Color.create(COLORS.snowy)
    }
    if (degree < 15) {
        return Color.create(COLORS.rainy)
    }
    if (degree < 20) {
        return Color.create(COLORS.sunny)
    }
}


const COLORS = {
    sunny: '#fcba03',
    snowy: '#4292ed',
    rainy: '#b06951'
}




const WEATHER_INFOS = [
    {
        time: "15 Minutes Ago",
        info: "If you don't want to get wet today, don't forget your umbrella"
    }
]