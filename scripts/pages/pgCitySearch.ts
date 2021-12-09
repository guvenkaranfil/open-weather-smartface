import Screen from '@smartface/native/device/screen';
import ActivityIndicator from '@smartface/native/ui/activityindicator';
import Color from '@smartface/native/ui/color';
import FlexLayout, { AlignItems, JustifyContent, PositionType } from '@smartface/native/ui/flexlayout';
import { City, getCities } from 'api';
import CityListItem from 'generated/my-components/CityListItem';
import PgCitySearchDesign from 'generated/pages/pgCitySearch';

import store from 'duck/store'
import SessionActions from 'duck/session/actions'

export default class PgCitySearch extends PgCitySearchDesign {
    router: any
    loaderView: FlexLayout
    cities: City[]
    searchedCities: City[]
    searchedCity: string

    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.citySearch.onTextChanged = (typedText: string) => {
            this.loaderView.visible = true
            setTimeout(() => {
                let filteredCities = filterGivenCities(typedText, this.cities);
                this.cityList.itemCount = filteredCities.length
                this.searchedCities = filteredCities
                this.cityList.refreshData();
                this.loaderView.visible = false
            }, 500);
        }
    }

    async getAllCities() {
        const response = await getCities();
        console.log('typeof response of cities:', typeof response)
        console.log('typeof response of cities:', response[0])
        this.cities = response
        this.searchedCities = response
        this.initListView();
    }

    initListView() {
        this.cityList.itemCount = this.cities.length
        this.cityList.rowHeight = 50
        this.cityList.touchEnabled = true

        this.cityList.onRowBind = (listViewItem: CityListItem, index: number) => {
            let currentCity = this.searchedCities[index]
            listViewItem.cityName.text = currentCity.name
            listViewItem.cityId.text = String(currentCity.id)
        }

        this.cityList.onRowSelected = (selectedItem: CityListItem, index: number) => {
            console.log('selectedRow:' + index)
            console.log('selectedCity:', selectedItem.cityName.text)

            let selectedCity = this.cities.find(
                city => city.name === selectedItem.cityName.text
            )

            store.dispatch(SessionActions.updateCity(selectedCity))
            this.router.goBack();
        }

        this.cityList.onPullRefresh = () => {
            console.log('refresh....')
            this.cityList.stopRefresh();
        }

        this.cityList.refreshData();
        this.cityList.visible = true
        this.loaderView.visible = false
    }

    initLoaderLayout() {
        this.loaderView = new FlexLayout();
        let container = this.loaderView
        container.width = Screen.width;
        container.height = Screen.height
        container.alignItems = AlignItems.CENTER
        container.justifyContent = JustifyContent.CENTER
        container.positionType = PositionType.ABSOLUTE
        container.backgroundColor = Color.create('#000000aa')

        let activityLoader = new ActivityIndicator();
        activityLoader.color = Color.BLACK

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

    this.cityList.visible = false
    this.initLoaderLayout();
    this.getAllCities();
}

function filterGivenCities(searchKeyword: string, cities: City[]) {
    const filteredCities = cities.filter((city) => city.name.includes(searchKeyword));
    return filteredCities
}
