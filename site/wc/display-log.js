import { login } from '../script/auth.js'
import { parseFormToObject } from '../script/utilform.js'
import { hashPassword } from '../script/passwordElement.js'

/**
 * Changez ce code pour répondre à votre besoins
 */
class AuthLoginElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
            @import "https://unpkg.com/open-props";
                p {
                    font-size: 100px;
                    font-weight: bold;
                    font-style: italic;
                }
            </style>
            <form id="action-login" method="POST">
                <div class="item-data">
                    <label for="user-email">Courriel</label>
                    <input id="user-email" name="user[email]">
                </div>
                <div class="item-data">
                    <label for="user-password">Mot de passe</label>
                    <textarea id="user-password" name="password"></textarea>
                </div>
                <button id="cancel">Annuler</button>
                <button id="action">Se connecter</button>
                <div>Pas de compte : <a href="#subscribe">se créer un compte</a></div>
            </form>
        `.trim();
    }
 
    async connectedCallback() {
        const form = this.shadowRoot.getElementById('action-login');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        const actionBtn = this.shadowRoot.getElementById('action');
        actionBtn.addEventListener('click', async (e) => {
            const user = parseFormToObject(form);
            user.user.passHash = await hashPassword(user.password);
            delete user.password;

            const result = await login(user);
            
            const event = new CustomEvent('logging-in', {
                detail: {
                    result: result
                },
                bubbles: true,
                composed: true
            });

            this.dispatchEvent(event);
        });
    }
}
  
/**
 * Changez le nom de manière adéquate
 */
customElements.define('auth-login', AuthLoginElement);
