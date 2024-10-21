import { Box, Paper, Typography, css, styled } from '@mui/material';

import { DateFormat } from '#/libs/enums';
import { formatDate } from '#/libs/helpers';
import { CopyExtendedDto } from '#/services/copies';

import { Property } from '../atoms';
import { BookPaper } from './book-paper.molecule';

const CopyContainer = styled(Paper)(
  ({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${theme.spacing(2)};
    gap: ${theme.spacing(2)};
  `,
);

const InfoContainer = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const ItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

type CopyPaperProps = {
  children?: React.ReactNode;
  copy: CopyExtendedDto;
  hideUser?: boolean;
};

const CopyPaper = ({
  children,
  copy,
  hideUser,
}: CopyPaperProps): JSX.Element => {
  return (
    <CopyContainer elevation={4}>
      <InfoContainer>
        <BookPaper book={copy.book} title raw />
        {copy.user && !hideUser && (
          <ItemContainer>
            <Typography variant="h6" textAlign="center">
              User
            </Typography>
            <Property label="Full name">{copy.user.fullName}</Property>
            <Property label="Email">{copy.user.email}</Property>
          </ItemContainer>
        )}
        <ItemContainer>
          <Typography variant="h6" textAlign="center">
            Copy
          </Typography>
          <Property label="Reserve date">
            {formatDate(copy.updatedAt, DateFormat.FULL_DATE)}
          </Property>
          <Property
            label="Return until"
            error={new Date(copy.returnedAt).getTime() < Date.now()}
          >
            {formatDate(copy.returnedAt, DateFormat.FULL_DATE)}
          </Property>
        </ItemContainer>
      </InfoContainer>
      {children}
    </CopyContainer>
  );
};

export { CopyPaper, type CopyPaperProps };
