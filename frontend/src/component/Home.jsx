import React, { useState, useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';

const Home = () => {


  return (
      <div className="bg-white min-h-screen">
       
  
        {/* Hero section */}
        <section className="bg-gradient-to-r from-green-200 via-green-100 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
              Phân Tích Calo Từ Ảnh Khẩu Phần Ăn
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Ứng dụng AI giúp bạn theo dõi lượng calo và dinh dưỡng trong khẩu phần ăn một cách thông minh, nhanh chóng và chính xác.
            </p>
            <Link to="/analyze">
              <button className="px-6 py-3 bg-green-600 text-white text-lg rounded-full hover:bg-green-700 transition">
                Bắt đầu ngay
              </button>
            </Link>
          </div>
        </section>
  
        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
            <div>
              <img src="https://img.icons8.com/emoji/96/bento-box-emoji.png" alt="food" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nhận diện thực phẩm</h3>
              <p className="text-gray-600">AI phân tích hình ảnh để xác định các loại thực phẩm có trong khẩu phần.</p>
            </div>
            <div>
              <img src="https://img.icons8.com/emoji/96/chart-increasing-emoji.png" alt="chart" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tính toán dinh dưỡng</h3>
              <p className="text-gray-600">Lượng calo, protein, carbs và chất béo được tính toán chính xác.</p>
            </div>
            <div>
              <img src="https://img.icons8.com/emoji/96/check-mark-emoji.png" alt="check" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Theo dõi sức khỏe</h3>
              <p className="text-gray-600">Giúp bạn kiểm soát chế độ ăn uống và cải thiện lối sống lành mạnh.</p>
            </div>
          </div>
        </section>
  
        {/* Guide section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-green-800">Cách sử dụng ứng dụng</h2>
            <ol className="text-left max-w-xl mx-auto text-lg space-y-3 text-gray-700 list-decimal pl-6">
              <li>Chụp ảnh khẩu phần ăn của bạn.</li>
              <li>Tải ảnh lên ứng dụng.</li>
              <li>Đợi AI phân tích và hiển thị thông tin dinh dưỡng.</li>
              <li>Lưu lại dữ liệu hoặc chia sẻ với bác sĩ dinh dưỡng.</li>
            </ol>
          </div>
        </section>
  
        {/* Footer */}
{/* Footer mở rộng */}


      </div>
    );}

export default Home;
