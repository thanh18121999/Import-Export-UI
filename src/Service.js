var HOST_SHIPMENT = process.env.HOST_SHIPMENT
var HOST_UIPARS = process.env.HOST_UIPARS
var TOKEN = process.env.TOKEN

const getToken = async () => {
    return TOKEN;
}
export const getReleasedOrder = async () => {
    var json_request = JSON.stringify({
        Type: "ORDERSHIPPING_GET_RELEASED"
    })
    let token = await getToken();
    let res = await fetch("http://localhost:5020/api/shipment/query",{
        method : "POST",
        // credentials : "include",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
                },
        body : json_request
    })
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success")
    {
        return res;
    }
    else { return null;}
}