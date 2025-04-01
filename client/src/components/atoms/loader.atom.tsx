const Loader = (): JSX.Element => (
  <div className={'flex items-center justify-center w-full h-full'}>
    <div
      aria-label="Loading"
      className={
        'relative box-border inline-block w-12 h-12 border-5 border-blue-500 rounded-lg border-b-transparent animate-spin '
      }
      role="status"
    />
  </div>
);

export { Loader };
