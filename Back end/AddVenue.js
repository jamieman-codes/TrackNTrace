module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const outputTable=context.bindings.outputTable;
    
    var thePart="1"
    var theID=new Date().getTime() // crude unique ID = ms since epoch
    var name=req.query.name || req.body.name
    var address=req.query.address || req.body.address
    var maxCap=req.query.maxCap || req.body.maxCap

    var tableData = {
        PartitionKey: thePart,
        RowKey: theID,
        Name: name,
        Address: address,
        MaxCapcity: maxCap
    };

    // Write this data directly to the Table Service
    context.bindings.outputTable = tableData;
    context.res = {
    status: 200, /* Defaults to 200 */
    body: {message:"Added venue " + name +" to storage "}
    };
};