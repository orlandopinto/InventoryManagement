import { ErrorInfo } from '../types/types';

export function CustomError({ status, statusText, message, name }: ErrorInfo): ErrorInfo {
    const error = new Error(message) as ErrorInfo;
    error.name = name;
    error.status = status;
    error.statusText = statusText;

    return error;
}