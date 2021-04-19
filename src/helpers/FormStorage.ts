import * as React from 'react';
import { Console, Hash, iMenu, iSession, iSite } from '../models/commonModels';
import { iPage } from '../models/pageModels';


const _storage: Hash<Hash<string | string[]>> = {};

export class FormStorage {
    
    static initForm(formkey: string) {
        _storage[formkey] = {};
    }

    static setValue(formkey: string, fieldName: string, value: string | string[]) {
        _storage[formkey][fieldName] = value;
    }

}