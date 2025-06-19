import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
const BACKEND = import.meta.env.VITE_API_URL;


export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
             Swal.fire({
                        title: 'Error!',
                         text: `Passwords do not match`,
                         icon: 'error',
                         confirmButtonText: 'Cool'
                        });
            return;
        };

        const res = await fetch(`${BACKEND}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        
        if (res.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Registration successful',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate('/dashboard'); // Redirect to login page on success

        } else {
            const errorData = await res.json();
            Swal.fire({
                title: 'Error!',
                text: `${errorData.message || 'Registration failed'}`,
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
    };
    
    
    return (
       <>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo/Title */}
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
                 Register
                </h1>
                
                {/* Form Container */}
                <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>

                    {/* Password Input */}
                    <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    </div>

                    {/* Register Button */}
                    <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Create Account
                    </button>
                    </div>
                </form>

                {/* Sign in link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        Sign in
                    </Link>
                    </p>
                </div>
                </div>
            </div>
        </div>
       </>
    );
}   