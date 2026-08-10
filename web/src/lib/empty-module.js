// Shim vacio seguro para paquetes cliente en build de servidor en Cloudflare Workers.
const dummyFn = () => [];
const dummyObj = () => ({});

module.exports = {
  getApps: dummyFn,
  getApp: dummyObj,
  initializeApp: dummyObj,
  getAuth: dummyObj,
  getFirestore: dummyObj,
  getStorage: dummyObj,
  getAnalytics: dummyObj,
  isSupported: async () => false,
  GoogleAuthProvider: class {},
};
