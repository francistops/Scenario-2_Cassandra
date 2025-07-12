const BASE_URL = 'https://api.andre.ca';

async function call(ressource, method, obj, log) {
    let json = null
    let params = {
        method: method,
        headers: buildHeaders()
    };
    if (obj != null) {
        params.body = JSON.stringify(obj);
    }

    try {
        const response = await fetch(`${BASE_URL}/${ressource}`, params);
        const json = await response.json();
        return json
    } catch (error) {
        console.log(log);
        log.level = 'kill'
        await sendLog(log)
    }


    return json;
}

function buildHeaders() {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    return headers;
}


export async function sendLog(log) {
    // console.table('frontend sendLog ', log);
    await call('logs', 'POST', log, log);
}

export async function getLogs() {
    const data = await call('logs', 'GET');
    if (data.errorCode == 0) {
        return data.logs
    }
    return null;
}

export async function testCall(body, log) {
    let bogus
    if (body.action === 'failed') {
        bogus = await call('logs/bogus', 'POST', body, log);
    } else {
        bogus = await call('logs/test', 'POST', body, log);
    }
    log.level = 'INFO'
    await sendLog(log)
    return 'bogus'

}
