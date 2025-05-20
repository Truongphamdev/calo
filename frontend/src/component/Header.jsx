import React, { useState, useEffect } from 'react';
import { useNavigate ,Link,useLocation} from 'react-router-dom';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  // Kiểm tra xem người dùng đã đăng nhập chưa khi trang được tải
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access'); // Xóa token khi đăng xuất
    setIsLoggedIn(false);
    navigate('/login'); // Điều hướng tới trang đăng nhập
  };
  return (
    <div>
          <header className="bg-white shadow sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold text-green-600 hover:text-green-700">
                  🍽️ CaloAI
                </Link>
        
                {/* Navigation menu */}
                <nav className="space-x-6 hidden md:block">
                  <Link to="/home" className={`font-medium hover:text-green-600 ${location.pathname==="/home" ?"text-green-600":"text-gray-700"} `}>Trang chủ</Link>
                  
                  <Link to="/analyze" className={`font-medium hover:text-green-600 ${location.pathname==="/analyze" ?"text-green-600":"text-gray-700"} `}>Phân tích</Link>
                  <Link to="/about" className={`font-medium hover:text-green-600 ${location.pathname==="/about" ?"text-green-600":"text-gray-700"} `}>Giới thiệu</Link>
                  <Link to="/contact" className={`font-medium hover:text-green-600 ${location.pathname==="/contact" ?"text-green-600":"text-gray-700"} `}>Liên hệ</Link>
                </nav>
        
                {/* User info */}
                <div className="flex items-center space-x-4">
                  {isLoggedIn ? (
                    <>
                      <div className="hidden sm:flex items-center space-x-2">
                        <img
                          src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-semibold text-gray-700">Xin chào, <span className="text-green-600">{user.username}</span></span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-sm"
                    >
                      Đăng nhập
                    </Link>
                  )}
                </div>
              </div>
            </header>
    </div>
  )
}
