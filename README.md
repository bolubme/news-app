# News Room Web Application

A modern, feature-rich news aggregation platform built with Vue.js and AWS serverless architecture. This application provides real-time news updates from multiple sources, chat functionality, and advanced features like text-to-speech and news summarization.

## Features

- **Multi-Source News Aggregation**
  - BBC News
  - The Guardian
  - The Independent
  - TalkSport
  - Categorized news sections (Business, Entertainment, Politics, Sports, World, Lifestyle)

- **Real-Time Chat System**
  - Group chat functionality
  - WebSocket-based communication
  - Real-time message updates
  - Chat room management

- **Advanced Features**
  - News article summarization
  - Text-to-speech functionality
  - Offline support with Service Workers
  - Responsive design for all devices
  - Custom pagination

- **User Experience**
  - Dark/Light mode support
  - Loading states and animations
  - Navigation bar with category filters
  - Single page article view

## Tech Stack

### Frontend
- Vue.js 3
- Vuex for state management
- Vue Router for navigation
- Axios for HTTP requests
- Progressive Web App (PWA) support

### Backend (AWS Serverless)
- AWS Lambda Functions
- WebSocket API for real-time chat
- DynamoDB for data storage
- Python for news scraping
- Node.js for API handlers

## Project Structure

```
├── src/                   # Frontend source code
│   ├── assets/           # Images and static assets
│   ├── components/       # Vue components
│   ├── views/            # Page components
│   ├── store/            # Vuex store
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
│
├── Aws-Files/            # Backend serverless functions
│   ├── chatApplication/  # Chat functionality
│   ├── newsScrapper/    # News aggregation scripts
│   ├── newsSummarizer/  # Article summarization
│   ├── sendingDataWebsocket/  # WebSocket handlers
│   └── textToSpeech/    # Text-to-speech service
│
├── public/              # Static files
│   ├── service-worker.js # PWA service worker
│   └── images/          # Public images
│
└── tests/              # Unit tests
```

## Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn
   - AWS account (for backend deployment)

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Navigate to the project directory
   cd news-app

   # Install dependencies
   npm install

   # Serve with hot reload at localhost:8080
   npm run serve
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Run Tests**
   ```bash
   npm run test:unit
   ```

## AWS Backend Setup

The application requires several AWS services to be configured:

1. Deploy Lambda functions in the `Aws-Files` directory
2. Configure WebSocket API Gateway
3. Set up DynamoDB tables for chat and user data
4. Configure necessary IAM roles and permissions

Detailed AWS setup instructions can be found in the respective service directories.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Documentation

For detailed information about the project, please refer to the following documentation:

- [Technical Documentation](./docs/TECHNICAL.md) - Detailed technical specifications and architecture
- [Project Report](./docs/PROJECT_REPORT.md) - Comprehensive project overview and implementation details
- [User Guide](./docs/USER_GUIDE.md) - End-user documentation with screenshots

## Screenshots

### Homepage
![Homepage](./docs/images/homepage.png)

### News Categories
![Categories](./docs/images/navigation.png)

### Article View
![Article](./docs/images/article-view.png)

## Acknowledgments

- News data provided by BBC, The Guardian, The Independent, and TalkSport
- AWS for serverless infrastructure
- Vue.js team for the excellent framework
