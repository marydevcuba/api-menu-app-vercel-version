const returnFormat = (
  status: string,
  errorMessage: string | null,
  data: any
) => {
  return { status, errorMessage, data };
};

export { returnFormat };
