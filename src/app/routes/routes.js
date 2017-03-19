"use strict";
var router_1 = require('@angular/router');
var home_1 = require('../public/home/home');
var login_1 = require('../public/login/login');
// import { Signup } from './public/signup/signup';
var authguard_1 = require('./authguard');
exports.routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_1.Login },
    { path: 'home', component: home_1.Home, canActivate: [authguard_1.AuthGuard] },
    { path: '**', redirectTo: 'login' },
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=routes.js.map