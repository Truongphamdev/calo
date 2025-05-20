import React from 'react';

export const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 min-h-screen py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Phần thông tin liên hệ */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-green-700">Liên hệ với chúng tôi</h2>
          <p className="text-gray-700">
            Nếu bạn có bất kỳ câu hỏi nào về dịch vụ, vui lòng gửi tin nhắn cho chúng tôi hoặc gọi trực tiếp qua thông tin bên dưới.
          </p>

          <div className="space-y-3 text-gray-600">
            <div>
              <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP. Hồ Chí Minh
            </div>
            <div>
              <strong>Email:</strong> truongnguyen01653@gmail.com
            </div>
            <div>
              <strong>Điện thoại:</strong> 0365908714
            </div>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-blue-600 hover:underline">Facebook</a>
              <a href="#" className="text-pink-500 hover:underline">Instagram</a>
              <a href="#" className="text-blue-400 hover:underline">Twitter</a>
            </div>
          </div>
        </div>

        {/* Phần form liên hệ */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700">Họ và tên</label>
              <input
                type="text"
                id="name"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">Nội dung</label>
              <textarea
                id="message"
                rows="4"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Viết nội dung bạn muốn gửi..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
