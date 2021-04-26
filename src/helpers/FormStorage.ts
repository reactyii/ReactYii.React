import * as React from 'react';
import { Console, Hash, iMenu, iSession, iSite } from '../models/commonModels';
import { iPage } from '../models/pageModels';
import { Utils } from './Utils';


const _storage: Hash<Hash<string | string[]>> = {};

export class FormStorage {
    
    static initForm(formkey: string) {
        _storage[formkey] = {};
    }

    static setValue(formkey: string, fieldName: string, value: string | string[]) {
        Console.log('setValue', fieldName, value);
        _storage[formkey][fieldName] = value;
    }

    static getFilterContentArgs(formkey: string) {
        return Utils.joinUrlParams(_storage[formkey]);//.replace('&', encodeURIComponent('&'));
    }

}