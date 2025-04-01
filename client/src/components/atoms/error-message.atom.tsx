type Properties = {
  message?: string;
};

const ErrorMessage = ({ message }: Properties): JSX.Element => {
  return message ? <div className={'text-red-600'}>{message}</div> : <></>;
};

export { ErrorMessage };
