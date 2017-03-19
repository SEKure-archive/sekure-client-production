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
var FolderComponent = (function () {
    function FolderComponent(api) {
        this.api = api;
        this.open = false;
        this.files = null;
    }
    FolderComponent.prototype.loadContents = function () {
        var _this = this;
        this.api.getFolder(this.folder.id).subscribe(function (files) {
            _this.files = files;
        });
    };
    FolderComponent.prototype.toggleOpen = function () {
        if (!this.open && !this.files) {
            this.loadContents();
        }
        this.open = !this.open;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FolderComponent.prototype, "folder", void 0);
    FolderComponent = __decorate([
        core_1.Component({
            // moduleId: module.id,
            selector: 'folder',
            templateUrl: 'app/components/folder/folder.html',
            styleUrls: ['app/components/folder/folder.css'],
            providers: [api_1.APIService]
        }), 
        __metadata('design:paramtypes', [api_1.APIService])
    ], FolderComponent);
    return FolderComponent;
}());
exports.FolderComponent = FolderComponent;
//# sourceMappingURL=folder.js.map