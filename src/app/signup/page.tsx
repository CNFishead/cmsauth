import AuthPage from "@/layout/authPage/AuthPage.layout";
import SignUpView from "@/views/signUp/SignUp.view";
import { Suspense } from "react";
import StepsContainer from "./StepsContainer.component";

export default function PageView() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpView />
      <StepsContainer />
    </Suspense>
  );
}
