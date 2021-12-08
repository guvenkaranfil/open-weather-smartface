import PgWeeklyDesign from 'generated/pages/pgWeekly';

import Application from '@smartface/native/application';
import FlexLayout from '@smartface/native/ui/flexlayout';
import ScrollView from '@smartface/native/ui/scrollview';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';

export default class PgWeekly extends PgWeeklyDesign {
    colors: string[] = ["#F25022", "#7FBA00", "#00A4EF", "#FFB900", "#6441A4","#F25022", "#7FBA00", "#00A4EF", "#FFB900", "#6441A4",];
    myScrollView: ScrollView;

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
function onShow(this: PgWeekly, superOnShow: () => void) {
    superOnShow();
    const { headerBar } = this;
    Application.statusBar.visible = false;
    headerBar.visible = false;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgWeekly, superOnLoad: () => void) {
    superOnLoad();

    this.colors = ["#F25022", "#7FBA00", "#00A4EF", "#FFB900", "#6441A4"];
    this.myScrollView = new ScrollView({
        autoSizeEnabled: true
    });
    componentContextPatch(this.myScrollView.layout, "myScrollViewLayout");


    for (let i = 0; i < 20; i++) {
        let flex = new FlexLayout();
        this.myScrollView.layout.addChild(flex, "flex", ".sf-flexLayout", {
            height: 100,
            backgroundColor: this.colors[i % 5]
        });
    };


    this.layout.addChild(this.myScrollView, "myScrollView", null, {
        width: 400,
        height: 200,
        backgroundColor: "#00A1F1"
    });

    this.myScrollView.layout.applyLayout();
}
