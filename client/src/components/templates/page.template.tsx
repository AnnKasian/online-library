import { Container, ContainerProps, css, styled } from '@mui/material';
import React from 'react';

const PageContainer = styled(Container)(
  ({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: ${theme.spacing(2)};
    padding-bottom: ${theme.spacing(2)};
  `,
);

type Properties = {
  children: React.ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
  className?: string;
};

const PageTemplate = ({
  children,
  maxWidth = 'md',
  className,
}: Properties): JSX.Element => {
  return (
    <PageContainer maxWidth={maxWidth} className={className}>
      {children}
    </PageContainer>
  );
};

export { PageTemplate };
