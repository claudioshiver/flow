import {ValidationError} from 'yup';
import ErrorCode from "@/lib/enums/ErrorCode";

type ErrorResponse<T = any> = {
  name: string;
  code: ErrorCode;
  error?: string;
  errors?: string[];
  message?: string;
  inner?: ValidationError[];
  value?: T;
}

export default ErrorResponse;
