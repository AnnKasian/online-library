import { Box, css, styled } from '@mui/material';

import { DateFormat } from '@/libs/enums';

import { formatDate } from '#/libs/helpers';
import { BookDto } from '#/services/books';

import { Property } from '../atoms';

const InfoContainer = styled(Box)(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(1)};
  `,
);

type BookInfoProps = {
  book: BookDto;
  amount: number;
};

const BookInfo = ({ book, amount }: BookInfoProps): JSX.Element => {
  const { title, author, genre, description, createdAt } = book;
  const addedDate = formatDate(createdAt, DateFormat.FULL_DATE);

  return (
    <InfoContainer>
      <Property label="Title">{title}</Property>
      <Property label="Author">{author}</Property>
      <Property label="Genre">{genre}</Property>
      {description && <Property label="Description">{description}</Property>}
      <Property label="Added on platform">{addedDate}</Property>
      <Property label="Available amount">{amount}</Property>
    </InfoContainer>
  );
};

export { BookInfo, type BookInfoProps };
