const encoder = new TextEncoder();
const decoder = new TextDecoder();

/*
 * Chuyển byte sang Base64
 * Dùng để lưu/hiển thị ciphertext.
 */
function bytesToBase64(bytes) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

/*
 * Chuyển Base64 về byte
 */
function base64ToBytes(base64) {
  const binary = atob(base64);

  return Uint8Array.from(
    binary,
    (char) => char.charCodeAt(0)
  );
}

/*
 * Chuyển byte sang dạng nhị phân
 *
 * Ví dụ:
 * 88 → 01011000
 */
function bytesToBinary(bytes) {
  return Array.from(bytes)
    .map((byte) =>
      byte.toString(2).padStart(8, "0")
    )
    .join(" ");
}

/*
 * Tạo Keystream bằng cách lặp lại khóa
 *
 * Ví dụ:
 *
 * Plaintext: HELLOWORLD
 * Key:       XMCKL
 *
 * Keystream:
 * XMCKLXMCKL
 */
function taoKeystream(khoaBytes, doDai) {
  const keystream = new Uint8Array(doDai);

  for (let i = 0; i < doDai; i++) {
    keystream[i] =
      khoaBytes[i % khoaBytes.length];
  }

  return keystream;
}

/*
 * Phép XOR từng byte
 */
function xorBytes(a, b) {
  const ketQua = new Uint8Array(a.length);

  for (let i = 0; i < a.length; i++) {
    ketQua[i] = a[i] ^ b[i];
  }

  return ketQua;
}

/*
 * =========================
 * MÃ HÓA DÒNG
 * =========================
 */
export async function maHoaDong(
  vanBan,
  khoa
) {
  const plaintext = encoder.encode(vanBan);
  const khoaBytes = encoder.encode(khoa);

  if (khoaBytes.length === 0) {
    throw new Error("Khóa không hợp lệ.");
  }

  /*
   * Tạo keystream từ khóa
   */
  const keystream = taoKeystream(
    khoaBytes,
    plaintext.length
  );

  /*
   * Plaintext XOR Keystream
   */
  const ciphertext = xorBytes(
    plaintext,
    keystream
  );

  return {
    /*
     * Ciphertext được mã hóa Base64
     * để có thể lưu/truyền dưới dạng text.
     */
    ciphertext: bytesToBase64(
      ciphertext
    ),

    /*
     * Chi tiết dạng binary
     */
    plaintextBits: bytesToBinary(
      plaintext
    ),

    keystreamBits: bytesToBinary(
      keystream
    ),

    xorBits: bytesToBinary(
      ciphertext
    ),

    /*
     * Dữ liệu bổ sung
     */
    plaintextBytes: plaintext,

    keyBytes: khoaBytes,

    keystreamBytes: keystream,

    xorBytes: ciphertext,
  };
}

/*
 * =========================
 * GIẢI MÃ DÒNG
 * =========================
 */
export async function giaiMaDong(
  chuoiMaHoa,
  khoa
) {
  const ciphertext =
    base64ToBytes(chuoiMaHoa);

  const khoaBytes = encoder.encode(khoa);

  if (khoaBytes.length === 0) {
    throw new Error("Khóa không hợp lệ.");
  }

  /*
   * Tạo lại keystream từ cùng khóa
   */
  const keystream = taoKeystream(
    khoaBytes,
    ciphertext.length
  );

  /*
   * Ciphertext XOR Keystream
   * = Plaintext
   */
  const plaintext = xorBytes(
    ciphertext,
    keystream
  );

  return {
    plaintext: decoder.decode(
      plaintext
    ),

    plaintextBits: bytesToBinary(
      plaintext
    ),

    keystreamBits: bytesToBinary(
      keystream
    ),

    xorBits: bytesToBinary(
      ciphertext
    ),
  };
}