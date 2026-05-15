const te = new TextEncoder()
const td = new TextDecoder()

const keyCache = new Map<string, CryptoKey>()

function bytesToBase64(bytes: Uint8Array): string {
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!)
  return btoa(bin)
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

function toArrayBuffer(u8: Uint8Array): ArrayBuffer {
  const buf = new ArrayBuffer(u8.byteLength)
  new Uint8Array(buf).set(u8)
  return buf
}

async function getKey(secret: string): Promise<CryptoKey> {
  const cached = keyCache.get(secret)
  if (cached) return cached

  const digest = await crypto.subtle.digest('SHA-256', te.encode(secret))
  const key = await crypto.subtle.importKey('raw', digest, { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ])
  keyCache.set(secret, key)
  return key
}

/**
 * AES-GCM encrypt, format: v1:<b64(iv)>.<b64(ciphertext)>
 */
export async function encryptString(plaintext: string, secret: string): Promise<string> {
  if (!secret) return plaintext
  const key = await getKey(secret)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, te.encode(plaintext))
  return `v1:${bytesToBase64(iv)}.${bytesToBase64(new Uint8Array(cipher))}`
}

/**
 * Decrypts a value previously encrypted by encryptString().
 * - Returns plaintext string on success.
 * - Returns original input if it doesn't look encrypted (legacy/plaintext).
 * - Returns null if decryption fails.
 */
export async function decryptString(ciphertext: string, secret: string): Promise<string | null> {
  if (!secret) return ciphertext
  if (!ciphertext.startsWith('v1:')) return ciphertext

  const raw = ciphertext.slice(3)
  const [ivB64, dataB64] = raw.split('.')
  if (!ivB64 || !dataB64) return null

  try {
    const key = await getKey(secret)
    const iv = base64ToBytes(ivB64)
    const data = base64ToBytes(dataB64)
    const ivBuf = toArrayBuffer(iv)
    const dataBuf = toArrayBuffer(data)
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuf }, key, dataBuf)
    return td.decode(plain)
  } catch {
    return null
  }
}

