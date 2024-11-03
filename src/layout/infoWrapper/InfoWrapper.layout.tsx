import Link from 'next/link';
import styles from './InfoWrapper.module.scss';

type Props = {
  children?: React.ReactNode;
  links?: ('login' | 'signup' | 'forgot-password')[];
};

const InfoWrapper = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.children}

      {props.links?.includes('login') && (
        <p className={styles.link}>
          Already have an account? <Link href="/?logout=true">Login</Link>
        </p>
      )}

      {props.links?.includes('signup') && (
        <p className={styles.link}>
          Don't have an account?{' '}
          <Link href="/signup">Start an application to be a merchant!</Link>
        </p>
      )}

      {props.links?.includes('forgot-password') && (
        <p className={styles.link}>
          <Link href="/forgot-password">Forgot your password?</Link>
        </p>
      )}
    </div>
  );
};

export default InfoWrapper;
