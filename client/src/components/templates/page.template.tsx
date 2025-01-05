import { Loader } from '../atoms';
import { Header } from '../organisms';

type Properties = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const PageTemplate = ({
  children,
  isLoading = false,
}: Properties): JSX.Element => {
  return (
    <div className={'flex flex-col min-h-screen'}>
      <div className={'sticky top-0 left-0 z-10 w-full'}>
        <Header />
      </div>
      <div className={'flex flex-1 items-stretch'}>
        <main className={'flex dlex-1 flex-col px-80 py-32 '}>
          {isLoading ? <Loader /> : <>{children}</>}
        </main>
      </div>
    </div>
  );
};

export { PageTemplate };
