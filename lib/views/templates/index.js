"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = exports.Message = exports.Error = exports.Layout = exports.A = exports.FormReset = exports.FormSubmit = exports.FieldHidden = exports.FieldSelect = exports.FieldFilterSelect = exports.FieldFilter = exports.Field = exports.FormFilter = exports.Form = exports.Paginator = exports.ListContent = exports.List = exports.H1 = void 0;
var H1_1 = require("./H1");
Object.defineProperty(exports, "H1", { enumerable: true, get: function () { return H1_1.H1; } });
var A_1 = require("./A");
Object.defineProperty(exports, "A", { enumerable: true, get: function () { return A_1.A; } });
var List_1 = require("./List");
Object.defineProperty(exports, "List", { enumerable: true, get: function () { return List_1.List; } });
var ListContent_1 = require("./ListContent");
Object.defineProperty(exports, "ListContent", { enumerable: true, get: function () { return ListContent_1.ListContent; } });
var Paginator_1 = require("./Paginator");
Object.defineProperty(exports, "Paginator", { enumerable: true, get: function () { return Paginator_1.Paginator; } });
var Layout_1 = require("./Layout");
Object.defineProperty(exports, "Layout", { enumerable: true, get: function () { return Layout_1.Layout; } });
var Form_1 = require("./Form");
Object.defineProperty(exports, "Form", { enumerable: true, get: function () { return Form_1.Form; } });
//import { FormFilterContent } from './FormFilterContent';
var FormFilter_1 = require("./FormFilter");
Object.defineProperty(exports, "FormFilter", { enumerable: true, get: function () { return FormFilter_1.FormFilter; } });
var FormSubmit_1 = require("./FormSubmit");
Object.defineProperty(exports, "FormSubmit", { enumerable: true, get: function () { return FormSubmit_1.FormSubmit; } });
var FormReset_1 = require("./FormReset");
Object.defineProperty(exports, "FormReset", { enumerable: true, get: function () { return FormReset_1.FormReset; } });
var Field_1 = require("./Field");
Object.defineProperty(exports, "Field", { enumerable: true, get: function () { return Field_1.Field; } });
var FieldFilter_1 = require("./FieldFilter");
Object.defineProperty(exports, "FieldFilter", { enumerable: true, get: function () { return FieldFilter_1.FieldFilter; } });
var FieldFilterSelect_1 = require("./FieldFilterSelect");
Object.defineProperty(exports, "FieldFilterSelect", { enumerable: true, get: function () { return FieldFilterSelect_1.FieldFilterSelect; } });
var FieldSelect_1 = require("./FieldSelect");
Object.defineProperty(exports, "FieldSelect", { enumerable: true, get: function () { return FieldSelect_1.FieldSelect; } });
var FieldHidden_1 = require("./FieldHidden");
Object.defineProperty(exports, "FieldHidden", { enumerable: true, get: function () { return FieldHidden_1.FieldHidden; } });
var Error_1 = require("./Error");
Object.defineProperty(exports, "Error", { enumerable: true, get: function () { return Error_1.Error; } });
var Message_1 = require("./Message");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return Message_1.Message; } });
exports.Templates = {
    H1: H1_1.H1,
    A: A_1.A,
    List: List_1.List,
    ListContent: ListContent_1.ListContent,
    Form: Form_1.Form,
    FormFilter: FormFilter_1.FormFilter,
    //FormFilterContent: FormFilterContent,
    Field: Field_1.Field,
    FieldFilter: FieldFilter_1.FieldFilter,
    FieldFilterSelect: FieldFilterSelect_1.FieldFilterSelect,
    FieldSelect: FieldSelect_1.FieldSelect,
    FieldHidden: FieldHidden_1.FieldHidden,
    FormSubmit: FormSubmit_1.FormSubmit,
    FormReset: FormReset_1.FormReset,
    Paginator: Paginator_1.Paginator,
    Layout: Layout_1.Layout,
    Error: Error_1.Error,
    Message: Message_1.Message,
    //WideLayout: WideLayout
};