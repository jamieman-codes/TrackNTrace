module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const inputTable=context.bindings.inputTable;

    var selectedUser = req.body.selectedUser

    output = ""
    var date;
    for (var i = 0; i < inputTable.length; i++) {
        if(selectedUser == inputTable[i]["UserRow"]){
            date = new Date(inputTable[i]["CheckinTime"])
            output += "<p>Checked in at " + inputTable[i]["Venue"] + " on " + date.getDate() + "/" +date.getMonth() + "/" + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes()  +"<p>"
        }
    }

    if(output == ""){
        output = "No checkins reported"
    }

    context.res = {
        body: {message:output}
    };
}