module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const outputTable=context.bindings.outputTable;
    
    var thePart="1"
    var theID=new Date().getTime() // crude unique ID = ms since epoch
    var fname= req.body.fname
    var lname=req.body.lname
    var dob=req.body.dob

    var tableData = {
        PartitionKey: thePart,
        RowKey: theID,
        FirstName: fname,
        LastName: lname,
        DOB: dob
    };

    // Write this data directly to the Table Service
    context.bindings.outputTable = tableData;
    context.res = {
    status: 200, /* Defaults to 200 */
    body: {message:"Added user " + fname + " " + lname + " to storage "}
    };
};