module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const inputTable=context.bindings.inputTable;
    
    output = []
    for (var i = 0; i < inputTable.length; i++) {
        var username = inputTable[i]["FirstName"] + " " + inputTable[i]["LastName"]
        output.push([username, inputTable[i]["RowKey"]])
    }

    context.res = {
        status: 200, /* Defaults to 200 */
        body:{data:output}
    };
}