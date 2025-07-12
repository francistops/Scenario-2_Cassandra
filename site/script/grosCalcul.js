function grosCalcul() {
    let value = 0;
    console.time();
    for (let i = 1; i < 100000; i++) {
        for (let j = 1; j < 40000; j++) {
            value = (i**2 + j**2)**(1/2);
        }
    }
    console.timeEnd();
    return value;
}

self.onmessage = function (event) {
    try {
        const result = grosCalcul();
        self.postMessage(result);
    } catch (error) {
        self.postMessage({error: error});
    }
}