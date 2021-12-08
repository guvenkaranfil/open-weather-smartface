import PgWeeklyDesign from 'generated/pages/pgWeekly';

export default class PgWeekly extends PgWeeklyDesign {

    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initListView() {

    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgWeekly, superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgWeekly, superOnLoad: () => void) {
    superOnLoad();

    this.initListView();
}



interface WeatherDayInfo {
    day: string;
    dayDegree: number
    nightDegree: number
}