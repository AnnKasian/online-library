import { createAppStore } from '#/providers/store';

type AppDispatch = ReturnType<typeof createAppStore>['dispatch'];

export type { AppDispatch };
