import { useState } from "react";

import Header from "./components/Header";
import ThanhChucNang from "./components/ThanhChucNang";
import KhuNhap from "./components/KhuNhap";
import KhuKetQua from "./components/KhuKetQua";

import { maHoaAES, giaiMaAES } from "./maHoa/maHoaKhoi";
import { maHoaDong, giaiMaDong } from "./maHoa/maHoaDong";

import "./App.css";

function App() {
  const [chucNang, setChucNang] = useState("mahoa");

  const [cheDo, setCheDo] = useState("maHoa");
  const [thuatToan, setThuatToan] = useState("stream");

  const [khoa, setKhoa] = useState("");
  const [vanBan, setVanBan] = useState("");
  const [ketQua, setKetQua] = useState("");
  const [chiTietXor, setChiTietXor] = useState(null);
  const [loi, setLoi] = useState("");

  const xuLy = async () => {
    setLoi("");
    setKetQua("");
    setChiTietXor(null);

    if (!vanBan.trim()) {
      setLoi("Vui lòng nhập thông điệp.");
      return;
    }

    if (!khoa.trim()) {
      setLoi("Vui lòng nhập khóa.");
      return;
    }

    try {
      let ketQuaMoi = "";

      // =========================
      // STREAM CIPHER
      // =========================
      if (thuatToan === "stream") {
        if (cheDo === "maHoa") {
          const ketQuaStream = await maHoaDong(
            vanBan,
            khoa
          );

          ketQuaMoi = ketQuaStream.ciphertext;

          setChiTietXor({
            loai: "stream",
            plaintextBits:
              ketQuaStream.plaintextBits,
            keystreamBits:
              ketQuaStream.keystreamBits,
            xorBits:
              ketQuaStream.xorBits,
          });
        } else {
          const ketQuaStream = await giaiMaDong(
            vanBan,
            khoa
          );

          ketQuaMoi = ketQuaStream.plaintext;

          setChiTietXor({
            loai: "stream",
            plaintextBits:
              ketQuaStream.plaintextBits,
            keystreamBits:
              ketQuaStream.keystreamBits,
            xorBits:
              ketQuaStream.xorBits,
          });
        }
      }

      // =========================
      // AES
      // =========================
      if (thuatToan === "block") {
        if (cheDo === "maHoa") {
          const ketQuaAES = await maHoaAES(
            vanBan,
            khoa
          );

          ketQuaMoi = ketQuaAES.ciphertext;

          setChiTietXor({
            loai: "aes",
            plaintextBits:
              ketQuaAES.plaintextBits,
            keyBits:
              ketQuaAES.keyBits,
            ciphertextBits:
              ketQuaAES.ciphertextBits,
          });
        } else {
          const ketQuaAES = await giaiMaAES(
            vanBan,
            khoa
          );

          ketQuaMoi = ketQuaAES.plaintext;

          setChiTietXor({
            loai: "aes",
            plaintextBits:
              ketQuaAES.plaintextBits,
            ciphertextBits:
              ketQuaAES.ciphertextBits,
          });
        }
      }

      setKetQua(ketQuaMoi);
    } catch (error) {
      console.error(error);

      setLoi(
        "Không thể xử lý dữ liệu. Vui lòng kiểm tra lại khóa và bản mã."
      );
    }
  };

  const xoaDuLieu = () => {
    setVanBan("");
    setKetQua("");
    setLoi("");
    setKhoa("");
    setChiTietXor(null);
  };

  const saoChep = async () => {
    if (!ketQua) return;

    try {
      await navigator.clipboard.writeText(ketQua);
    } catch (error) {
      console.error(error);
      setLoi("Không thể sao chép kết quả.");
    }
  };

  const thayDoiChucNang = (giaTri) => {
    setChucNang(giaTri);
    setVanBan("");
    setKetQua("");
    setLoi("");
    setKhoa("");
    setChiTietXor(null);
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <div className="intro">
          <h2>Phòng thí nghiệm mật mã</h2>

          <p>
            Thực hành mã hóa dòng, mã hóa khối và các
            kỹ thuật xử lý dữ liệu.
          </p>
        </div>

        <ThanhChucNang
          chucNang={chucNang}
          setChucNang={thayDoiChucNang}
        />

        <div className="workspace">
          <KhuNhap
            cheDo={cheDo}
            setCheDo={setCheDo}
            thuatToan={thuatToan}
            setThuatToan={setThuatToan}
            khoa={khoa}
            setKhoa={setKhoa}
            dich={xuLy}
            vanBan={vanBan}
            setVanBan={setVanBan}
          />

          <KhuKetQua
            ketQua={ketQua}
            loi={loi}
            saoChep={saoChep}
            xoaDuLieu={xoaDuLieu}
            chiTietXor={chiTietXor}
          />
        </div>
      </main>

      <footer className="footer">
        <p>
          CryptoLab — Cryptography Learning Platform
        </p>
      </footer>
    </div>
  );
}

export default App;