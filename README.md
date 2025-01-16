# Prayed

A React Native mobile application for connecting people through prayer, built with Expo and Appwrite.

## Overview

Prayed is a platform that allows users to share prayer requests, connect with others, and build a supportive prayer community. The app features a modern, intuitive interface and powerful features to enhance the prayer experience.

## Features

### Core Features
- 🙏 Prayer Requests: Share and respond to prayer requests
- 👥 Community: Connect with other users and prayer groups
- 📱 Modern UI: Clean, intuitive interface with dark mode support
- 🔔 Notifications: Stay updated on prayer requests and responses
- 📖 Bible Integration: Access Bible verses and daily readings

### Technical Features
- ⚡ Expo Router for navigation
- 🔐 Appwrite backend integration
- 💅 Tailwind CSS for styling
- 🎨 Custom reusable components
- 📱 Cross-platform compatibility

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Appwrite instance

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/pray-4-me.git
cd pray-4-me
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file:
```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=your-appwrite-endpoint
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
pray-4-me/
├── app/                    # App screens and navigation
│   ├── (auth)/            # Authentication screens
│   └── (root)/            # Main app screens
├── components/            # Reusable components
├── lib/                   # Utilities and services
├── providers/            # Context providers
└── types/                # TypeScript definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Expo](https://expo.dev)
- [Appwrite](https://appwrite.io)
- [React Native](https://reactnative.dev)
- [Tailwind CSS](https://tailwindcss.com)
