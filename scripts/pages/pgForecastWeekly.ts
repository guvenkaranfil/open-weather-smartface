import PgForecastWeeklyDesign from 'generated/pages/pgForecastWeekly';
import Color from '@smartface/native/ui/color';
import ForecastListItem from 'components/ForecastListItem';
import Image from '@smartface/native/ui/image';
import FlexLayout, { AlignItems, JustifyContent, PositionType } from '@smartface/native/ui/flexlayout';
import Screen from '@smartface/native/device/screen';
import ActivityIndicator from '@smartface/native/ui/activityindicator';

export default class PgForecastWeekly extends PgForecastWeeklyDesign {
    loaderView: FlexLayout

    routeData: {
        headerTitle: string
    }
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initForecastList() {
        this.forecastList.visible = false

        this.forecastList.backgroundColor = Color.create('#282B39')
        this.forecastList.rowHeight = 50


        this.forecastList.onRowBind = (listViewItem: ForecastListItem) => {

            listViewItem.day.text = 'Monday'
            listViewItem.dayDegree.text = '32'
            listViewItem.nightDegree.text = '32'

            listViewItem.weatherTypeIcon.image = Image.createFromFile(WEATHER_ICON_TYPES[randomIntFromInterval(0, 2)])
        }

        this.forecastList.onPullRefresh = () => {
            this.loaderView.visible = true
            this.forecastList.visible = false
            
            setTimeout(() => {
                this.loaderView.visible = false
                this.forecastList.visible = true
                this.forecastList.stopRefresh();
            }, 1000);
        }
    }

    initLoaderLayout() {
        this.loaderView = new FlexLayout();
        let container = this.loaderView
        container.paddingTop = Screen.height / 4
        container.width = Screen.width;
        container.height = Screen.height
        container.alignItems = AlignItems.CENTER
        container.positionType = PositionType.ABSOLUTE
        container.backgroundColor = Color.TRANSPARENT

        let activityLoader = new ActivityIndicator();
        activityLoader.color = Color.WHITE

        container.addChild(activityLoader)

        this.layout.addChild(container)
        this.layout.applyLayout();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgForecastWeekly, superOnShow: () => void) {
    superOnShow();

    this.headerBar.title = this.routeData.headerTitle
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgForecastWeekly, superOnLoad: () => void) {
    superOnLoad();

    this.initForecastList();
    this.initLoaderLayout();

    setTimeout(() => {
        this.loaderView.visible = false
        this.forecastList.visible = true
    }, 2);
}

const WEATHER_ICON_TYPES = [
    'images://sunny.png',
    'images://windy.png',
    'images://rainy.png'
]

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}