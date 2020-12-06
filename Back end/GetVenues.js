module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const inputTable=context.bindings.inputTable;

    output = []
    var i;
    for (i = 0; i < inputTable.length; i++) {
        output.push([inputTable[i]["Name"], inputTable[i]["RowKey"]])
    }

    context.res = {
        status: 200, /* Defaults to 200 */
        body:{data:output}
    };
}