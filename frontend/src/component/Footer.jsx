import React from 'react'

export const Footer = () => {
  return (
    <div>
      {/* Footer mở rộng */}
<footer className="bg-green-700 text-white py-10 mt-16">
  <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Cột 1: Thông tin ứng dụng */}
    <div>
      <h3 className="text-xl font-bold mb-4">CaloAI</h3>
      <p>Ứng dụng hỗ trợ theo dõi calo và dinh dưỡng dựa trên AI. Giúp bạn ăn uống khoa học và sống khỏe mạnh hơn mỗi ngày.</p>
    </div>

    {/* Cột 2: Liên kết nhanh */}
    <div>
      <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
      <ul className="space-y-2">
        <li><a href="/" className="hover:underline">Trang chủ</a></li>
        <li><a href="/analyze" className="hover:underline">Phân tích ảnh</a></li>
        <li><a href="/about" className="hover:underline">Giới thiệu</a></li>
        <li><a href="/login" className="hover:underline">Đăng nhập</a></li>
      </ul>
    </div>

    {/* Cột 3: Liên hệ */}
    <div>
      <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
      <p>Email: <a href="mailto:support@caloai.com" className="underline">support@caloai.com</a></p>
      <p>Hotline: 0123 456 789</p>
      <p>Địa chỉ: 123 Lê Lợi, Quận Hải Châu, Đà Nẵng</p>
    </div>

    {/* Cột 4: Mạng xã hội */}
    <div>
      <h3 className="text-xl font-bold mb-4">Kết nối với chúng tôi</h3>
      <div className="flex space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/ios-filled/30/ffffff/facebook-new.png" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/ios-filled/30/ffffff/instagram-new.png" alt="Instagram" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/ios-filled/30/ffffff/tiktok--v1.png" alt="TikTok" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/ios-filled/30/ffffff/youtube-play.png" alt="YouTube" />
        </a>
      </div>
    </div>
  </div>

  <div className="mt-10 text-center text-sm text-green-100 border-t border-green-500 pt-4">
    &copy; 2025 CaloAI. All rights reserved.
  </div>
</footer>

    </div>
  )
}
