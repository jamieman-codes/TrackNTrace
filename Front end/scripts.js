/**
 * Sends a fetch request to the provided URL and sends the response to the formatData function 
 * @param {String} URL URL to send request to 
 * @param {String} formContentId represents the ID to the be used for the form element
 * @param {Boolean} multiple Boolean that decides whether the select box should allow for multiple elements to be selected
 * @param {String} elementId the ID of the Div that is targeted 
 */
function loadData(URL, formContentId, multiple, divID){
    fetch(URL).then((res => formatData(res, formContentId, multiple, divID))) //gets list of venues and there row number
}

/**
 * Takes in a reponse from an Azure function and formats the response as a multiple select box 
 * @param {JSON} response JSON reponse from Azure function
 * @param {String}} name represents the ID to the be used for the form element
 * @param {Boolean} multiple Boolean that decides whether the select box should allow for multiple elements to be selected
 * @param {String} elementId the ID of the Div that is targeted 
 */
function formatData(response, name, multiple, elementId){
    if (response.status === 200) {
            response.json()
                .then(function(data){
                    dataAraay = data.data
                    var options = "";
                    for (var i = 0; i < dataAraay.length; i++) {
                        options+= "<option value='"+dataAraay[i]+"'>"+dataAraay[i][0] + "</option>" //Adds all the data as options for a selection box
                    }
                    var someHTML = `<select name="${name}" id="${name}" size=10 required`;
                    if (multiple){
                        someHTML += ` multiple` //Adds multiple to the selection box to allow for multiple users to be selected
                    }
                    someHTML +=`
                        >
                        ${options}
                        </select>
                    `;  //Formats the data as a selection box
                    document.getElementById(elementId).innerHTML = someHTML;
                 })
                .catch(function () { var someHTML=`
                    <div>
                    Could not load ${name}: JSON ERROR
                    </div>
                    `;
                    document.getElementById(elementId).innerHTML = someHTML;});
        } else {
            var someHTML=`
                <div>
                Could not load ${name}: AZURE ERROR
                </div>
                `;
                document.getElementById(elementId).innerHTML = someHTML;
            }
}

/**
 * Submits a new checkin for multiple users
 */
function submitNewUserCheckin(){
    let selectedVenue = document.getElementById('venues').value;
    let usersFormSelected = document.getElementById('users');
    
    selectedUsers = []
    for (var i = 0; i < usersFormSelected.selectedOptions.length; i++) { //Gets all selected users 
        selectedUsers.push(usersFormSelected.selectedOptions[i].value)
    }

    body = JSON.stringify({
        selectedVenue: selectedVenue,
        selectedUsers: selectedUsers
    })

    submitMessage('https://trackandtracefun.azurewebsites.net/api/Checkin', body)
}


/**
 * Returns all the checkins for a selected user
 */
function getUserCheckins(){
    let selectedUser = document.getElementById('users').value;
    selectedUser = selectedUser.split(",");
    var userId = selectedUser[1]
    
    body = JSON.stringify({
        selectedUser: userId
    })

    submitMessage('https://trackandtracefun.azurewebsites.net/api/GetUserCheckins', body)
}

/**
 * Returns all the checkins for a selected venue
 */
function getVenueCheckins(){
    let selectedVenue = document.getElementById('venues').value;
    selectedVenue = selectedVenue.split(",");
    var venueId = selectedVenue[1]

    body = JSON.stringify({
        selectedVenue: venueId
    })

    submitMessage('https://trackandtracefun.azurewebsites.net/api/GetVenueCheckins', body)
}

/**
 * Submits a new positive test for a selected user on a selected date
 */
function submitNewTest(){
    let selectedUser = document.getElementById('users').value;
    selectedUser = selectedUser.split(",");
    let testDate = document.getElementById('testDate').value;

    body = JSON.stringify({
        user: selectedUser[0],
        userID: selectedUser[1],
        testDate: testDate
    });

    submitMessage('https://trackandtracefun.azurewebsites.net/api/AddTest', body)
}

/**
 * Submits a new User 
 */
function submitNewUser(){
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let dob = document.getElementById('DOB').value;

    body = JSON.stringify({
        fname: fname,
        lname: lname,
        dob: dob
    });

    submitMessage('https://trackandtracefun.azurewebsites.net/api/AddUser', body)
}

/**
 * Submits a new venue
 */
function submitNewVenue(){
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let maxCap = document.getElementById('maxCap').value;

    body = JSON.stringify({
        name: name,
        address: address,
        maxCap: maxCap
    })

    submitMessage('https://trackandtracefun.azurewebsites.net/api/AddVenue', body)
}

/**
 * Returns the list of everyone that needs to isolate
 */
function getIsolationList(){
    body = JSON.stringify({})
    console.log("here")
    submitMessage('https://trackandtracefun.azurewebsites.net/api/GenerateSelfIsolationList', body)
}

/**
 * Submits a JSON to an Azure function
 * @param {String} URL URL to Azure function
 * @param {JSON} body Contains information needed for function to complete
 */
function submitMessage(URL, body) {
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: body
        })
        .then((res) => processResponse(res))
    }

/**
 * Proccesses a reponse from an Azure function
 * @param {JSON} response 
 */
function processResponse(response) {
        if (response.status === 200) {
            response.json()
                .then(function(data){ showMessage(data.message) })
                .catch(function () { showError("JSON Messed Up"); });
        } else {
            showError("Azure Function problem")
            }
    }

/**
 * Displays output message from Azure function to user
 * @param {String} theMessage Message extracted from JSON in processReponse function
 */
function showMessage(theMessage) {
        var someHTML=`
            <div>
            ${theMessage}
            </div>
            `;
        document.getElementById('output').innerHTML = someHTML;
        }

/**
 * Displays error to user
 * @param {String} theError error message to display
 */
function showError(theError) {
        var someHTML=`
            <div>
            oh no! Something went wrong - ${theError} :(
            </div>
            `;
        document.getElementById('output').innerHTML = someHTML;
        }