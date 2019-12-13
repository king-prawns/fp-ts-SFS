"use strict";
exports.__esModule = true;
var t = require("io-ts");
var Either_1 = require("fp-ts/lib/Either");
var pipeable_1 = require("fp-ts/lib/pipeable");
var User = t.type({
    key1: t.string,
    key2: t.number,
    key3: t.boolean
});
var userMockOK = {
    key1: "test_key_1",
    key2: 123,
    key3: false
};
var userMockKO = {
    key1: "test_key_1",
    key2: "123",
    key3: false
};
var onLeft = function (error) { return error; };
var onRight = function (user) { return user; };
pipeable_1.pipe(User.decode(userMockKO), Either_1.fold(onLeft, onRight), console.log);
// SAME WITHOUT FP-TS
var result = User.decode(userMockOK);
if (result._tag === "Right") {
    console.log(result.right);
}
else {
    throw new Error("something wrong");
}
