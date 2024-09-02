import { Injectable } from '@nestjs/common';
import { DataStorageService } from './data-storage.service';
import { APISSIService } from './api-ssi.service';


import  issuerStyles from './issuer.styles.json';
import outputDescriptor from './output-descriptor.json';

@Injectable()
export class IssuerService {
  did: string;
 
  constructor(private readonly dataStorageService: DataStorageService,
    private apiSSIService: APISSIService){

    }

    async initialize(){
      let did = await this.dataStorageService.getDID();

      if(!did){
        const result = await this.apiSSIService.createDID();
        did = result.did;
        this.dataStorageService.saveDID(did);
      }

      this.did = did;

      console.log("DID: ", this.did);

    }
    
    // Creamos el código de la invitacion para obtener el DID
    async createInvitationCode(params: CreateCredentialPayload){
      const credential = this.getCredential(params);

      console.log('Datos decibidos para crear la credencial : ', credential);

      const result = {
        did: this.did,
        oneTimeUse: true,
        vc: credential,
        outputDescriptor: outputDescriptor,
        issuer: issuerStyles
      }

      return await this.apiSSIService.getIssuanceInvitationCode(result);

    }

    // Función para crear la credencial
    getCredential(params: CreateCredentialPayload){ 
      return {
            "@context": [
              "https://www.w3.org/2018/credentials/v1",
              "https://www.w3.org/2018/credentials/examples/v1",
              {
                "name": "https://schema.org/Text",
                "passport": "https://schema.org/Text",
                "matricula": "https://schema.org/Text",
                "unidadAcademica": "https://schema.org/Text",
                "programaEducativo": "https://schema.org/Text",
                "periodo": "https://schema.org/Text",

                }
            ],
            id: (new Date().getTime()).toString(),
            type: ["VerifiableCredential", "AlumnoCredential"],
            issuer: {
                id: this.did,
                name: "Universidad Autónoma de Guerrero"
              },
            issuanceDate: (new Date()).toString(),
            expirationDate: params.validTo,
            credentialSubject: {
                name: params.name,
                passport: params.passportNumber,
                matricula: params.matricula,
                unidadAcademica: params.unidadAcademica,
                programaEducativo: params.programaEducativo,
                periodo: `${params.validFrom} - ${params.validTo}`
              }
          }

    }

}

export class CreateCredentialPayload {
  name: string;
  passportNumber: string;
  matricula: string;
  unidadAcademica: string;
  programaEducativo: string;
  validFrom: string;
  validTo: string;
}
