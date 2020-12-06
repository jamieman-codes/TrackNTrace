function COVIDALERTS(date) {
  if(date != ""){
    var data = {
      'Date': date
    };
    var options = {
      'method' : 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload' : JSON.stringify(data)
    };
    var response = UrlFetchApp.fetch('https://trackandtracefun.azurewebsites.net/api/CovidAlerts', options);
    var json = JSON.parse(response.getContentText())
    return json.message;
  }
  return ""
}
