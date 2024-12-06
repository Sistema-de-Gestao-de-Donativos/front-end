const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v1/cds',
    createProxyMiddleware({
      target: 'http://34.193.7.217:8081', // cd
      changeOrigin: true,
      pathRewrite: {
        '^/v1/cds': '/', 
      },
    })
  );

  app.use(
    '/v1/abrigos',
    createProxyMiddleware({
      target: 'http://34.193.7.217:8082', // abrigo
      changeOrigin: true,
      pathRewrite: {
        '^/v1/abrigos': '/', 
      },
    })
  );


  app.use(
    '/v1/doacao',
    createProxyMiddleware({
      target: 'http://34.193.7.217:8083', // doacoes
      changeOrigin: true,
      pathRewrite: {
        '^/v1/doacao': '/', 
      },
    })
  );

  app.use(
    '/v1/doador',
    createProxyMiddleware({
      target: 'http://34.193.7.217:8083', // doacoes
      changeOrigin: true,
      pathRewrite: {
        '^/v1/doador': '/', 
      },
    })
  );

  app.use(
    '/v1/stock',
    createProxyMiddleware({
      target: 'http://34.193.7.217:8800', // estoque
      changeOrigin: true,
      pathRewrite: {
        '^/v1/stock': '/', 
      },
    })
  );

  app.use(
    '/v1/users',
    createProxyMiddleware({
      target: 'http://34.193.7.217:8801', // users
      changeOrigin: true,
      pathRewrite: {
        '^/v1/users': '/', 
      },
    })
  );

  app.use(
    '/v1/pedidos',
    createProxyMiddleware({
      target: 'http://34.193.7.217:8084', // pedidos
      changeOrigin: true,
      pathRewrite: {
        '^/v1/pedidos': '/', 
      },
    })
  );
  
  app.use(
    '/v1/auth',
    createProxyMiddleware({
      target: 'http://34.193.7.217:8085', // autorizacao
      changeOrigin: true,
      pathRewrite: {
        '^/v1/auth': '/', 
      },
    })
  );
};
