/* tslint:disable */
// 1) Todas las propiedades deben de ser entre comillas dobles, asi como los valores de string
// 2) No poner la ultima comilla en la ultima propiedad porque va a botar error
export const environment = {
  "production": false,
  "activarGuards":false,
  "url": "http://localhost",
  "port": "8080",
  "urlGoogleCloudStorage": "https://storage.cloud.google.com",
  "portGoogleCloudStorage": "/archivos-prueba-manticore/pruebas",
  "urlWebsockets": "http://localhost",
  "portWebsockets": "8080",
  "nombreAplicativo": "Uncle-sam",
  "versionAplicativo": "0.0.1",
};

// @ts-ignore
export const stripe = Stripe('pk_test_VPSSIp0ihUED2nrBx7inIPx700V3vt8CpV');
