import { getLogs } from '../script/auth.js'

class DisplayLogElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                table, thead, tbody, tr, th, td {
                    color: #fff;
                    border: 1px solid salmon;
                }
            </style>
            <button id="getLogs">get logs</button>
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Level</th>
                        <th>File</th>
                        <th>Line</th>
                        <th>Module</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody id="bodyData">
                </tbody>
            </table>
        `.trim();
    }

    async connectedCallback() {
        const btn = this.shadowRoot.getElementById('getLogs');
        btn.addEventListener('click', async e => {
            this.shadowRoot.querySelector('tbody').innerHTML = ''

            const logs = await getLogs();
            for (let i = 0; i < logs.length; i++) {
                const log = logs[i]
                this.addData(log)
            }
        });
    }

    addData(log) {
        const tb = this.shadowRoot.querySelector('tbody');
        const trTag = document.createElement('tr');
        trTag.id = log.id;

        const tdTimestamp = document.createElement('td');
        tdTimestamp.innerHTML = log.timestamp;

        const tdLevel = document.createElement('td');
        tdLevel.innerHTML = log.level;

        const tdFile = document.createElement('td');
        tdFile.innerHTML = log.file;

        const tdLine = document.createElement('td');
        tdLine.innerHTML = log.line;

        const tdMod = document.createElement('td');
        tdMod.innerHTML = log.module;

        const tdDesc = document.createElement('td');
        tdDesc.innerHTML = log.description;

        trTag.appendChild(tdTimestamp);
        trTag.appendChild(tdLevel);
        trTag.appendChild(tdFile);
        trTag.appendChild(tdLine);
        trTag.appendChild(tdMod);
        trTag.appendChild(tdDesc);

        tb.appendChild(trTag);
    }
}


customElements.define('display-log', DisplayLogElement);
