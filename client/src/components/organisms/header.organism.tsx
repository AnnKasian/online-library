import { Title } from '../atoms';

const Header = (): JSX.Element => {
  return (
    <header
      className={
        'flex items-center justify-between px-4 py-3 border-b-accent border-b-2'
      }
    >
      <Title />
    </header>
  );
};

export { Header };
