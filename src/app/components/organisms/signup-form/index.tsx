// components/organisms/SignupForm.tsx
'use client';
import { on } from 'events';
import Link from 'next/link';
import { useState } from 'react';

interface SignupFormProps {
  username: string;
  setUsername: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  groupOption: 'join' | 'create';
  setGroupOption: (v: 'join' | 'create') => void;
  groupName: string;
  setGroupName: (v: string) => void;
  groupPassword: string;
  setGroupPassword: (v: string) => void;
  isAgreed: boolean;
  setIsAgreed: (v: boolean) => void;
  onSubmit: () => void;
}

export default function SignupForm({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  groupOption,
  setGroupOption,
  groupName,
  setGroupName,
  groupPassword,
  setGroupPassword,
  isAgreed,
  setIsAgreed,
  onSubmit,
}: SignupFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">新規登録</h1>

        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="join"
              checked={groupOption === 'join'}
              onChange={() => setGroupOption('join')}
            />
            既存グループに参加
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="create"
              checked={groupOption === 'create'}
              onChange={() => setGroupOption('create')}
            />
            新規グループ作成
          </label>
        </div>

        <input
          type="text"
          placeholder={groupOption === 'join' ? 'グループ名' : '新規グループ名'}
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          placeholder="グループの合言葉"
          value={groupPassword}
          onChange={(e) => setGroupPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />
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
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          利用規約に同意する
        </label>

        <button
          onClick={onSubmit}
          disabled={!isAgreed}
          className={`py-2 rounded font-bold text-white ${
            isAgreed ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          登録
        </button>

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
