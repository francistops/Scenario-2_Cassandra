import { writeLog } from '../script/auth.js'

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
                <button id="error">Error</button>
                <button id="noError">No Error</button>
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
                let result = null
                if (e.target.id === 'error') {
                    await writeLog(LOG)
                    // console.log(await testCall());
                    const event = new CustomEvent('test-error-click', {
                        detail: {
                            result: "stuff"
                        },
                        bubbles: true,
                        composed: true
                    });
                    this.dispatchEvent(event);

                } else if (e.target.id === 'noError') {
                    const event = new CustomEvent('test-noError-click', {
                        detail: {
                            result: await writeLog(true)
                        },
                        bubbles: true,
                        composed: true
                    });
                    this.dispatchEvent(event);
                }
            })
        })
    }
}

customElements.define('tester-log', TesterLogElement);
