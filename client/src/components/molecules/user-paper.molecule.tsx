import { Box, Typography, css, styled } from '@mui/material';

const PaperContainer = styled(Box)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing(1)};
  `,
);

type Properties = {
  name: string;
};

const UserPaper = ({ name }: Properties): JSX.Element => {
  return (
    <PaperContainer>
      <Typography variant="h5">User name:</Typography>
      <Typography variant="body1">{name}</Typography>
    </PaperContainer>
  );
};

export { UserPaper, type Properties as UserPaperProperties };
