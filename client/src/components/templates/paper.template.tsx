import { Paper, Typography, css, styled } from '@mui/material';

import { PageTemplate } from './page.template';

const PageContainer = styled(PageTemplate)`
  justify-content: center;
  align-items: center;
`;

const DataPaper = styled(Paper)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(4)};
    padding: ${theme.spacing(8)};
    border-radius: ${theme.shape.borderRadius};
  `,
);

type PaperTemplateProps = {
  children: React.ReactNode;
  title: string;
};

const PaperTemplate = ({
  children,
  title,
}: PaperTemplateProps): JSX.Element => {
  return (
    <PageContainer>
      <DataPaper elevation={4}>
        <Typography variant="h3" textAlign="center">
          {title}
        </Typography>
        {children}
      </DataPaper>
    </PageContainer>
  );
};

export { PaperTemplate, type PaperTemplateProps };
