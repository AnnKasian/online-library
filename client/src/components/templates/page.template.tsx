import { Loader } from '../atoms';
import { Navigation } from '../molecules';
import { Header } from '../organisms';

type Properties = {
  children: React.ReactNode;
  isLoading?: boolean;
  isForm?: boolean;
  isBookPage?: boolean;
};

const PageTemplate = ({
  children,
  isLoading = false,
  isForm = false,
  isBookPage = false,
}: Properties): JSX.Element => {
  return (
    <div className={'flex flex-col min-h-screen'}>
      <div className={'sticky top-0 left-0 z-10 w-full h-18'}>
        <Header />
      </div>
      {!isForm && (
        <div className={'self-center m-6'}>
          <Navigation />
        </div>
      )}

      <div className={'grid items-stretch border-t-2 border-t-accent pt-6'}>
        {isLoading ? (
          <Loader />
        ) : isForm || isBookPage ? (
          <div className="flex justify-center items-center self-center ">
            {children}
          </div>
        ) : (
          <main className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 px-4 pb-5">
            {children}
          </main>
        )}
      </div>
    </div>
  );
};

export { PageTemplate };
