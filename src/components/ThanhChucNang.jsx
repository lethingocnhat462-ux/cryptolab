function ThanhChucNang({ chucNang, setChucNang }) {
  return (
    <div className="tabs">
      <button
        className={`tab ${chucNang === "mahoa" ? "active" : ""}`}
        onClick={() => setChucNang("mahoa")}
      >
        🔐 Mã hóa / Giải mã
      </button>
    </div>
  );
}

export default ThanhChucNang;