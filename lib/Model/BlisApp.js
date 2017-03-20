"use strict";
var tslib_1 = require("tslib");
var json_typescript_mapper_1 = require("json-typescript-mapper");
var Action_1 = require("./Action");
var Entity_1 = require("./Entity");
var TrainDialog_1 = require("./TrainDialog");
var BlisApp = (function () {
    function BlisApp(init) {
        this.actions = undefined;
        this.entities = undefined;
        this.trainDialogs = undefined;
        Object.assign(this, init);
    }
    return BlisApp;
}());
tslib_1.__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Action_1.Action, name: 'action' }),
    tslib_1.__metadata("design:type", Array)
], BlisApp.prototype, "actions", void 0);
tslib_1.__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Entity_1.Entity, name: 'entity' }),
    tslib_1.__metadata("design:type", Array)
], BlisApp.prototype, "entities", void 0);
tslib_1.__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: TrainDialog_1.TrainDialog, name: 'traindialog' }),
    tslib_1.__metadata("design:type", Array)
], BlisApp.prototype, "trainDialogs", void 0);
exports.BlisApp = BlisApp;
//# sourceMappingURL=BlisApp.js.map