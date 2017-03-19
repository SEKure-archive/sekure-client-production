"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import * as jwt from 'jwt-decode/index';
var jwt = require('jwt-decode');
var core_1 = require('@angular/core');
var core_2 = require('angular2-cookie/core');
var JWT_KEY = 'session';
// https://github.com/salemdar/angular2-cookie#put
/** A service that manages the currently logged in user. */
var UserService = (function () {
    function UserService(cookie) {
        this.cookie = cookie;
        this.cookieExpires = 1; //Expire in an hour
        this.cookieHTTPS = false; // Needs to be true for https
        this.username = null;
    }
    UserService.prototype.setUser = function (username, jwt) {
        var temp = new Date().getTime() + this.cookieExpires * 3600 * 1000; //hour is 3600
        var date = new Date(temp);
        var key = 'testCookieKey';
        var value = 'jwt';
        var opts = {
            path: './services/user',
            domain: 'localhost',
            expires: date,
            secure: this.cookieHTTPS,
        };
        this.username = username;
        this.cookie.put(JWT_KEY, jwt, opts);
        localStorage.setItem('username', username);
    };
    /** Unsets the current user and clears authentication information. */
    UserService.prototype.unsetUser = function () {
        this.username = null;
        this.cookie.remove(JWT_KEY);
        localStorage.removeItem('username');
    };
    /** Returns the username of the currently logged in user, if any. */
    UserService.prototype.getUsername = function () {
        if (!this.username) {
            this.username = localStorage.getItem('username');
        }
        return this.username;
    };
    /** Returns the JWT of the currently logged in user, if any. */
    UserService.prototype.getToken = function () {
        // return localStorage.getItem(JWT_KEY);
        return this.cookie.get(JWT_KEY);
    };
    UserService.prototype.setSessionExpired = function () {
        localStorage.setItem('expired', 'true');
        this.unsetUser();
    };
    UserService.prototype.isSessionExpired = function () {
        if (localStorage.getItem('expired'))
            return true;
        else
            return false;
    };
    UserService.prototype.resetSessionExpired = function () {
        localStorage.removeItem('expired');
    };
    /** Returns whether there is currently a user logged in (best effort, token could be invalid). */
    UserService.prototype.isLoggedIn = function () {
        var token = this.getToken();
        if (token) {
            if (jwt(token).exp < new Date().getTime()) {
                return true;
            }
            this.setSessionExpired();
        }
        return false;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_2.CookieService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.js.map