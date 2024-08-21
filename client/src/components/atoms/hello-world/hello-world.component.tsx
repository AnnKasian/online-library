import { classNames } from '#/libs/helpers';

import styles from './hello-world.module.scss';

const HelloWorld = (): JSX.Element => {
  return (
    <span
      className={classNames(styles['hello-world'], false && 'name', {
        'name': false,
      })}
    >
      Hello World!
    </span>
  );
};

export { HelloWorld };
