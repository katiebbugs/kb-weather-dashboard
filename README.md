# kb-weather-dashboard
6. Server-Side APIs Challenge: Weather Dashboard

https://github.com/katiebbugs/kb-weather-dashboard

https://katiebbugs.github.io/kb-weather-dashboard/

On-the-Job Ticket:

    User Story
        AS A traveler
        I WANT to see the weather outlook for multiple cities
        SO THAT I can plan a trip accordingly

    Acceptance Criteria
        GIVEN a weather dashboard with form inputs
        WHEN I search for a city
        THEN I am presented with current and future conditions for that city and that city is added to the search history
        WHEN I view current weather conditions for that city
        THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
        WHEN I view the UV index
        THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
        WHEN I view future weather conditions for that city
        THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
        WHEN I click on a city in the search history
        THEN I am again presented with current and future conditions for that city

Edits Made:
    
    HTML
        CREATED framework
        CREATED sections for search, search history, current weather, and the 5-day forecast

    CSS
        ADDED basic font sizes and fonts, padding, margins, and flex displays
        ADDED background colors to the whole page and weather cards
        ADDED hover action for search history

    JS
        CREATED functions to search for city
        CREATED functions to log, clear, and action functions for search history
        CREATED functions to search and display the current and 5-day forecast weather, as well as the date that belongs to them. Weather includes temp, wind speed, humidity, and the UV index.
        
![screenshot-weather](https://user-images.githubusercontent.com/79028196/128650504-143fa934-51c9-48ac-9073-c98e25a063ad.png)
