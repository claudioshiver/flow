import {ValidationError} from 'yup';

type ErrorResponse<T = any> = {
  name: string;
  error?: string;
  errors?: string[];
  message?: string;
  inner?: ValidationError[];
  value?: T;
}

export default ErrorResponse;
