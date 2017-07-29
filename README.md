# Chatty App

Chatty App allows users to communicate with each other without having to register accounts. It also supports the automatic display of images from messages containing image URLs.

The app was designed with React for the front-end, WebSockets for the chat functionality, and other supporting tools for Node including Webpack and Babel.

## Final Product

### A Sample Chat in Progress

!["Sample Chat in Progress"](https://github.com/vdutz/chatty-app/blob/master/docs/chat-in-progress.png?raw=true)

## Getting Started

Install the dependencies and start the server.

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

### Dependencies

- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
