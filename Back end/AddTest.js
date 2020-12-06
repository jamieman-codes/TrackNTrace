module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var user = req.body.user
    var userId = req.body.userID
    var testDate = req.body.testDate

    var theID=new Date().getTime()

    var tableData = {
        PartitionKey: userId,
        RowKey: theID,
        UserName: user,
        WhenTested: testDate
    }


    context.bindings.outputTable = tableData;
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {message:"Reported test for " + user}
    };
}