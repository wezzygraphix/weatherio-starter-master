/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright cwezzychibula 2024 All rights reserved
 * @author wezzy chibula <chibulawezzy33@gmail.com>
 */

'use strict'

const api_key = "05a6515d1f1056de11359fa2d38b2479";

/**
 * fetch data from server
 * @param {string} URL API url 
 * @param {Function} callback 
 */

export const fetchData = function (URL, callback) {
    fetch('${https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric}&appid=${05a6515d1f1056de11359fa2d38b2479}')
        .then(res = res.json())
        .then(data = callback(data));
}

export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric` 
    },
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
    },
    airPollution(lat, lon) {
        return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`
    },
    reverseGeo(lat, lon) {
        return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
    },
    /** 
    * @param {string} query search query e.g: "London,"
    * @returns
    */
    geo(query) {
        return `http://api.openweathermap.org/geo/1.0/direct?${query}&limit=5`
    }
}