import { Body, Controller, Get, Put } from "@nestjs/common";
import { CreateCredentialPayload, IssuerService } from "./issuer.service";

@Controller("webhook")
export class WebhookController {
    constructor(){     }

    async initialize(){
        // TODO: Implementar la lógica para inicializar el webhook
        console.log('Webhook inicializado');
    }

    @Get()
    getHello(): string {
        return "Hello";
    }

    @Put()
    async eventNotification(@Body() body: any) {
            console.log(body);
    }
}