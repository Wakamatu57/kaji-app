'use client';
import { useRouter } from 'next/navigation';
import SignupForm, { FormValues } from '@/components/organisms/signup-form';
import { useLoading } from '@/context/loading-context';
import { signup } from '@/services';

export default function SignupPage() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const register = async (data: FormValues) => {
    try {
      showLoading();
      await signup({
        username: data.username,
        email: data.email,
        password: data.password,
        groupOption: data.groupOption,
        groupName: data.groupName,
        groupPassword: data.groupPassword,
      });
      router.push('/');
    } catch (err) {
      const e = err as { message: string };
      console.error(e);
      alert(e.message || '登録に失敗しました。');
    } finally {
      hideLoading();
    }
  };

  return <SignupForm onSubmit={register} />;
}
