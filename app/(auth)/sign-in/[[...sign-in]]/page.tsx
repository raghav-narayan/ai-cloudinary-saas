import { SignIn } from "@clerk/nextjs";
import styles from './SignIn.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.glass}>
        <SignIn />
      </div>
    </div>
  );
}
