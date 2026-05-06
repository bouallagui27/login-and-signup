import { Link } from 'react-router-dom';
import  { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Success:', data);
                alert("Account created successfully!");
            } else {
                console.error('Server error:', data);
                alert("Error: " + (data.message || "Something went wrong"));
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert("Could not connect to server");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
                    <p className="text-slate-400 text-sm">Join our platform and start building</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">Username</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            placeholder="Oussema ..."
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-900/20"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-slate-400 text-sm mt-8">
                    Already have an account? 
                    <Link to="/" className="text-emerald-400 font-medium hover:underline ml-1">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
