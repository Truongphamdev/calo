import React from 'react';

export const About = () => {
  return (
    <div className="bg-gradient-to-r from-green-200 via-green-100 to-white py-20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-green-600 mb-6">Về chúng tôi</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          <span className="font-semibold">CaloAI</span> là một ứng dụng thông minh sử dụng trí tuệ nhân tạo để giúp bạn
          phân tích khẩu phần ăn từ hình ảnh và đưa ra thông tin dinh dưỡng chính xác. Chúng tôi hướng đến việc hỗ trợ
          người dùng duy trì chế độ ăn lành mạnh và kiểm soát lượng calo hàng ngày một cách dễ dàng và hiệu quả.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-left">
            <h3 className="text-xl font-bold text-green-600 mb-2">🎯 Sứ mệnh</h3>
            <p className="text-gray-600">
              Mang lại giải pháp dinh dưỡng nhanh chóng, dễ dùng và chính xác cho mọi người, ở mọi lứa tuổi.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-left">
            <h3 className="text-xl font-bold text-green-600 mb-2">🤖 Công nghệ</h3>
            <p className="text-gray-600">
              Ứng dụng AI, Deep Learning và Computer Vision để nhận diện thực phẩm và phân tích calo qua ảnh.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-left">
            <h3 className="text-xl font-bold text-green-600 mb-2">👨‍💻 Đội ngũ</h3>
            <p className="text-gray-600">
              Gồm các sinh viên đam mê công nghệ và sức khỏe, đang phát triển giải pháp giúp cộng đồng sống khỏe mạnh hơn.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Liên hệ với chúng tôi</h4>
          <p className="text-gray-600 mb-2">📧 Email: caloai.support@gmail.com</p>
          <p className="text-gray-600">📍 Địa chỉ: Trường Cao đẳng DANAVTC, Đà Nẵng, Việt Nam</p>
        </div>
      </div>
    </div>
  );
};
