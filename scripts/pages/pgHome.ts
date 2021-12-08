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
import Simple_listviewitem from 'generated/my-components/Simple_listviewitem';
import WeatherCard2 from 'components/WeatherCard2';


export default class PgHome extends PgHomeDesign {
    router: any

    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.imageView2.on(View.Events.Touch, () => {
            this.router.push('/pages/pgWeekly')
        })

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

    initWeatherCards() {
        this.weatherCards.layoutManager.onItemLength = () => {
            return Screen.width - 40
        }

        this.weatherCards.onItemBind = (gridViewItem: WeatherCard2) => {
            gridViewItem.lblTitle.text = WEATHER_INFOS[0].time
            gridViewItem.lblInfo.text = WEATHER_INFOS[0].info
            gridViewItem.backgroundColor =  Color.create('#323746')
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

    this.initWeatherCards();
}


const COLORS = [Color.RED, Color.BLUE]


const WEATHER_INFOS = [
    {
        time: "15 Minutes Ago",
        info: "If you don't want to get wet today, don't forget your umbrella"
    }
]