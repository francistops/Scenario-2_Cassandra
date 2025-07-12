export async function hashPassword(password) {
    let hashHex = '';
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    } catch (error) {
        console.log(`error: ${error}`)
    }
    return hashHex;
}
