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
var api_1 = require('../../services/api');
var FileComponent = (function () {
    function FileComponent(api) {
        this.api = api;
        this.open = false;
    }
    FileComponent.prototype.toggleOpen = function () {
        this.open = !this.open;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', api_1.File)
    ], FileComponent.prototype, "file", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FileComponent.prototype, "even", void 0);
    FileComponent = __decorate([
        core_1.Component({
            // moduleId: module.id,
            selector: 'file',
            templateUrl: 'app/components/file/file.html',
            styleUrls: ['app/components/file/file.css'],
            providers: [api_1.APIService],
        }), 
        __metadata('design:paramtypes', [api_1.APIService])
    ], FileComponent);
    return FileComponent;
}());
exports.FileComponent = FileComponent;
//# sourceMappingURL=file.js.map