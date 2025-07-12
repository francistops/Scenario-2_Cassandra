import { sendLog, testCall } from '../script/auth.js'

class TesterLogElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                button:hover {
                    background-color: bisque;
                    border: 1px solid darkgray;
                }

                button {
                    background-color: hotpink;
                    border: 1px solid yellow;
                }
            </style>
            <div class="tester-div">
                
                <button id="bogus1">working call</button>
                <button id="bogus2">error call</button>
                <button id="error">direct call Error debug</button>
                <button id="noError">direct No Error but logged debug</button>

            </div>
        `.trim();
    }

    async connectedCallback() {

        const LOG = {
            "level": "DEBUG",
            "description": "frontend",
            "module": "cc",
            "file": "tester-log",
            "line": 27
        };

        const btns = this.shadowRoot.querySelectorAll('button');
        // console.log(btns);

        btns.forEach(btn => {
            btn.addEventListener('click', async e => {
                
                if (e.target.id === 'error') {
                    try {
                        foo = bar
                    } catch (error) {
                        console.error('exepected error in tester-log');
                        await sendLog({
                            "level": "WARN",
                            "description": "frontend",
                            "module": "cc",
                            "file": "tester-log",
                            "line": 27
                        });
                    }
                } else if (e.target.id === 'noError') {
                    await sendLog(LOG);
                } else if (e.target.id === 'bogus1') {
                    e.target.innerHTML = await testCall({}, LOG)
                } else if (e.target.id === 'bogus2') {
                    e.target.innerHTML = await testCall({ "action": "failed" }, LOG)
                }

            })
        })
    }
}

customElements.define('tester-log', TesterLogElement);
