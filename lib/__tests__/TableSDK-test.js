// import 'react-native';
// import React from 'react';
import {TableSDK} from '../TableSDK'


describe('Checking init inputs', () => {
    it('Handles trailing slashes', async () => {
        await TableSDK.init('https://develop3.dev.table.co/', 'YOUR_SDK_API_KEY',)
        expect(global).toEqual('YOUR_SDK_API_KEY')
    })
})
