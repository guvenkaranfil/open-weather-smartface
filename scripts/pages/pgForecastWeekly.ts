import PgForecastWeeklyDesign from 'generated/pages/pgForecastWeekly';
import Color from '@smartface/native/ui/color';
import ForecastListItem from 'components/ForecastListItem';

export default class PgForecastWeekly extends PgForecastWeeklyDesign {
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

    this.forecastList.backgroundColor = Color.create('#282B39')
    this.forecastList.rowHeight = 50


    this.forecastList.onRowBind = (listViewItem: ForecastListItem) => {
        
        listViewItem.day.text = 'Monday'
        listViewItem.dayDegree.text = '32'
        listViewItem.nightDegree.text = '32'
    }
}
