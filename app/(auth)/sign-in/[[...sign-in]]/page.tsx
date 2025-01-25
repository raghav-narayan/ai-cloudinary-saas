import { SignIn } from "@clerk/nextjs";
import styles from './SignIn.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <SignIn />
    </div>
  );
}