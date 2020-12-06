module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    output = ""
    const testsTable=context.bindings.testsTable;
    const checkinTable=context.bindings.checkinTable;

    whosGotIt = []

    for(var i = 0; i < testsTable.length; i++){
        var testDate = new Date(testsTable[i]['WhenTested'])
        var twoWeeks = testDate.getTime() + 1209600000 //Adds 2 weeks to the test date (length of isolation period) 1209600000 is 2 weeks in miliseconds
        var userId = testsTable[i]['PartitionKey']
        for(var j = 0; j < checkinTable.length; j++){
            var positiveCheckinDate = new Date(checkinTable[j]['CheckinTime'])
            if(userId == checkinTable[j]['UserRow'] && testDate.getTime() < positiveCheckinDate.getTime() && positiveCheckinDate.getTime() < twoWeeks){ //Find user who tested positive Checkins within their isolation period
                var venueId = checkinTable[j]['PartitionKey'] //Gets venue ID of where positive user checked in
                for(var l = 0; l < checkinTable.length; l++){
                    var checkinDate = new Date(checkinTable[l]['CheckinTime']);
                    if(sameDay(checkinDate, positiveCheckinDate) && venueId == checkinTable[l]['PartitionKey']){
                        whosGotIt.push(checkinTable[l]['UserName'])
                    }
                }
            }
        }
    }

    var noDupes = [...new Set(whosGotIt)]; //Removes duplicate names from the list

    for(var i = 0; i < noDupes.length; i++){
        output += "<p>" + noDupes[i] + " needs to self isolate<p>" 
    }

    context.res = {
        status: 200, /* Defaults to 200 */
        body: {message:output}
    };
}

function sameDay(d1, d2) {//Checks if 2 dates are the same day
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}