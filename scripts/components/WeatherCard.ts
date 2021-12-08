import Label from '@smartface/native/ui/label';
import WeatherCardDesign from 'generated/my-components/WeatherCard';

export default class WeatherCard extends WeatherCardDesign {
    pageName?: string | undefined;

    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
}
