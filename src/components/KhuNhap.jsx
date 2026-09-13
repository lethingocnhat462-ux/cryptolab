function KhuNhap({
  cheDo,
  setCheDo,
  thuatToan,
  setThuatToan,
  khoa,
  setKhoa,
  dich,
  vanBan,
  setVanBan,
}) {
  return (
    <section className="input-section">
      <div className="section-title">
        <h2>Nhập dữ liệu</h2>
        <span>{vanBan.length} ký tự</span>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Chế độ</label>

          <select
            value={cheDo}
            onChange={(e) => setCheDo(e.target.value)}
          >
            <option value="maHoa">Mã hóa</option>
            <option value="giaiMa">Giải mã</option>
          </select>
        </div>

        <div className="form-group">
          <label>Thuật toán</label>

          <select
            value={thuatToan}
            onChange={(e) => setThuatToan(e.target.value)}
          >
            <option value="stream">
              Mã hóa dòng (Stream Cipher)
            </option>

            <option value="block">
              Mã hóa khối (AES)
            </option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Khóa / Mật khẩu</label>

        <input
          type="password"
          value={khoa}
          onChange={(e) => setKhoa(e.target.value)}
          placeholder="Nhập khóa / mật khẩu"
        />
      </div>

      <div className="form-group">
        <label>Thông điệp</label>

        <textarea
          value={vanBan}
          onChange={(e) => setVanBan(e.target.value)}
          placeholder={
            cheDo === "maHoa"
              ? "Nhập thông điệp cần mã hóa..."
              : "Nhập bản mã cần giải mã..."
          }
          rows="10"
        />
      </div>

      <div className="action-row">
        <button
          type="button"
          className="primary-button"
          onClick={dich}
        >
          {cheDo === "maHoa"
            ? "🔒 Mã hóa"
            : "🔓 Giải mã"}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            setVanBan("");
            setKhoa("");
          }}
        >
          Xóa
        </button>
      </div>
    </section>
  );
}

export default KhuNhap;