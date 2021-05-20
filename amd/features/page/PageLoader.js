var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "react/jsx-runtime", "react", "react-redux", "redux", "../../models/commonModels", "../../views/Page", "../../features/page/pageSlice"], function (require, exports, jsx_runtime_1, React, react_redux_1, redux_1, commonModels_1, Page_1, pageSlice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    var mapStateToProps = function (state) { return (state.page); };
    /*const mapDispatchToProps = {
        setPage: setPage
    }*/
    // Thunk Action
    var mapDispatchToProps = function (dispatch) { return redux_1.bindActionCreators({
        // в loadPageAsync уже привязан dispatch
        /*load: (path: string, params: Hash<string>) => async (dispatch: AppDispatch): Promise<void> => {
            dispatch(loadPageAsync(path, params))
        },/**/
        load: pageSlice_1.loadPageAsync,
        startLoadPage: pageSlice_1.startLoadPage,
        test: pageSlice_1.testPage
    }, dispatch); }; /* */
    var PageLoader = /** @class */ (function (_super) {
        __extends(PageLoader, _super);
        function PageLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /*constructor(props: iPageProps) {
            super(props);
            this.state = {path: props.newPath};
        }/* */
        //let location = useLocation();
        PageLoader.prototype.componentDidMount = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    //Console.log(this.props.match, this.props.location, this.props.history);
                    this.loadPage(this.props.match.url);
                    return [2 /*return*/];
                });
            });
        };
        PageLoader.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.loadPage(this.props.match.url);
                    return [2 /*return*/];
                });
            });
        }; /* */
        PageLoader.prototype.loadPage = function (path) {
            var _a;
            // добавим дату последнего изменения данных сайта
            //Console.log('session', this.props.session);
            var params = {};
            if (typeof this.props.session !== 'undefined' && typeof this.props.session.site !== 'undefined') {
                params['__siteLM'] = '' + this.props.session.site.lastModified;
            }
            //Console.log('check for load page path=', path, 'key=', this.props.pageWraper?.key, 'loading=', this.props.loadingPath);
            // 1 отсекаем если мы уже грузим эту страницу
            if ( /*path === this.props.pageWraper?.key ||*/path === this.props.loadingPath)
                return;
            // 2 отсекаем если эта страница загружена в данный момент и мы не в состояни загрузки
            if (this.props.loadingPath === '' && path === ((_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.key))
                return;
            commonModels_1.Console.log('------try load page', path, params);
            this.props.load(path, params);
        };
        PageLoader.prototype.render = function () {
            //let { path } = useParams();
            //let path = '';
            //let location = useLocation();
            return jsx_runtime_1.jsx(Page_1.Page, { pageWraper: this.props.pageWraper, loadingPath: this.props.loadingPath, session: this.props.session }, void 0);
        };
        return PageLoader;
    }(React.Component));
    exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps //dispatchProps
    )(PageLoader);
});