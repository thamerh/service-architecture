// const baseUrl = "https://www.preprod.lexi.tn/ds_backend/public/api";
// const endPoints = {
//   companyTestEndPoint: '/v1/user/current',
// };
const baseUrl = "http://152.228.175.223:8085/gateway";

const endPoints = {
  companyTestEndPoint: '/offre/all',
};

function getEndPoints() {
  const configWithBaseUrl = {};
  for (const endpoint in endPoints) {
    configWithBaseUrl[endpoint] = baseUrl + endPoints[endpoint];
  }
  return configWithBaseUrl;
}

const tokenType = 'Bearer';

const storageToken = {
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
  storageFoodTruck: 'foodTruck',
};

const apiConfig = {
  ...getEndPoints(),
  tokenType,
  ...storageToken,
};

export default apiConfig;
