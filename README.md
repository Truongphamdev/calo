# 🔍 Dự án Phân Tích Calo Từ Hình Ảnh

> Một hệ thống giúp người dùng ước tính lượng calo trong món ăn thông qua hình ảnh, hỗ trợ xây dựng chế độ ăn uống lành mạnh bằng AI.

---

## 📌 Mục tiêu dự án

- Nhận diện **món ăn** từ hình ảnh.
- Ước tính **lượng calo** và các thành phần dinh dưỡng chính.
- Theo dõi lịch sử ăn uống

---

## 🛠️ Công nghệ sử dụng

- **Frontend**: ReactJS + TailwindCSS  
- **Backend**: Django REST Framework 
- **Cơ sở dữ liệu**: PostgreSQL 
- **AI**: Clarifai API 

---

## 📷 Tính năng chính

- 📸 Nhận diện món ăn từ ảnh chụp
- 🔢 Ước lượng calo, protein, carbs, fat
- 📊 Ghi lại lịch sử ăn uống hàng ngày

---

## 🚀 Hướng dẫn chạy dự án

### ⚙️ Cài đặt frontend

```bash
cd client
npm install
npm start
```

### ⚙️ Cài đặt backend
```bash
cd server
pip install -r requirements.txt
python manage.py runserver


