import { Title } from '../atoms';

const Header = (): JSX.Element => {
  return (
    <header
      className={
        'flex items-center justify-between px-20 py-16 border-b-1 border-solid bg-black'
      }
    >
      <Title />
    </header>
  );
};

export { Header };
