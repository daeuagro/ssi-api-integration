import { Injectable } from "@nestjs/common";
import { IssuerService } from "./issuer.service";
import { APISSIService } from "./api-ssi.service";
import inputDescriptors from "./input-descriptors.json";


@Injectable()
export class VerifierService {
    constructor(private issuerService: IssuerService,
        private apiSSI: APISSIService) { 

        }

        async createVerificationQRCode() {
            return await this.apiSSI.getVerificationCode({
                did: this.issuerService.did,
                inputDescriptors: inputDescriptors
            })
        }
}

export class CreateVerificationCodePayload {
    
}