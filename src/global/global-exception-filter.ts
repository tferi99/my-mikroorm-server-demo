import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as moment from 'moment';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    //console.error('------------------ GLOBAL EXCEPTION FILTER:', exception);

    if (exception instanceof Error) {
      this.logError(exception as Error);
    } else {
      console.error('Unknown exception type: ' + exception.toString());
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const timestamp = moment(new Date().getTime()).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    response.status(status).json({
      statusCode: status,
      timestamp, //:   new Date().toISOString(),  // toLocaleDateString()
      path: request.url,
      message: exception.toString(),
    });
  }

  logError(err: Error) {
    let fromStack = err.stack;
    const maxLen = parseInt(process.env.MAX_ERROR_LOG_LEN, 10) || 0;
    if (maxLen) {
      fromStack = fromStack.split('\n').join('');
      if (fromStack && fromStack.length > maxLen) {
        fromStack = fromStack.substr(0, maxLen) + '...';
      }
    }
    //console.log('>>>>>>>>>>>>>>>>> logError', err);
    console.error(err.constructor.name + '|' + fromStack);
  }
}
