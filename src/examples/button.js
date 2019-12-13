"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        if (!this.props.disabled) {
            this.props.onClick();
        }
        return ("<div>example</div>");
    };
    return Button;
}(react_1["default"].Component));
var ButtonPowered = /** @class */ (function (_super) {
    __extends(ButtonPowered, _super);
    function ButtonPowered() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonPowered.prototype.render = function () {
        switch (this.props.type) {
            case 'ENABLE':
                this.props.onClick(); // :)
            case 'READONLY':
            // You can not invoke here onClick
        }
        return ("<div>example</div>");
    };
    return ButtonPowered;
}(react_1["default"].Component));
