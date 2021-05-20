define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ContentType;
    (function (ContentType) {
        // это не используем так как это по умолчанию и в котенте (шаблоне) стоит null
        //Text = "TEXT",
        ContentType["Link"] = "link";
        ContentType["LinkAdd"] = "linkadd";
        ContentType["LinkEdit"] = "linkedit";
        ContentType["String"] = "string";
        ContentType["Html"] = "html";
        ContentType["Number"] = "number";
        ContentType["List"] = "list";
        ContentType["Tree"] = "tree";
        ContentType["Img"] = "img";
        ContentType["Form"] = "form";
    })(ContentType = exports.ContentType || (exports.ContentType = {}));
    var Console = /** @class */ (function () {
        function Console() {
        }
        Console.log = process.env.NODE_ENV === 'development' ? console.log : function (arg) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        Console.info = process.env.NODE_ENV === 'development' ? console.info : function (arg) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        Console.error = console.error; //process.env.NODE_ENV === 'development' ? console.error : (arg: any, ...args: any[]) => { /* empty */ };
        Console.debug = process.env.NODE_ENV === 'development' ? console.debug : function (arg) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        Console.warn = process.env.NODE_ENV === 'development' ? console.warn : function (arg) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        return Console;
    }());
    exports.Console = Console;
});