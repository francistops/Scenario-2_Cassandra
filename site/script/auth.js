const BASE_URL = 'https://api.andre.ca';

async function call(ressource, method, auth, obj) {
    let params = {
        method: method,
        headers: buildHeaders(auth)
    };
    if (obj != null) {
        if (await isIdentified()) {
            obj.connectedUser = await getConnectedUser();
        }
        params.body = JSON.stringify(obj);
    }
    const response = await fetch(`${BASE_URL}/${ressource}`, params);
    const json = await response.json();
    return json;
}

async function buildHeaders(auth) {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    if (auth) {
        if (! await isIdentified()) {
            throw new Error('Empty token while required...');
        }
        headers['Authorization'] = `Bearer ${await getConnectedUser().token}`;
    }

    return headers;
}

export async function getConnectedUser() {
    return await JSON.parse(localStorage.getItem('user'));
}

export async function isIdentified() {
    return await getConnectedUser() != null;
}

export async function subscribe(user) {
    let result = false;
    const subscribeJson = await call('subscribe', 'POST', false, user);
    if (subscribeJson.errorCode == 0) {
        result = subscribeJson.subscribed;

        const event = new CustomEvent('auth-subscribed', { });
        this.dispatchEvent(event);
    }

    return result;
}

export async function login(user) {
    let result = false;
    const loginJson = await call('login', 'POST', false, user);

    if (loginJson.errorCode == 0) {
        result = true;
        localStorage.setItem('user', JSON.stringify(loginJson.user));
    }

    return result;
}

export async function logout() {
    let result = false;
    const logoutJson = await call('logout', 'POST', true);

    if (logoutJson.errorCode == 0) {
        result = logoutJson.revoked;
        localStorage.clear();

        const event = new CustomEvent('auth-logedout', { });
        dispatchEvent(event);
    }

    return result;
}

export async function getAllPosts() {
    let result = [];
    const allPostsJson = await call('posts', 'GET', true);

    if (allPostsJson.errorCode == 0) {
        result = allPostsJson.posts;
    }

    return result;
}

export async function getNextPost(postId) {
    let result = null;
    let resource = 'posts/next';
    let currentIds = JSON.parse(localStorage.getItem('ids'));
    const nextPostJson = await call(resource, 'GET', true, {ids: currentIds, nbRequested: 3});

    if (nextPostJson.errorCode == 0) {
        result = nextPostJson.posts;
        const ids = result.map((item) => item.id);
        currentIds.push(...ids);
        localStorage.setItem('ids', JSON.stringify(currentIds));
    }

    return result;
}


export async function testCall(bool) {
    let result = bool;
    const testResult = await call('posts', 'GET', false);

    if (testResult.errorCode == 0) {
        result = allPostsJson.posts;
    }

    return result;
}
