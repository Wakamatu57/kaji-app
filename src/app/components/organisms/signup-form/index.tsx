'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
  password: string;
  groupOption: 'join' | 'create';
  groupName: string;
  groupPassword: string;
  isAgreed: boolean;
};

export default function SignupForm({ onSubmit }: { onSubmit: (data: FormValues) => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      groupOption: 'join',
      isAgreed: false,
    },
  });

  const groupOption = watch('groupOption');
  const isAgreed = watch('isAgreed');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">新規登録</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="ユーザー名"
            {...register('username', { required: 'ユーザー名は必須です' })}
            className="border p-2 rounded w-full"
          />
          {errors.username && (
            <span className="text-red-500 text-xs">{errors.username.message}</span>
          )}

          <input
            type="email"
            placeholder="メールアドレス"
            {...register('email', {
              required: 'メールアドレスは必須です',
              pattern: { value: /^\S+@\S+$/i, message: 'メールアドレスの形式が正しくありません' },
            })}
            className="border p-2 rounded w-full"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="パスワード"
            {...register('password', {
              required: 'パスワードは必須です',
              minLength: { value: 6, message: '6文字以上で入力してください' },
            })}
            className="border p-2 rounded w-full"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password.message}</span>
          )}

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="join"
                {...register('groupOption')}
                checked={groupOption === 'join'}
              />
              既存グループに参加
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="create"
                {...register('groupOption')}
                checked={groupOption === 'create'}
              />
              新規グループ作成
            </label>
          </div>

          <input
            type="text"
            placeholder={groupOption === 'join' ? 'グループ名' : '新規グループ名'}
            {...register('groupName', { required: 'グループ名は必須です' })}
            className="border p-2 rounded w-full"
          />
          {errors.groupName && (
            <span className="text-red-500 text-xs">{errors.groupName.message}</span>
          )}

          <input
            type="password"
            placeholder="グループの合言葉"
            {...register('groupPassword', { required: 'グループの合言葉は必須です' })}
            className="border p-2 rounded w-full"
          />
          {errors.groupPassword && (
            <span className="text-red-500 text-xs">{errors.groupPassword.message}</span>
          )}

          <div className="border rounded-md p-3 max-h-24 overflow-y-auto bg-gray-50 text-sm space-y-3">
            <h2 className="font-bold text-base">免責事項</h2>
            <p>
              本アプリは個人の実験的な開発・運用を目的としたものであり、常時安定的に利用できることを保証するものではありません。
            </p>
            <p>
              本アプリの利用に関連して発生した損害（データの消失、情報の漏洩、不具合によるトラブルなど）について、開発者は一切の責任を負いません。
            </p>
            <p>
              ユーザーが入力した情報（パスワードやメールアドレスなど）について、可能な限りの対策は行いますが、情報漏洩や不正アクセスが発生した場合においても、開発者は責任を負いません。
            </p>
            <p>本アプリの仕様は予告なく変更・停止・削除される場合があります。</p>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register('isAgreed', { required: '利用規約への同意が必要です' })}
              checked={isAgreed}
            />
            利用規約に同意する
          </label>
          {errors.isAgreed && (
            <span className="text-red-500 text-xs">{errors.isAgreed.message}</span>
          )}

          <button
            type="submit"
            disabled={!isAgreed}
            className={`py-2 rounded font-bold text-white ${
              isAgreed ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            登録
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          <span>すでにアカウントをお持ちですか？ </span>
          <Link href="/" className="text-indigo-600 hover:underline">
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
