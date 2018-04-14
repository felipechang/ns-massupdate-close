/**
 * Mass close NetSuite transactions
 *
 * @author Felipe Chang <felipechang@hardcake.org>
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 * @NScriptType MassUpdateScript
 */
define(["require", "exports", "N/record", "N/log"], function (require, exports, record_1, log) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.each = function (params) {
        try {
            //Load order
            var order = record_1.load(params);
            //Close lines
            var count = order.getLineCount({ sublistId: "item" });
            for (var i = 0; i < count; i++) {
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
});
