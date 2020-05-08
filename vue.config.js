module.exports = {
  // console.log() 활용 위함
  devServer: {
    overlay: false,
    proxy: {
      '/api': {
        target: 'https://api.dropper.tech/covid19/status',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
