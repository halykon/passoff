export async function registerBiometric (secret: string) {
  const credential: any = await navigator.credentials.create({
    publicKey: {
      user: { id: Uint8Array.from(secret, (c) => c.charCodeAt(0)), name: '', displayName: '' },
      challenge: new Uint8Array(0),
      rp: { name: 'passoff' },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        requireResidentKey: true,
      },
    },
  })

  if (credential) {
    return btoa(String.fromCharCode(...new Uint8Array(credential.rawId)))
  }
}

export async function getBiometric (id: string) {
  const credential: any = await navigator.credentials.get({
    publicKey: {
      allowCredentials: [{ id: Uint8Array.from(atob(id), c => c.charCodeAt(0)).buffer, type: 'public-key' }],
      challenge: new Uint8Array(0),
    },
  })

  if (credential) {
    return String.fromCharCode(...new Uint8Array(credential.response.userHandle))
  }
}

export async function getHash (data: string) {
  const ext = Uint8Array.from(atob(data), c => c.charCodeAt(0))
  const hash = await crypto.subtle.digest('SHA-256', ext)
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
}

export async function exportCryptoKey (rawKey: ArrayBuffer, iv: Uint8Array) {
  const raw = new Uint8Array(rawKey)
  const full = Uint8Array.from([...raw, ...iv])
  const key = btoa(String.fromCharCode(...full))
  const keyHash = await getHash(key)

  return { key, keyHash }
}

export async function checkKey (key: string, hash: string) {
  const keyHash = await getHash(key)
  return keyHash === hash
}

export async function extractCryptoKey (key: string) {
  const cryptUintArray = Uint8Array.from(atob(key), c => c.charCodeAt(0))
  const rawKey = cryptUintArray.slice(0, 16)
  const iv = cryptUintArray.slice(-4)

  return { rawKey, iv }
}

export async function passphraseEncrypt (passphrase: string, data: string) {
  const digest = await crypto.subtle.digest('SHA-256', Uint8Array.from(passphrase, c => c.charCodeAt(0)))
  const key = await crypto.subtle.importKey('raw', digest, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt'])
  const iv = crypto.getRandomValues(new Uint8Array(16))
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, Uint8Array.from(data, c => c.charCodeAt(0)))
  return btoa(String.fromCharCode(...new Uint8Array(iv), ...new Uint8Array(encrypted)))
}

export async function passphraseDecrypt (passphrase: string, encryptedData: string) {
  const digest = await crypto.subtle.digest('SHA-256', Uint8Array.from(passphrase, c => c.charCodeAt(0)))
  const key = await crypto.subtle.importKey('raw', digest, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt'])
  const cryptUintArray = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0))
  const iv = cryptUintArray.slice(0, 16)
  const encrypted = cryptUintArray.slice(16)
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, encrypted)
  return new TextDecoder().decode(decrypted)
}

export async function importCryptoKey (key: string) {
  const { rawKey, iv } = await extractCryptoKey(key)
  const cryptoKey = await crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, ['decrypt', 'encrypt'])
  return { cryptoKey, iv }
}

export async function generateCryptoKey () {
  const iv = crypto.getRandomValues(new Uint8Array(4))
  const cryptKey = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 128 }, true, ['decrypt', 'encrypt'])
  const rawKey = await crypto.subtle.exportKey('raw', cryptKey)
  return await exportCryptoKey(rawKey, iv)
}

export async function encrypt (key: string, data: string) {
  const { cryptoKey, iv } = await importCryptoKey(key)
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, Uint8Array.from(data, c => c.charCodeAt(0)))
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)))
}

export async function decrypt (key: string, encryptedData: string) {
  const { cryptoKey, iv } = await importCryptoKey(key)
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0)))
  return String.fromCharCode(...new Uint8Array(decrypted))
}
