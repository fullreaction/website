export const ROOT_URL = 'http://localhost:3000/';

export const handleFetch = async response => {
  if (!response.ok)
    return response.json().then(response => {
      throw response;
    });

  return await response.json();
};

type gvmInnerError = {
  code: string;
  innerError: gvmInnerError;
};

type gvmError = {
  code: string;
  message: string;
  target?: string;
  details?: gvmError[] | null;
  innerError?: gvmInnerError | null;
};

//needs to be console.loggable
export class gvmHttpErrorResponse {
  constructor(public error: gvmError, public code: number, public message: string, public url: string) {}
}
