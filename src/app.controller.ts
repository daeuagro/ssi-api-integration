import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateCredentialPayload, IssuerService } from './issuer.service';
import { VerifierService } from './verifier.service';

@Controller("credentials")
export class CredentialsController {
  
  constructor(private readonly issuerService: IssuerService, private readonly verificationService: VerifierService) {}

  @Get()
  getHello(): string {
    return "Hello";
  }

  @Post()
  async getIssuanceInvitationCode(@Body() body: CreateCredentialPayload) {
    const result = await this.issuerService.createInvitationCode(body);
    console.log("Result de QR: ", result);
    return result;
  }

  @Put()
  async getVerificationCodeQR(){
    const result = await this.verificationService.createVerificationQRCode();
    return result;
  }

}
