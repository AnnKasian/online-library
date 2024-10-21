import { Box, BoxProps, Typography, css, styled } from '@mui/material';

const GridContainer = styled(Box)(
  ({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2)};
    overflow: hidden;
  `,
);

const LabelContainer = styled(Box)(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing(2)};
    justify-content: space-between;
    align-items: center;
    padding: 0 ${theme.spacing(1)};
  `,
);

const ItemContainer = styled(
  ({ column, row, ...props }: BoxProps & { column: number; row: number }) => (
    <Box {...props} />
  ),
)(
  ({ column, row, theme }) => css`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${column}px, 1fr));
    grid-auto-rows: ${row}px;
    justify-content: center;
    gap: ${theme.spacing(4)};
    padding: 0 ${theme.spacing(1)} ${theme.spacing(2)};
  `,
);

type Properties = {
  children: React.ReactNode[];
  label: string;
  info?: React.ReactNode;
  size?: {
    column?: number;
    row?: number;
  };
  rowSize?: number;
  placeholder?: string;
};

const GridTemplate = ({
  children,
  label,
  info,
  size = {},
  placeholder = 'Items are not found',
}: Properties): JSX.Element => {
  return (
    <GridContainer>
      <LabelContainer>
        <Typography variant="h5">{label}</Typography>
        {info}
      </LabelContainer>
      {children.length ? (
        <ItemContainer column={size.column ?? 200} row={size.row ?? 200}>
          {children}
        </ItemContainer>
      ) : (
        <Typography variant="h6" textAlign="center">
          {placeholder}
        </Typography>
      )}
    </GridContainer>
  );
};

export { GridTemplate, type Properties as GridTemplateProps };
