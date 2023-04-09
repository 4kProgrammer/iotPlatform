import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Reset password for:', email);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-md p-8">
          <h2 className="mb-4 text-2xl font-semibold">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
