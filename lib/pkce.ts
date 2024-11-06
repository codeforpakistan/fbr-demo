export function generateCodeVerifier() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return base64URLEncode(array)
}

export async function generateCodeChallenge(verifier: string) {
  const hash = await crypto.subtle.digest('SHA-256',
    new TextEncoder().encode(verifier))
  return base64URLEncode(new Uint8Array(hash))
}

function base64URLEncode(buffer: Uint8Array) {
  return Buffer.from(buffer)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
} 