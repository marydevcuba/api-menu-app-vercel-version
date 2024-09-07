export interface ValidateDataError {
  res: string;
  err: string;
}

export interface HttpError {
  res: string;
  error: string;
  statusError?: number;
}
