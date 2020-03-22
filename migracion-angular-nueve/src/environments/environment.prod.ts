/* tslint:disable */
// 1) Todas las propiedades deben de ser entre comillas dobles, asi como los valores de string
// 2) No poner la ultima comilla en la ultima propiedad porque va a botar error
export const environment = {
  "production": true,
  "activarGuards": true,
  "url": "https://uncle-sam.manticore-labs.com",
  "port": "443/uncle-sam-test",
  "urlGoogleCloudStorage": "https://storage.googleapis.com",
  "portGoogleCloudStorage": "443/archivos-prueba-manticore",
  "urlWebsockets": "http://localhost",
  "portWebsockets": "8080",
  "nombreAplicativo": "Uncle-sam",
  "versionAplicativo": "0.0.1"
};

// @ts-ignore
export const stripe = Stripe('pk_test_VPSSIp0ihUED2nrBx7inIPx700V3vt8CpV');
