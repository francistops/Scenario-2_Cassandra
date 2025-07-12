import { testCall } from '../script/auth.js'

class TesterLogElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <div class="tester-div">
                <button id="error">Error</button>
                <button id="noError">No Error</button>
            </div>
        `.trim();
    }

    async connectedCallback() {
        const btns = this.shadowRoot.querySelectorAll('button');
        console.log(btns);

        btns.forEach(btn => {
            btn.addEventListener('click', async e => {
                let result = { message: 'unknow' }
                if (e.target.id === 'error') {
                    console.log(await testCall());
                    const event = new CustomEvent('test-error-click', {
                        detail: {
                            result: await testCall(false)
                        },
                        bubbles: true,
                        composed: true
                    });
                    this.dispatchEvent(event);

                } else if (e.target.id === 'noError') {
                    const event = new CustomEvent('test-noError-click', {
                        detail: {
                            result: await testCall(true)
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
