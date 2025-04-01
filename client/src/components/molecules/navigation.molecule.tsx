import { useNavigate } from 'react-router-dom';

import { Route } from '#/libs/enums';
import { useAdminPermission } from '#/libs/hooks';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui';

const Navigation = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGeleryClick = () => {
    navigate(Route.BOOKS);
  };
  const handleCopiesClick = () => {
    navigate(Route.COPIES);
  };
  const handleMyCopiesClick = () => {
    navigate(Route.MY_COPIES);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem onClick={handleGeleryClick}>
          <NavigationMenuTrigger>
            <NavigationMenuLink>Books gallery</NavigationMenuLink>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        {useAdminPermission() && (
          <NavigationMenuItem onClick={handleCopiesClick}>
            <NavigationMenuTrigger>
              <NavigationMenuLink>All booked copies</NavigationMenuLink>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem onClick={handleMyCopiesClick}>
          <NavigationMenuTrigger>
            <NavigationMenuLink>My copies</NavigationMenuLink>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { Navigation };
