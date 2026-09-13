export function maHoaBase64(vanBan) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(vanBan);

  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export function giaiMaBase64(chuoiBase64) {
  const binary = atob(chuoiBase64);

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  const decoder = new TextDecoder();

  return decoder.decode(bytes);
}