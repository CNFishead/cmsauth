import SignUpView from "@/views/signUp/SignUp.view";
import { Suspense } from "react";
import StepsContainer from "./StepsContainer.component";
import styles from "./page.module.scss";

export default function PageView() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpView />
      <StepsContainer />
    </Suspense>
  );
}
