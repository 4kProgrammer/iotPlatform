 import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [tempPassword, setTempPassword] = useState('');

  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email Login:', { email, password });
  };

  const handleMobileLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Mobile Login:', { mobile, tempPassword });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-md p-8">
          <h2 className="mb-4 text-2xl font-semibold">Login</h2>
          <form onSubmit={handleEmailLogin} className="mb-8">
            <div className="mb-4">
              <label className="block mb-1 font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
			<label className="block mb-1 font-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">
              Login with Email
            </button>
          </form>

          <form onSubmit={handleMobileLogin}>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Mobile</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Temporary Password</label>
              <input
                type="text"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">
              Login with Mobile
            </button>
          </form>
        </div>
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-500">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
