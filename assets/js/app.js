/**
 * @license MIT
 * @copyright wezzychibula 2024 All rights reserved
 * @author wezzy chibula <chibulawezzy33@gmail.com>
 */

'use strict';

import { fetchData, url } from "./api.js";
import * as module from "./module.js";

/**
 * Add event listener on multiple elements
 * @param {NodeList} elements Elements node array
 * @param {string} eventType Event type e.g.: "click", "mouseover"
 * @param {Function} callback Callback function
 */
const addEventOnElements = function(elements, eventType, callback) {
    for (const element of elements) element.addEventListener(eventType, callback);
}

/**
 * Toggle search in mobile devices
 */
const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchTogglers, "click", toggleSearch);

/**
 * SEARCH INTEGRATION
 */
const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const serachTimeoutDuration = 500;

searchField.addEventListener("input", function () {

    searchTimeout ?? clearTimeout(searchTimeout);

    if (!searchField.value) {
        searchResult.classList.remove("active");
        searchResult.innerHTML = "";
        searchField.classList.remove("searching");
    } else {
        searchField.classList.add("searching");
    }

    if (searchField.value) {
        searchTimeout = setTimeout(() => {
            fetchData(url.geo(searchField.value), function (locations) {
                searchField.classList.remove("searching");
                searchResult.classList.add("active");
                searchResult.innerHTML = `
                    <ul class="view-list" data-search-list></ul>
                `;

                const /** {NodeList} | [] */ items = [];

                for (const { name, lat, lon, country, state } of locations) {
                    const searchItem = document.createElement("li");
                    searchItem.classList.add("view-item");

                    searchItem.innerHTML = `
                        <span class="m-icon">location_on</span>
                        <div>
                            <p class="item-title">${name}</p>
                            <p class="label-2 item-subtitle">${state || ""} ${country} </p>
                        </div>
                        <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggler></a>
                    `;

                    searchResult.querySelector("[data-search-list]").appendChild(searchItem);
                    items.push(searchItem.querySelector("[data-search-toggler]"));
                }

                addEventOnElements(items, "click", function () {
                    toggleSearch();
                    searchResult.classList.remove("active");
                })
            });
        }, serachTimeoutDuration);
    }
});

const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector("[data-current-location-btn]");
const errorContent = document.querySelector("[data-error-content]");

/**
 * Render all weather data in html page
 * 
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
export const updateWeather = async (lat, lon) => {
    try {
      loading.style.display = "grid";
      container.classList.remove("fade-in");
      errorContent.style.display = "none";
  
      // Fetch weather data using API (replace with your API call)
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric=05a6515d1f1056de11359fa2d38b2479`); // Replace with your API endpoint and key
      const weatherData = await response.json();
  
      // Update container content with weather information (adapt based on API response)
      container.innerHTML = `<h1>${weatherData.name}</h1>
                             <p>Temperature: ${weatherData.main.temp} K</p>`; // Modify based on data structure
  
    } catch (error) {
      console.error("Error fetching weather:", error);
      errorContent.style.display = "block";
      errorContent.textContent = "Failed to fetch weather data.";
    } finally {
      loading.style.display = "none"; // Hide loading indicator after success or failure
    }
  };

export const error404 = () => errorContent.style.display = "flex";
