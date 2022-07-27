import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const message = exception.message;
    const status = exception.getStatus();

    console.log('=======================================');
    console.log('예외가 발생했어유');
    console.log('예외내용', message);
    console.log('예외코드', status);
    console.log('=======================================');
  }
}
