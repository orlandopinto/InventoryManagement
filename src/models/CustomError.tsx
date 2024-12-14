export interface ErrorInfo extends Error {
     status?: number;
     statusText?: string;
}

export class CustomError {
     name: string;
     message: string;
     stack?: string;
     status?: number;
     statusText?: string;
     constructor(err: ErrorInfo) {
          this.name = err.name;
          this.message = err.message;
          this.stack = err.stack;
          this.status = err.status;
          this.statusText = err.statusText;
     }

     throwCustomError(): ErrorInfo {
          const err: ErrorInfo = { name: this.name, message: this.message, stack: this.stack, status: this.status, statusText: this.statusText }
          return err;
     }
}