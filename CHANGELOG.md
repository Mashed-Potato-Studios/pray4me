# Changelog

All notable changes to the Pray4Me app will be documented in this file.

## [Unreleased]

### Added
- Initial app setup with Expo Router and TypeScript
- Authentication system with Appwrite
- Profile management pages
  - Personal Information
  - Privacy Settings
  - Appearance Settings
  - Language Settings
  - Help Center
  - Contact Form
  - About Page
- Home screen features
  - Header with avatar and notifications
  - Search functionality
  - Quick action buttons
- **Groups management features**: Users can now create and manage groups within the app. This includes setting group names, descriptions, and rules.
- **Integration with Appwrite for group data**: The app now interacts with Appwrite to store and retrieve group-related data, ensuring that all changes are reflected in the backend.
- Reusable components
  - Header component with notifications
  - Search component with clear functionality
  - Prayer request cards
- Prayer categories
- Recent prayers feed

### Changed
- **Updated environment variables**: The environment variables have been updated to include the new groups collection ID, allowing for seamless integration with the database.

### Fixed
- **Resolved TypeScript compilation issues**: Fixed various TypeScript errors that were preventing the app from compiling successfully.
- **Improved error handling in the seeding process**: Enhanced the error handling to provide clearer messages and prevent crashes during the seeding process.
- **Adjusted imports**: Updated imports throughout the codebase to support both CommonJS and ES module syntax, ensuring compatibility with the current setup.

### Known Issues
- Some users may experience delays when loading group data due to network latency.
- The app may crash if the group data exceeds a certain size limit due to memory constraints.

### Coming Soon
- **Bible integration**: We are working on integrating Bible verses and references into the app to enhance the prayer experience.
- **User feedback system**: A feature to allow users to provide feedback on prayers and groups will be implemented in future releases.
- **Enhanced search functionality**: Improvements to the search feature to allow for more refined queries and better results.
- Prayer groups functionality
- Real-time notifications
- Direct messaging system
- Prayer tracking and statistics
- Community features
- Multi-language support
- Dark mode support

## [0.1.0] - 2025-01-15
### Initial Release
- Basic authentication flow
- Profile management
- Prayer feed
- Search functionality
