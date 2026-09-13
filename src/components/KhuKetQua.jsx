function KhuKetQua({
  ketQua,
  loi,
  saoChep,
  xoaDuLieu,
  chiTietXor,
}) {
  return (
    <section className="result-section">
      <div className="section-title">
        <h2>Kết quả</h2>
      </div>

      {loi && (
        <div className="error-message">
          {loi}
        </div>
      )}

      {/* KẾT QUẢ CHÍNH */}
      <div className="result-box">
        {ketQua ? (
          <p>{ketQua}</p>
        ) : (
          <p className="result-placeholder">
            Kết quả sẽ hiển thị ở đây...
          </p>
        )}
      </div>

      {/* CHI TIẾT STREAM CIPHER */}
      {chiTietXor &&
        chiTietXor.loai === "stream" && (
          <div className="xor-detail">
            <h3>Chi tiết phép XOR</h3>

            <div className="bit-row">
              <strong>Plaintext:</strong>

              <code>
                {chiTietXor.plaintextBits}
              </code>
            </div>

            <div className="bit-row">
              <strong>Keystream:</strong>

              <code>
                {chiTietXor.keystreamBits}
              </code>
            </div>

            <div className="xor-line"></div>

            <div className="bit-row">
              <strong>XOR:</strong>

              <code>
                {chiTietXor.xorBits}
              </code>
            </div>
          </div>
        )}

      {/* CHI TIẾT AES */}
      {chiTietXor &&
        chiTietXor.loai === "aes" && (
          <div className="xor-detail">
            <h3>Chi tiết AES</h3>

            <div className="bit-row">
              <strong>Plaintext:</strong>

              <code>
                {chiTietXor.plaintextBits}
              </code>
            </div>

            {chiTietXor.keyBits && (
              <div className="bit-row">
                <strong>Khóa AES:</strong>

                <code>
                  {chiTietXor.keyBits}
                </code>
              </div>
            )}

            <div className="xor-line"></div>

            <div className="bit-row">
              <strong>Ciphertext:</strong>

              <code>
                {chiTietXor.ciphertextBits}
              </code>
            </div>
          </div>
        )}

      {/* BUTTON */}
      <div className="action-row">
        <button
          type="button"
          className="primary-button"
          onClick={saoChep}
          disabled={!ketQua}
        >
          📋 Sao chép
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={xoaDuLieu}
        >
          🗑️ Xóa kết quả
        </button>
      </div>
    </section>
  );
}

export default KhuKetQua;