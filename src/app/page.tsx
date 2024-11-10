import SignInView from '@/views/signIn/SignIn.view';
import { Suspense } from 'react';

export default function PageView() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInView />;
    </Suspense>
  );
}
