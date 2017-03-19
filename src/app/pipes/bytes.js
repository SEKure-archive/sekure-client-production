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
var KIBI = Math.pow(2, 10);
var MEBI = Math.pow(2, 20);
var GIBI = Math.pow(2, 30);
var TEBI = Math.pow(2, 40);
/** A pipe that transforms bytes to human-readable sizes (e.g., 4.03 GiB). */
var BytesPipe = (function () {
    function BytesPipe() {
    }
    BytesPipe.prototype.transform = function (value, args) {
        var bytes = parseInt(value);
        if (bytes >= TEBI) {
            return (bytes / TEBI).toPrecision(3) + " TiB";
        }
        else if (bytes >= GIBI) {
            return (bytes / GIBI).toPrecision(3) + " GiB";
        }
        else if (bytes >= MEBI) {
            return (bytes / MEBI).toPrecision(3) + " MiB";
        }
        else if (bytes >= KIBI) {
            return (bytes / KIBI).toPrecision(3) + " KiB";
        }
        else {
            return bytes + " B";
        }
    };
    BytesPipe = __decorate([
        core_1.Pipe({ name: 'bytes' }), 
        __metadata('design:paramtypes', [])
    ], BytesPipe);
    return BytesPipe;
}());
exports.BytesPipe = BytesPipe;
//# sourceMappingURL=bytes.js.map