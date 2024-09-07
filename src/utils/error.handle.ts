import { Response } from "express";

/**
 *
 * @param res Receives Response to send Status Error
 * @param error String message with error description.
 * @param statusError Status Error (optional). default status 500
 */
const handleHttpError = (
  res: Response,
  error: string,
  statusError?: number
) => {
  res.status(statusError || 500);
  res.send({ status: "ERROR", errorMessage: error, data: null });
};

const validateDataError = (errorDescription: string) => {
  return { status: "ERROR", errorMessage: errorDescription, data: null };
};

export { handleHttpError, validateDataError };
