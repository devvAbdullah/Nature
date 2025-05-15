import { QRCodeCanvas } from "qrcode.react";

const CertificateQR = ({ downloadURL }) => {
  return (
    <div className="mt-4 text-center">
      <h2 className="text-md font-semibold mb-2">Scan this QR code to download your certificate!</h2>
      <QRCodeCanvas value={downloadURL} size={200} />
      <p className="text-xs mt-2 text-gray-500 break-all">{downloadURL}</p>
    </div>
  );
};

export default CertificateQR;
