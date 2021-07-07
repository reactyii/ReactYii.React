var _a;
import { createSlice } from '@reduxjs/toolkit';
import { pageRepository } from '../../models/pageRepository';
import { Console, ContentType } from '../../models/commonModels';
//import { Content } from '../../views/Content';
// https://github.com/stereobooster/react-snap
// Grab the state from a global variable injected into the server-generated HTML
var _state = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined;
var preloadedState = typeof _state !== 'undefined' ? _state.page : undefined;
// в данный момент для SSR мы используем только данные самой страницы все остальные сторы не участвуют в генерации контента
if (typeof window !== 'undefined') {
    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__;
} /**/
var initialState = {
    //currentPath: '',
    loadingPath: '',
    //forms: {},
    //page: null,
    //value: {},
};
var fieldtypes = ['field'];
function fillForm(content) {
    var fields = {};
    for (var i = 0, l = content.length; i < l; i++) {
        var c = content[i];
        if (fieldtypes.indexOf(c.type) >= 0) {
            if (typeof c.settings === 'undefined' || typeof c.settings.fieldname === 'undefined') {
                Console.error('Единица контента типа "' + c.type + '" не имеет имени поля.', c);
                continue;
            }
            else {
                var n = c.settings.fieldname;
                if (typeof c.settings.value !== 'undefined')
                    fields[n] = c.settings.value;
            }
        }
    }
    return fields;
}
function findForms(content) {
    var forms = {};
    for (var i = 0, l = content.length; i < l; i++) {
        var c = content[i];
        /*if (!c) {
            Console.error('content[' + i + '] is WTF:', content);
            continue;
        }
        if (typeof c.type === 'undefined') {
            Console.error('c.type is undefined:', c);
            continue;
        }/**/
        if (c.type !== ContentType.Form) {
            var _form = findForms(c.childs || []);
            for (var k in _form) {
                forms[k] = _form[k];
            }
            continue;
        }
        if (typeof c.settings === 'undefined' || typeof c.settings.path === 'undefined') {
            Console.error('У формы "' + (c.id) + '" не указан path.', c);
            continue;
        }
        forms[c.settings.path] = fillForm(c.childs || []);
    }
    return forms;
}
export var pageSlice = createSlice({
    name: 'page',
    initialState: preloadedState || initialState,
    reducers: {
        testPage: function (state) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            //state.value += 1;
            Console.log('TEST');
        },
        // ------------------------------ forms
        clearForm: function (state, action) {
            var _a;
            if (!((_a = state.pageWraper) === null || _a === void 0 ? void 0 : _a.item))
                return;
            var formkey = action.payload.formkey;
            var fullClear = action.payload.fullClear || false;
            if (typeof state.pageWraper.item.forms[formkey] === 'undefined')
                return;
            if (fullClear) {
                state.pageWraper.item.forms[formkey] = {};
                return;
            }
            for (var i in state.pageWraper.item.forms[formkey]) {
                if (i.startsWith('_'))
                    continue; // все поля начинающиеся с '_' считаем системными (типа сортировки)
                delete state.pageWraper.item.forms[formkey][i];
            }
        },
        /*getFilterContentArgs(state, action: PayloadAction<string>): string {
            if (typeof _storage[formkey] === 'undefined') return '';
            return Utils.joinUrlParams(_storage[formkey]);//.replace('&', encodeURIComponent('&'));
        },*/
        setFieldValue: function (state, action) {
            var _a;
            if (!((_a = state.pageWraper) === null || _a === void 0 ? void 0 : _a.item))
                return;
            var formkey = action.payload.formkey;
            var fieldName = action.payload.fieldName;
            var value = action.payload.value;
            if (typeof state.pageWraper.item.forms[formkey] === 'undefined')
                return;
            Console.log('setValue', fieldName, value);
            state.pageWraper.item.forms[formkey][fieldName] = value;
        },
        startFormSubmit: function (state, action) {
            state.loadingPath = action.payload; // устанавливаем признак загрузки
            // todo сделать признак того что форма сабмитится. херить данные всех форм идея так себе, но и возможность юзеру менять данные при сабмите тоже не айс
            // в теории мы так можем скрыть форму
            /*if (state.pageWraper?.item) {
                state.pageWraper.item.forms = {};
                Console.log('clear forms');
            }/**/
            Console.log('startFormSubmit', action.payload);
        },
        /*endFormSubmit: (state, action: PayloadAction<iWrapLoadableItem<iPage>>) => {
            Console.log('endFormSubmit');
        },*/
        // ------------------------------ / forms
        startLoadPage: function (state, action) {
            state.loadingPath = action.payload; // устанавливаем признак загрузки
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        endLoadPage: function (state, action) {
            //Console.log('endLoadPage:', action.payload.key, 'loadingPath=', state.loadingPath);
            var _a, _b, _c, _d, _e;
            // нужно проверить может быть юзер уже грузит другую страницу
            if (state.loadingPath !== action.payload.key)
                return;
            Console.log('setPage:', action.payload);
            state.pageWraper = action.payload;
            if (state.pageWraper.item) {
                state.pageWraper.item.forms = findForms(state.pageWraper.item.content || []);
                //Console.log('forms=', state.pageWraper.item.forms);
            }
            if (typeof state.session === 'undefined')
                state.session = {};
            if (typeof ((_b = (_a = action.payload.item) === null || _a === void 0 ? void 0 : _a.session) === null || _b === void 0 ? void 0 : _b.site) !== 'undefined') {
                //Console.log('setSite:', action.payload.item.session.site);
                state.session.site = action.payload.item.session.site;
                var _hash_1 = {};
                if (typeof state.session.site !== 'undefined')
                    state.session.site.sections.forEach(function (s) { _hash_1['_' + s.id] = s; });
                state.session.site.sections_hash = _hash_1;
            }
            if (typeof ((_d = (_c = action.payload.item) === null || _c === void 0 ? void 0 : _c.session) === null || _d === void 0 ? void 0 : _d.user) !== 'undefined') {
                state.session.user = action.payload.item.session.user;
            }
            (_e = state.pageWraper.item) === null || _e === void 0 ? true : delete _e.session; // чтоб место не занимало
            state.loadingPath = '';
        }
    },
});
export var testPage = (_a = pageSlice.actions, _a.testPage), startLoadPage = _a.startLoadPage, endLoadPage = _a.endLoadPage, clearForm = _a.clearForm, setFieldValue = _a.setFieldValue, startFormSubmit = _a.startFormSubmit /*, endFormSubmit*/;
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export var loadPageAsync = function (path, get) { return function (dispatch) {
    Console.log('start loading:', path);
    dispatch(startLoadPage(path));
    pageRepository.get(path, get, function (item) {
        //Console.log('loaded:', item);
        //setTimeout(() => {
        dispatch(endLoadPage(item));
        //}, 1000);/* */
    });
    /*setTimeout(() => {
        Console.log('loaded:', path);
        let page: iPage = {key: path, template: '', layout: '', contents: []};
        dispatch(endLoadPage(page));
    }, 1000);/* */
}; };
export var postFormAsync = function (path, get, post) { return function (dispatch) {
    Console.log('start post:', path);
    dispatch(startFormSubmit(path));
    pageRepository.post(path, get, post, function (item) {
        //Console.log('loaded:', item);
        //setTimeout(() => {
        dispatch(endLoadPage(item));
        //}, 1000);/* */
    });
    /*setTimeout(() => {
        Console.log('loaded:', path);
        let page: iPage = {key: path, template: '', layout: '', contents: []};
        dispatch(endLoadPage(page));
    }, 1000);/* */
}; };
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export var selectPage = function (state) { return state.page.pageWraper; };
export default pageSlice.reducer;
