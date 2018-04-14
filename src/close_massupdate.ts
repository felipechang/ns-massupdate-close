/**
 * Mass close NetSuite transactions
 *
 * @author Felipe Chang <felipechang@hardcake.org>
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 * @NScriptType MassUpdateScript
 */

import {EntryPoints} from 'N/types';
import {load} from "N/record";
import * as log from 'N/log';

export let each: EntryPoints.MassUpdate.each = (params: EntryPoints.MassUpdate.eachContext) => {
    try {

        //Load order
        let order = load(params);

        //Close lines
        const count = order.getLineCount({sublistId: "item"});
        for (let i = 0; i < count; i++) {
            order.setSublistValue({
                sublistId: "item",
                fieldId: "isclosed",
                line: i,
                value: true
            });
        }

        //Save
        order.save();

        //Success
        log.audit("Closed", params);
    }
    catch (e) {
        log.error("Error Closing", e);
    }
};
