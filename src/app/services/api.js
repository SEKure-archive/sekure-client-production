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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/timeout');
var user_1 = require('./user');
function convertFolder(data) {
    return {
        id: data.id,
        path: data.path,
        created: new Date(data.created),
        modified: new Date(data.modified),
    };
}
var APIService = (function () {
    function APIService(http, user) {
        this.http = http;
        this.user = user;
        this.URL = 'http://172.17.0.2:80';
        this.timeOut = 3000;
        console.log('Postservice initialized...');
    }
    /** Submits non-GET requests (which *do* have a JSON body). */
    APIService.prototype.makeRequest = function (method, path, body, authorization) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Access-Control-Allow-Origin', '*');
        // authentication not null
        if (authorization) {
            headers.append('authorization', "Bearer " + this.user.getToken());
        }
        //Data
        var options = new http_1.RequestOptions({
            'url': this.URL + path,
            'body': body,
            'method': method,
            'headers': headers
        });
        return this.http.request(new http_1.Request(options))
            .timeout(this.timeOut)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            if ('json' in error) {
                if (error.status == 400) {
                    return Observable_1.Observable.throw('Invalid request.');
                }
                else {
                    return Observable_1.Observable.throw(error.json().error || 'Internal server error.');
                }
            }
            else {
                return Observable_1.Observable.throw('Could not establish a connection to the server.');
            }
        });
    };
    // *************************   API CALLS ***********************************
    // *************************   USER ACCOUNT ********************************
    // Creates a new user and returns a jws
    // var body = {"email": "userEmail","password": "userPassword"};
    APIService.prototype.userAdd = function (email, password) {
        var body = JSON.stringify({ 'email': email, 'password': password });
        return this.makeRequest(http_1.RequestMethod.Post, '/accounts', body, false);
    };
    // INPUT: User Name & Password
    // OUTPUT:  returns a id_token
    APIService.prototype.userLogin = function (email, password) {
        var body = JSON.stringify({ 'email': email, 'password': password });
        return this.makeRequest(http_1.RequestMethod.Post, '/accounts/login', body, false);
    };
    // *************************   FOLDERS   ********************************
    // INPUT: folder id
    // OUTPUT: folder data
    APIService.prototype.getFolder = function (id) {
        return this.makeRequest(http_1.RequestMethod.Get, "/folders/" + id, null, true).map(function (data) { return data.files; });
    };
    // INPUT: folder path
    // OUTPUT: folder id
    APIService.prototype.postFolder = function (path) {
        var body = JSON.stringify({ 'path': path });
        return this.makeRequest(http_1.RequestMethod.Post, '/folders', body, true);
    };
    // *************************  Multiple   FOLDERS   **************************
    //  INPUT: id_token  OUTPUT: JSON of all folders
    //  OUTPUT: Array of all folders
    APIService.prototype.getALLFolders = function () {
        return this.makeRequest(http_1.RequestMethod.Get, '/folders', null, true).map(function (data) {
            return data.folders.map(convertFolder);
        });
    };
    // *************************  Single  FILES   ********************************
    // INPUT: file id
    // OUTPUT: file id : number, folder_id: number, name: string, mime: string
    APIService.prototype.getFileByID = function (id) {
        return this.makeRequest(http_1.RequestMethod.Get, "/files/" + id, null, true);
    };
    // INPUT: folder id and file name
    // OUTPUT: file id
    APIService.prototype.postFile = function (folder_id, fileName) {
        var body = JSON.stringify({ 'folder_id': folder_id, name: fileName });
        return this.makeRequest(http_1.RequestMethod.Post, '/files', body, true);
    };
    APIService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, user_1.UserService])
    ], APIService);
    return APIService;
}());
exports.APIService = APIService;
//# sourceMappingURL=api.js.map