import { Box, Button } from '@mui/material';
import { useEffect } from 'react';

import { DataStatus } from '#/libs/enums';
import { useAppDispatch, useAppSelector } from '#/libs/hooks';
import { copiesActions } from '#/slices/copies';

import { Loader } from '../atoms';
import { CopyPaper } from '../molecules';
import { GridTemplate, PageTemplate } from '../templates';

const AdminCopies = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { copies, dataStatus } = useAppSelector(({ copies }) => ({
    copies: copies.copiesReserved?.copies,
    dataStatus: copies.dataStatus.getReserved,
  }));

  useEffect(() => {
    void dispatch(copiesActions.getReserved());
  }, [dispatch]);

  const handleClear = (copyId: number) => {
    void dispatch(copiesActions.clear(copyId));
  };

  if (!copies || dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <PageTemplate>
      <GridTemplate
        label="Copies"
        size={{
          column: 370,
          row: 270,
        }}
      >
        {copies.map((copy) => (
          <CopyPaper key={copy.id} copy={copy}>
            <Box display="flex" justifyContent="center">
              <Button
                onClick={() => {
                  handleClear(copy.id);
                }}
                variant="contained"
              >
                Clear
              </Button>
            </Box>
          </CopyPaper>
        ))}
      </GridTemplate>
    </PageTemplate>
  );
};

export { AdminCopies };
