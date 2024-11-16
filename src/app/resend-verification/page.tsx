import ResendVerification from '@/views/verify/ResendVerification.view';  
import { Suspense } from 'react';

export default function PageView() { 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResendVerification />
    </Suspense>
  );
}
