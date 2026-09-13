function toBase64(bytes) {
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

function fromBase64(base64) {
  const binary = atob(base64);

  return Uint8Array.from(
    binary,
    (char) => char.charCodeAt(0)
  );
}

// Chuyển byte thành dạng nhị phân 0 và 1
function toBinary(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ");
}

async function taoKhoa(password, salt) {
  const encoder = new TextEncoder();

  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    passwordKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function maHoaAES(vanBan, matKhau) {
  const encoder = new TextEncoder();

  const plaintextBytes = encoder.encode(vanBan);

  const salt = crypto.getRandomValues(
    new Uint8Array(16)
  );

  const iv = crypto.getRandomValues(
    new Uint8Array(12)
  );

  const key = await taoKhoa(matKhau, salt);

  // Lấy khóa AES đã sinh để hiển thị dạng bit
  const keyBytes = new Uint8Array(
    await crypto.subtle.exportKey("raw", key)
  );

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    plaintextBytes
  );

  const cipherBytes = new Uint8Array(ciphertext);

  const output = new Uint8Array(
    salt.length +
    iv.length +
    cipherBytes.length
  );

  output.set(salt, 0);
  output.set(iv, salt.length);
  output.set(
    cipherBytes,
    salt.length + iv.length
  );

  return {
    ciphertext: toBase64(output),

    // Dữ liệu hiển thị
    plaintextBits: toBinary(plaintextBytes),
    keyBits: toBinary(keyBytes),
    ciphertextBits: toBinary(cipherBytes),
  };
}

export async function giaiMaAES(
  chuoiMaHoa,
  matKhau
) {
  const data = fromBase64(chuoiMaHoa);

  const salt = data.slice(0, 16);
  const iv = data.slice(16, 28);
  const ciphertext = data.slice(28);

  const key = await taoKhoa(
    matKhau,
    salt
  );

  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    ciphertext
  );

  return {
    plaintext: new TextDecoder().decode(plaintext),

    plaintextBits: toBinary(
      new Uint8Array(plaintext)
    ),

    ciphertextBits: toBinary(ciphertext),
  };
}