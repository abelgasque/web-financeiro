export const environment = {
  production: true,
  apiUrl: 'https://polar-river-52878.herokuapp.com',
  tokenWhitelistedDomains: [ new RegExp('https://polar-river-52878.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
