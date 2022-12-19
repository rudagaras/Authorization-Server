
import express from 'express';
import Provider from 'oidc-provider';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//Middlewares
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const configuration = {
 
  clients: [{
     client_id: "oidcCLIENT",      
     client_secret: "Some_super_secret",      
     grant_types: ["authorization_code"],      
     redirect_uris: [ "https://www.libertypr.com/es/","https://oidcdebugger.com/debug"], 
     response_types: ["code",],  
       
   //other configurations if needed
  }],
  pkce: {
    required: () => false,
  },
};

const oidc = new Provider('authorization-server-production.up.railway.app', configuration);

app.use("/oidc",oidc.callback());

// app.listen(3000, function () {
//   console.log('OIDC is listening on port 3000!');
// });