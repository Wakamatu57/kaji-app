import React from 'react';

type HeaderProps = {
  userName: string;
};

const Header = ({ userName }: HeaderProps) => {
  return (
    <header className="bg-indigo-600 h-20 text-white p-4 text-center flex flex-col justify-center">
      <h1 className="text-2xl font-bold">家事やってますアピール帳</h1>
      <p>ユーザ名: {userName}</p>
    </header>
  );
};

export default Header;
