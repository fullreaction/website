export const ROOT_URL = 'http://localhost:3000/';

export const handleFetch = async response => {
  if (!response.ok) throw Error(response.statusText);
  return await response.json();
};

/*
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
  constructor(public error: gvmError, public headers: HttpHeaders, public status: number, public statusText: string, public url: string) {}
}
*/
