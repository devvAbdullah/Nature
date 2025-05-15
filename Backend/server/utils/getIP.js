// utils/getIP.js
const os = require("os");

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let net of interfaces[iface]) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return "localhost";
}

module.exports = getLocalIP;
