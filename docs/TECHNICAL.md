# Technical Documentation

## Architecture Overview

### Frontend Architecture
The News Room application is built using Vue.js 3 with the following key components:

#### Core Technologies
- Vue.js 3 for reactive UI
- Vuex for state management
- Vue Router for navigation
- Progressive Web App (PWA) capabilities

#### Component Structure
```
src/
├── components/         # Reusable UI components
│   ├── NavBar.vue     # Navigation bar
│   ├── MenuTop.vue    # Top menu
│   ├── TopBar.vue     # Top navigation
│   └── ...
├── views/             # Page components
│   ├── HomePage.vue
│   ├── WorldPage.vue
│   └── ...
└── store/            # Vuex state management
```

### Backend Architecture (AWS Serverless)

#### News Scraping Service
- Python-based Lambda functions
- Scheduled execution via CloudWatch Events
- Sources: BBC, Guardian, Independent, TalkSport

#### Real-time Chat System
- WebSocket API Gateway
- Lambda functions for connection management
- DynamoDB for message storage

#### Text-to-Speech Service
- AWS Polly integration
- Lambda function for audio processing
- S3 for audio file storage

## API Documentation

### WebSocket APIs

#### Chat Connection
```javascript
// Connect to chat
ws.connect('/chat')

// Join room
ws.send({
  action: 'joinRoom',
  roomId: 'room123'
})
```

#### News API Endpoints
```
GET /api/news/latest      # Get latest news
GET /api/news/category    # Get news by category
GET /api/news/search      # Search articles
```

## Database Schema

### DynamoDB Tables

#### News Articles Table
```json
{
  "articleId": "string",
  "title": "string",
  "content": "string",
  "source": "string",
  "category": "string",
  "publishedAt": "timestamp"
}
```

#### Chat Messages Table
```json
{
  "messageId": "string",
  "roomId": "string",
  "userId": "string",
  "content": "string",
  "timestamp": "number"
}
```

## Deployment Process

### Frontend Deployment
1. Build the Vue.js application
2. Deploy to AWS S3
3. Configure CloudFront distribution

### Backend Deployment
1. Package Lambda functions
2. Deploy using AWS SAM/CloudFormation
3. Configure API Gateway and DynamoDB

## Performance Optimization

1. Lazy loading of routes
2. Image optimization
3. Caching strategies
4. Service Worker implementation