"use client";

import { useEffect, useState } from "react";

interface QRCodeAprecapProps {
  url?: string;
  size?: number;
  className?: string;
}

export default function QRCodeAprecap({
  url = "https://www.aprecap.cl",
  size = 72,
  className = "",
}: QRCodeAprecapProps) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let active = true;
    import("qrcode")
      .then((QRCode) => {
        QRCode.toDataURL(
          url,
          {
            width: size * 2,
            margin: 1,
            color: {
              dark: "#0b1d3a",
              light: "#ffffff",
            },
          },
          (err, res) => {
            if (!err && res && active) {
              setDataUrl(res);
            }
          }
        );
      })
      .catch(() => {
        // Fallback si no está disponible
      });
    return () => {
      active = false;
    };
  }, [url, size]);

  if (dataUrl) {
    return (
      <img
        src={dataUrl}
        alt={`QR ${url}`}
        width={size}
        height={size}
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200 text-[9px] font-bold text-apre-blue ${className}`}
    >
      <span>QR</span>
    </div>
  );
}
