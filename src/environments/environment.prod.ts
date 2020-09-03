export const environment = {
  production: true,
  apiUrl: 'https://protected-stream-77116.herokuapp.com',
  tokenWhitelistedDomains: [ new RegExp('protected-stream-77116.herokuapp.com') ],
  tokenBlacklistedRoutes: [ 
    new RegExp('\/oauth\/token'),
    new RegExp('\/pessoas\/adicionar'),
    new RegExp('\/usuarios\/validar-autenticacao') 
  ]
};
