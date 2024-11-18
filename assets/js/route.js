/**
 * @license MIT
 * @fileoverview Manage all routes
 * @copyright wezzychibula 2024 All rights reserved
 * @author wezzy chibula <chibulawezzy33@gmail.com>
 */

'Use strict';

import { updateWeather, error404 } from "./app.js";
const defaultLocation = "#/weather?lat=-12.143333&lon=26.385833" //Solwezi

const currentLocation = function () {
    window.navigator.geolocation.getCurrentPosition(res => {
        const { latitude, longitude } = res.coords;

        updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLocation;
    });
}

/**
 * @param {string} query Searched query
 */
const searchedLocation = query => updateWeather(...query.split("&"));
//updateWeather("lat=-12.143333", "lon=26.385833")

const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes("?") ? requestURL.split("?") : [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
    if (!window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
});