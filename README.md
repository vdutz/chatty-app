# Chatty App

Chatty App allows users to communicate with each other without having to register accounts. It also supports the automatic display of images from messages containing image URLs.

The app was designed with React for the front-end, WebSockets for the chat functionality, and other supporting tools for Node including Webpack and Babel.

## Final Product

A Sample Chat in Progress
!["Sample Chat in Progress"](#)

## Getting Started

1. Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Server Dependencies

- "express": "4.15.3",
- "node-uuid": "1.4.8",
- "ws": "3.0.0"

### Client Dev Dependencies

- "babel-core": "6.23.1",
- "babel-loader": "6.3.1",
- "babel-preset-es2015": "6.22.0",
- "babel-preset-react": "6.23.0",
- "babel-preset-stage-0": "6.22.0",
- "css-loader": "0.26.1",
- "eslint": "3.15.0",
- "eslint-plugin-react": "6.9.0",
- "node-sass": "4.5.0",
- "sass-loader": "6.0.0",
- "sockjs-client": "^1.1.2",
- "style-loader": "0.13.1",
- "webpack": "2.2.1",
- "webpack-dev-server": "2.3.0"

### Client Dependencies

- "react": "15.4.2",
- "react-dom": "15.4.2"
- React
- Webpack
- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
