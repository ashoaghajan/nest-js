import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';
import { Report } from './data';


export class CustomInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler) {

        return handler.handle().pipe(
            map((data: Report) => {
                const response = {
                    ...data,
                    createdAt: data.created_at
                }
                delete response.created_at;
                delete response.updated_at;
                return response
            }),
        )
    }
}