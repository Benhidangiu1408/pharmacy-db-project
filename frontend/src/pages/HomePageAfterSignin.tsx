import React, { useEffect, useState } from "react";
import HCMUTBG from "../assets/HCMUT_bg.png"
import "./homepage.css"; // Import the CSS file

const HomePageAfterSignin = () => {
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = HCMUTBG;
    img.onload = () => {
      setImgHeight(window.innerHeight);
    };
  }, []);
  return (
    <div>
      <main className="main" style={{ height: "70vh" }}>
        <div
          className="background"
          style={{
            backgroundImage: `url(${HCMUTBG})`, // Dynamic image
            height: imgHeight ? `${imgHeight}px` : "auto", // Dynamic height
            maxHeight: "88vh", // Set maximum height
            backgroundSize: "cover", // Adjust background size
            backgroundRepeat: "no-repeat", // Prevent background from repeating
            backgroundPosition: "center", // Center the background image
          }}
        >
          <div className="overlay2" />

          <div className="content">
            <div className="text">
              <div className="text-6xl font-extrabold">Quản lý nhà thuốc</div>
              <div className="text-5xl font-extrabold">
                Nhanh - Gọn - Tiện lợi
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <footer className="footer">
        <div className="info">
          <div className="text-1xl font-bold">
            <div>Tổ kỹ thuật P.ĐT / Technician</div>
            <div>Email : ddthu@hcmut.edu.vn</div>
            <div>ĐT (Tel.) : (84-8) 38647256 - 5258</div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default HomePageAfterSignin;
