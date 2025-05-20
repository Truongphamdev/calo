import axios from 'axios';
import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError]=useState('');
    const navigate = useNavigate();
    const handleLogin=async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/login/',{
                email,
                password}
            );
            console.log(res.data)
            localStorage.setItem('access',res.data.access)
            localStorage.setItem('refresh', res.data.refresh);
            localStorage.setItem('user',JSON.stringify(res.data.user))
            navigate('/')
        } catch (error) {
             console.error(error.response?.data);
      setError(error.response?.data?.detail || 'Đăng nhập thất bại');
        }
    }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700" htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Đăng nhập
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
};

