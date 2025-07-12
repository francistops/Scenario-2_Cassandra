const button = document.getElementById('compute');
button.addEventListener('click', async (e) => {
    let msg = 'Erreur inconnue';
    try {
        msg = await premierMinistre();
    } catch (error) {
        msg = error;
    }
    document.getElementById('message').innerHTML = `${msg}`;
});

function premierMinistre() {
//const worker = new Worker('grosCalcul.js');
    const workerCode = `
        self.onmessage = function() {
            let value = 0;
            console.time();
            for (let i = 1; i < 100000; i++) {
                for (let j = 1; j < 40000; j++) {
                    value = (i**2 + j**2)**(1/2);
                }
            }
            console.timeEnd();
            return value;
        };
    `;

    const blob = new Blob([workerCode], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));

    return new Promise((resolve, reject) => {
        worker.onmessage = (e) => {
            resolve(e.data);
            worker.terminate();
        };

        worker.onerror = (e) => {
            reject(e);
            worker.terminate();
        };

        worker.postMessage(null);
    });
}

