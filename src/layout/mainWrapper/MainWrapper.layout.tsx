import Image from 'next/image';
import styles from './MainWrapper.module.scss';

type Props = {
  children?: React.ReactNode;
  title: string;
  description: string;
};

const MainWrapper = (props: Props) => {
  return (
    <div className={styles.container}>
      {/* <Image
        src="/images/logo-salt.png"
        width={40}
        height={40}
        alt="logo"
        className={styles.logo}
      /> */}
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      {props.children}
    </div>
  );
};

export default MainWrapper;
