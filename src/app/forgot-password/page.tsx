'use client';
import ResetPassword from '@/views/forgotPassword/resetPassword/ResetPassword.view';
import SendPasswordResetEmail from '@/views/forgotPassword/sendPasswordResetEmail/SendPasswordResetEmail.view';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function PageView() {
  const passwordResetToken = useSearchParams().get('resettoken');
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {passwordResetToken ? (
        <ResetPassword resetToken={passwordResetToken} />
      ) : (
        <SendPasswordResetEmail />
      )}
    </Suspense>
  );
}


