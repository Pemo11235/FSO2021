"use strict";
exports.__esModule = true;
var parseNumberArgs = function (args, argsAccepted, argsMin) {
    if (argsAccepted === void 0) { argsAccepted = 2; }
    if (argsMin === void 0) { argsMin = 2; }
    var argsMax = argsAccepted + 2;
    if (args.length < argsMax || args.length <= argsMin)
        throw new Error('Not enough arguments !');
    if (args.length > argsMax)
        throw new Error('Too many arguments !');
    var actualArgs = args.slice(2);
    var areArgsNumber = actualArgs.map(function (arg) { return !isNaN(Number(arg)); });
    var argsAreNumbers = areArgsNumber.reduce(function (acc, curr) { return acc && curr; }, true);
    if (!argsAreNumbers)
        throw new Error('Value provided are not numbers !');
    var resultArgs = {};
    actualArgs.forEach(function (arg, index) { return (resultArgs["value".concat(index + 1)] = Number(arg)); });
    return resultArgs;
};
exports["default"] = parseNumberArgs;
