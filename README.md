# WTWR

WTWR is a React + Vite weather styling app that suggests clothing based on current weather conditions. The app fetches real weather data, displays a weather card with temperature and icon, and shows a filtered list of garments to wear in hot, warm, or cold weather.

## Features

- Fetches live weather data from OpenWeatherMap
- Displays temperature, weather condition, and day/night icon
- Filters and renders clothing suggestions based on weather type
- Opens a preview modal for selected garments
- Includes an add garment modal form for future extensibility

## Technologies

- React
- Vite
- CSS modules/styles
- Fetch API
- OpenWeatherMap API

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal to use the app locally.

## Project Structure

- `src/components/` - React UI components
- `src/utils/` - helper functions and constants
- `src/main.jsx` - app entry point

## Notes

- The app initializes clothing items in `App` state and passes them down to `Main`
- The modal wrapper is reusable with `name` and `isOpen` props

## Deployment

This project can be deployed with Vercel, Netlify, or any static hosting provider that supports Vite apps.
