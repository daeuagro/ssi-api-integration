import { Module } from '@nestjs/common';
import { CredentialsController } from './app.controller';
import { IssuerService } from './issuer.service';
import { DataStorageService } from './data-storage.service';
import { APISSIService } from './api-ssi.service';
import { VerifierService } from './verifier.service';
import { WebhookController } from './webhook';


@Module({
  imports: [], 
  controllers: [
    CredentialsController,
    WebhookController
  ],
  providers: [
    DataStorageService, 
    APISSIService,
    VerifierService,
    {
      provide: IssuerService,
      useFactory: async(dds: DataStorageService, apiSSI: APISSIService) => {
        const service  = new IssuerService(dds, apiSSI);
        await service.initialize();
        return service;
      },
      inject: [DataStorageService, APISSIService]
    },
  ],
})
export class AppModule {}
