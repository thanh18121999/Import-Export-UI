var HOST_SHIPMENT = process.env.HOST_SHIPMENT;
var HOST_UIPARS = process.env.HOST_UIPARS;
var TOKEN = process.env.TOKEN;

const getToken = async() => {
    return TOKEN;
};
export const getReleasedOrder = async() => {
    var json_request = JSON.stringify({
        Type: "ORDERSHIPPING_GET_RELEASED",
    });
    let token = await getToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/shipment/query`, {
        method: "POST",
        // credentials : "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: json_request,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        return res;
    } else {
        return null;
    }
};

export const getWarehouseList = async() => {
    let token = await getToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/warehouse/get`, {
        // credentials : "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        return res;
    } else {
        return null;
    }
};

export const createExportTranferList = async(data, successFunc, errorFuc) => {
    let token = await getToken();
    let post_data = JSON.stringify(data);
    console.log(post_data);
    let res = await fetch(`${HOST_SHIPMENT}/api/im-export/add`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: post_data,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        successFunc();
        return res;
    } else {
        errorFuc();
        return null;
    }
};

// Lấy phiếu nhập nè đc chưa

export const getImportList = async(data, loadingFail) => {
    let dataImport = JSON.stringify({
        Type: "IMEXPORT_GET_ALL",
        FromDate: data.startDate,
        ToDate: data.endDate + " 23:59:00",
        Data: "",
    });
    console.log(dataImport);
    let token = await getToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/im-export/get-import`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: dataImport,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        var res_ = res.RESPONSES;
        loadingFail();
        if (res_) {
            let res__ = res_.map((x) => ({...x, key: x.ID }));
            return res__;
        }

        return res_;
    } else {
        loadingFail();
        return null;
    }
};

export const postConfirmUpdate = async(data, successFunc, errorFuc) => {
    let token = await getToken();
    let dataJson = JSON.stringify(data);
    let res = await fetch(`${HOST_SHIPMENT}/api/im-export/update`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: dataJson,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        successFunc();
        return res;
    } else {
        errorFuc();
        return null;
    }
};