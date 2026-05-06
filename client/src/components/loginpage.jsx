import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data);
        alert("Welcome back! Login successful.");
      } else {
        console.error('Server error:', data);
        alert("Error: " + (data.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error('Error during login:', err);
      alert("Could not connect to server. Make sure your backend is running.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Enter your credentials to access your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-slate-300 text-sm font-medium">Password</label>
              <a href="#" className="text-blue-400 text-xs hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/20">
            Sign In
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-8">
          Don't have an account? 
          <Link to="/register" className="text-blue-400 font-medium hover:underline ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;