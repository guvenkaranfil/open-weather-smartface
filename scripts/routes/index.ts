import buildExtender from '@smartface/extension-utils/lib/router/buildExtender';
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route,
} from '@smartface/router';
import * as Pages from 'pages';
import '@smartface/extension-utils/lib/router/goBack'; // Implements onBackButtonPressed

const weatherRouter = StackRouter.of({
    path: '/pages',
    routes: [
        Route.of({
            path: '/pages/pgHome',
            build: buildExtender({
                getPageClass: () => Pages.PgHome,
                headerBarStyle: { visible: false },
            }),
        }),
        Route.of({
            path: '/pages/pgCitySearch',
            build: buildExtender({
                getPageClass: () => Pages.PgCitySearch,
                headerBarStyle: { visible: true },
            }),
        }),
        Route.of({
            path: '/pages/pgForecastWeekly',
            build: buildExtender({
                getPageClass: () => Pages.PgForecastWeekly,
                headerBarStyle: { visible: true },
            }),
        }),
    ],
});

const router = Router.of({
    path: '/',
    isRoot: true,
    routes: [
        weatherRouter
    ],
});

export default router;
