const path = require('path');

module.exports = {
  // ... other webpack configs
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Add your custom middleware here
      
      return middlewares;
    },
    compress: true,
    port: 3001,
  },
}; 