# Bills.ai Mobile App

React Native mobile application built with Expo.

## Features

- Cross-platform (iOS & Android)
- Expo Router for navigation
- Secure token storage with SecureStore
- Image picker for bill uploads
- TanStack Query for API state management

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Project Structure

- `/app` - App screens using Expo Router
- `/components` - Reusable components
- `/services` - API clients and utilities
- `/assets` - Images, fonts, etc.

## Environment Configuration

API URL is configured in `app.json` under `extra.apiUrl`.

For production builds, use EAS Build and configure environment variables.
