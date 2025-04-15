import { useNavigate } from 'react-router-dom';

import { getEndpoint } from '@/libs/helpers';

import { useAuth } from '#/api/users';
import { Route } from '#/libs/enums';

import { PageTemplate } from '../templates';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../ui';

const UserPage = (): JSX.Element => {
  const { data, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleEditClick = (id: number) => {
    return () => {
      navigate(getEndpoint(Route.USER_UPDATE_$ID, { id }));
    };
  };

  return (
    <PageTemplate isLoading={isLoading} isBookPage>
      {data && (
        <Card className={'self-center min-w-80'}>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>Full name: {data.fullName}</CardContent>
          <CardContent>Email: {data.email}</CardContent>
          <CardContent>{}</CardContent>
          <div className={'flex gap-10 justify-center m-4'}>
            <Button
              variant={'default'}
              onClick={handleEditClick(data.id)}
              type="button"
              className={'w-30'}
            >
              Edit Profile
            </Button>
          </div>
        </Card>
      )}
    </PageTemplate>
  );
};

export { UserPage };
