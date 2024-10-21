import { Paper, PaperProps, Typography, css, styled } from '@mui/material';

import { Route } from '#/libs/enums';
import { getEndpoint } from '#/libs/helpers';
import { BookDto } from '#/services/books';

import { Button, Property } from '../atoms';

const BookButton = styled(Button)`
  height: 100%;
`;

const BookContainer = styled(
  ({ raw, ...props }: PaperProps & { raw: boolean }) => <Paper {...props} />,
)(
  ({ raw, theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${theme.spacing(raw ? 0 : 2)};
  `,
);

type BookPaperProps = {
  book: BookDto;
  title?: boolean;
  raw?: boolean;
};

const BookPaper = ({
  book,
  title = false,
  raw = false,
}: BookPaperProps): JSX.Element => {
  return (
    <BookButton
      variant="action"
      to={getEndpoint(Route.BOOK_$ID, {
        id: book.id,
      })}
      fullWidth
    >
      <BookContainer elevation={raw ? 0 : 4} raw={raw}>
        {title && <Typography variant="h6">Book</Typography>}
        <Property label="Title">{book.title}</Property>
        <Property label="Author">{book.author}</Property>
      </BookContainer>
    </BookButton>
  );
};

export { BookPaper, type BookPaperProps };
