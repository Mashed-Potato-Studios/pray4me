# Feature Flags

This document outlines the feature flags used in the Pray4Me app for feature toggling and A/B testing.

## Current Feature Flags

### Authentication
- `ENABLE_SOCIAL_AUTH`: Enable social authentication methods
- `ENABLE_BIOMETRIC_AUTH`: Enable biometric authentication
- `ENABLE_PASSWORD_RESET`: Enable password reset functionality

### Profile Features
- `ENABLE_AVATAR_UPLOAD`: Enable custom avatar uploads
- `ENABLE_PROFILE_VISIBILITY`: Enable profile visibility controls
- `ENABLE_ACTIVITY_HISTORY`: Enable prayer activity history

### Prayer Features
- `ENABLE_PRAYER_CATEGORIES`: Enable categorized prayers
- `ENABLE_PRAYER_ATTACHMENTS`: Enable file attachments in prayers
- `ENABLE_PRAYER_SHARING`: Enable prayer sharing functionality
- `ENABLE_ANONYMOUS_PRAYERS`: Enable anonymous prayer requests

### Community Features
- `ENABLE_GROUPS`: Enable prayer groups functionality
- `ENABLE_DIRECT_MESSAGES`: Enable direct messaging
- `ENABLE_COMMUNITY_FEED`: Enable community prayer feed
- `ENABLE_GROUP_CREATION`: Enable group creation by users

### Notifications
- `ENABLE_PUSH_NOTIFICATIONS`: Enable push notifications
- `ENABLE_EMAIL_NOTIFICATIONS`: Enable email notifications
- `ENABLE_IN_APP_NOTIFICATIONS`: Enable in-app notifications

### Bible Integration
- `ENABLE_BIBLE_VERSES`: Enable Bible verse integration
- `ENABLE_VERSE_SHARING`: Enable verse sharing
- `ENABLE_DAILY_VERSES`: Enable daily verse features

### Analytics
- `ENABLE_USAGE_ANALYTICS`: Enable usage analytics
- `ENABLE_PRAYER_METRICS`: Enable prayer metrics tracking
- `ENABLE_PERFORMANCE_MONITORING`: Enable performance monitoring

### Experimental Features
- `ENABLE_VOICE_PRAYERS`: Enable voice-based prayer requests
- `ENABLE_PRAYER_REMINDERS`: Enable prayer reminder scheduling
- `ENABLE_AI_SUGGESTIONS`: Enable AI-powered prayer suggestions

## Feature Flag States

| Flag Name | Development | Staging | Production |
|-----------|-------------|----------|------------|
| ENABLE_SOCIAL_AUTH | true | true | false |
| ENABLE_GROUPS | true | true | false |
| ENABLE_PUSH_NOTIFICATIONS | true | true | false |

## Implementation Guide

```typescript
// Example usage in code
if (featureFlags.ENABLE_SOCIAL_AUTH) {
  // Implement social authentication
}

// Feature flag hook
const useFeatureFlag = (flagName: string) => {
  const flags = useFeatureFlags();
  return flags[flagName] || false;
};
```
