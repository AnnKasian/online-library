import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Route } from '#/libs/enums';
import { useThemeStore } from '#/providers/store';

import { Title } from '../atoms';
import { Avatar, AvatarFallback, AvatarImage, Switch } from '../ui';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const handleAvatarClick = () => {
    navigate(Route.USER_PAGE);
  };

  const theme = useThemeStore((state) => state.theme);
  const ChangeTheme = useThemeStore((state) => state.changeTheme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <header
      className={
        'flex items-center justify-between px-4 py-3 border-b-accent border-b-2'
      }
    >
      <Title />
      <div className={'flex flex-row gap-6 items-center'}>
        <Switch
          onCheckedChange={(e) => {
            ChangeTheme(e.valueOf() ? 'dark' : 'light');
          }}
          checked={theme === 'dark'}
        />
        <Avatar onClick={handleAvatarClick}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export { Header };
