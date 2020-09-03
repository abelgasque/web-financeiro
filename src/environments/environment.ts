export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],
  tokenBlacklistedRoutes: [ 
    new RegExp('\/oauth\/token'),
    new RegExp('\/pessoas\/adicionar'),
    new RegExp('\/usuarios\/validar-autenticacao')
  ]
};