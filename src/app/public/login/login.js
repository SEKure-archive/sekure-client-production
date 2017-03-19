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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var api_1 = require('../../services/api');
var user_1 = require('../../services/user');
var Login = (function () {
    function Login(router, api, user) {
        this.router = router;
        this.api = api;
        this.user = user;
        this.showLogin = true;
        this.working = false;
        this.usernameError = null;
        this.passwordError = null;
    }
    Login.prototype.ngOnInit = function () {
        if (this.user.isLoggedIn()) {
            this.router.navigate(['home']);
        }
        else if (this.user.isSessionExpired()) {
            this.passwordError = 'Your session has expired.';
            this.user.resetSessionExpired();
        }
    };
    Login.prototype.toggleLogin = function () {
        // If an API call is in progress, ignore the button press.
        if (this.working)
            return;
        this.showLogin = !this.showLogin;
        // Reset the form
        this.username.nativeElement.value = '';
        this.password.nativeElement.value = '';
        this.usernameError = null;
        this.passwordError = null;
    };
    Login.prototype.submitForm = function () {
        // If an API call is in progress, ignore the button press.
        if (this.working)
            return;
        var username = this.username.nativeElement.value;
        var password = this.password.nativeElement.value;
        if (this.showLogin) {
            this.login(username, password);
        }
        else {
            this.signup(username, password);
        }
    };
    Login.prototype.login = function (username, password) {
        var _this = this;
        this.working = true;
        this.api.userLogin(username, password)
            .subscribe(function (data) {
            _this.user.setUser(username, data.jwt);
            _this.router.navigate(['home']);
        }, function (err) {
            _this.passwordError = err;
            _this.working = false;
        });
    };
    Login.prototype.signup = function (username, password) {
        var _this = this;
        // Client-side check of username and password
        if (username.length == 0) {
            this.usernameError = 'Username must not be empty.';
        }
        else {
            this.usernameError = null;
        }
        if (password.length < 8) {
            this.passwordError = 'Password must be at least 8 characters long.';
        }
        else if (password.length > 72) {
            this.passwordError = 'Password must be no more than 72 characters long.';
        }
        else {
            this.passwordError = null;
        }
        // Attempt to register if the username and password seem to be OK
        if (this.usernameError == null && this.passwordError == null) {
            this.working = true;
            this.api.userAdd(username, password)
                .subscribe(function (data) {
                _this.user.setUser(username, data.jwt);
                _this.router.navigate(['home']);
            }, function (err) {
                _this.usernameError = err;
                _this.working = false;
            });
        }
    };
    __decorate([
        core_1.ViewChild('username'), 
        __metadata('design:type', core_1.ElementRef)
    ], Login.prototype, "username", void 0);
    __decorate([
        core_1.ViewChild('password'), 
        __metadata('design:type', core_1.ElementRef)
    ], Login.prototype, "password", void 0);
    Login = __decorate([
        core_1.Component({
            // moduleId: module.id,
            selector: 'login',
            templateUrl: 'app/public/login/login.html',
            styleUrls: ['app/public/login/login.css'],
            providers: [api_1.APIService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, api_1.APIService, user_1.UserService])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map