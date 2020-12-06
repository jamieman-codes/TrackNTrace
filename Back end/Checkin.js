module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const outputTable=context.bindings.outputTable;

    var selectedUsers = req.body.selectedUsers
    var selectedVenue = req.body.selectedVenue

    var splitVenue = selectedVenue.split(",");

    var venueName = splitVenue[0]
    var partKey = splitVenue[1] 

    var time=new Date().getTime()

    var checkinTime = new Date();

    context.bindings.outputTable = [];

    for(var i = 0; i < selectedUsers.length; i++){
        var splitUser = selectedUsers[i].split(",");
        var name = splitUser[0]
        var userRow = splitUser[1]
        var theID= time + i

        context.bindings.outputTable.push({
            PartitionKey: partKey,
            RowKey: theID,
            Venue: venueName,
            UserName: name,
            UserRow: userRow,
            CheckinTime: checkinTime
        });
    }

    context.res = {
        status: 200, /* Defaults to 200 */
        body: {message:"Checked in users to " + venueName}
    };
}