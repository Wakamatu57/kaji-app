'use client';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/organisms/signup-form';
import { useLoading } from '@/context/loading-context';

export default function SignupPage() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const register = async () => {
    showLoading();
    // Todo: ここでサーバーに登録リクエストを送る処理を実装する
    setTimeout(() => {
      router.push('/');
      hideLoading();
    }, 1000);
  };

  return <SignupForm onSubmit={register} />;
}
