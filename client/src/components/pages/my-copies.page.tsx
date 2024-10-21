import { useEffect } from 'react';

import { DataStatus } from '#/libs/enums';
import { useAppDispatch, useAppSelector } from '#/libs/hooks';
import { copiesActions } from '#/slices/copies';

import { Loader } from '../atoms';
import { CopyPaper } from '../molecules';
import { GridTemplate, PageTemplate } from '../templates';

const MyCopies = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { copies, dataStatus } = useAppSelector(({ copies }) => ({
    copies: copies.copiesUser?.copies,
    dataStatus: copies.dataStatus.getByUser,
  }));

  useEffect(() => {
    void dispatch(copiesActions.getByUser());
  }, [dispatch]);

  if (!copies || dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <PageTemplate>
      <GridTemplate
        label="Copies"
        size={{
          column: 250,
          row: 220,
        }}
      >
        {copies.map((copy) => (
          <CopyPaper key={copy.id} copy={copy} hideUser />
        ))}
      </GridTemplate>
    </PageTemplate>
  );
};

export { MyCopies };
