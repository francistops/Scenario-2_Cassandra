function fillMain(element) {
    const main = document.querySelector('main');
        main.childNodes.forEach((item, index) => {
        item.remove();
    });
    main.appendChild(element);
}

window.addEventListener('hashchange', () => {
    switch (window.location.hash) {
        case '#login':
            loadLogin();
            break;
        case '#logout':
            loadLogout();
            break;
        case '#subscribe':
            loadSubscribe();
            break;
        default:
            window.location.hash = 'blog';
            break;
    }
});

function loadSubscribe() {
    const autoSubscribe = document.createElement('auth-subscribe');
    autoSubscribe.addEventListener('subscribed', (e) => {
        console.log(e.detail);
        if (e.detail.result) {
            window.location.hash = 'login';
        } else {
            windows.location.hash = 'subscribe';
        }
    });

    fillMain(autoSubscribe);
}

function loadLogin() {
    const authLogin = document.createElement('auth-login');
    authLogin.addEventListener('logging-in', (e) => {
        console.log(e.detail);
        if (e.detail.result) {
            window.location.hash = 'blog';
        } else {
            window.location.hash = 'login';
        }
    });

    fillMain(authLogin);
}

function loadLogout() {
    logout();
    window.location.hash = 'blog';
}
