module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const inputTable=context.bindings.inputTable;

    var selectedVenue = req.body.selectedVenue

    output = ""
    var date;
    for (var i = 0; i < inputTable.length; i++) {
        if(selectedVenue == inputTable[i]["PartitionKey"]){
            date = new Date(inputTable[i]["CheckinTime"])
            output += "<p>"+ inputTable[i]["UserName"] +" checked in on " + date.getDate() + "/" +date.getMonth() + "/" + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes()  +"<p>"
        }
    }

    if(output == ""){
        output = "No checkins reported"
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {message:output}
    };
}