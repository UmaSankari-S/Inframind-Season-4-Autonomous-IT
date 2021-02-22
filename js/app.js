import FetchService from './service/FetchService';

/*-- Objects --*/
const fetchService = new FetchService();
/*-- /Objects --*/

/*--Functions--*/
async function submitForm(e, form) {
    // 1. Prevent reloading page
    e.preventDefault();
    // 2. Submit the form
    // 2.1 User Interaction
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    // 2.2 Build JSON body
    const jsonFormData = buildJsonFormData(form);
    // 2.3 Build Headers
    const headers = buildHeaders();
    // 2.4 Request & Response
    const response = await fetchService.performPostHttpRequest(` https://bmnre97ly4.execute-api.us-east-1.amazonaws.com/default/ALBASGRDSWordpressSite`, headers, jsonFormData); // Uses JSON Placeholder
    console.log(response);
    // 2.5 Inform user of result
    if(response)
        window.location = `/success.html?Sname=${response.SName}&InsName=${response.InsName}&Instancetype=${response.Instancetype}&keyname=${response.keyname}&ssh=${response.ssh}&subnets=${response.subnets}&VPcld=${response.VPcld}&dbclass=${response.dbclass}&dbname=${response.dbname}&dbus=${response.dbus}&dbpass=${response.dbpass}&WebServer=${response.WebServer}&DbStorage=${response.DbStorage}`;
    else
        alert(`An error occured.`);
}

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json"
       
    };
    return headers;
}

function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}
/*--/Functions--*/

/*--Event Listeners--*/
const sampleForm = document.querySelector("#sampleForm");
if(sampleForm) {
    sampleForm.addEventListener("submit", function(e) {
        submitForm(e, this);
    });
}
/*--/Event Listeners--*/
