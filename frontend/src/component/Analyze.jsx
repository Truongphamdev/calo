import axios from 'axios';
import React ,{useState,useEffect} from 'react'
const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// Interceptor để xử lý lỗi 401 và refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        // Gọi API refresh token
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        });
        const newAccessToken = response.data.access;
        // Lưu access token mới
        localStorage.setItem('access', newAccessToken);
        // Cập nhật header cho request ban đầu
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        // Thử lại request
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token hết hạn, chuyển hướng đăng nhập
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export const Analyze = () => {
    const [image,setImage]= useState(null);
    const [nutrition,setNutrition] = useState(null);
    const [loading,setLoading] = useState(false);
    const [mealLogs,setMealLogs] = useState(null);
      const [error,setError] = useState("");

const token = localStorage.getItem('access');
// console.log('Token:', token);

    const handleImageChange =(e) => {
        const file = e.target.files[0];
        if(file) {
            setImage(file);
        }
        setNutrition(null)
    }
    // xử lý lấy nhật ký
    const handlemeallog = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await api.get("/api/meallog/",{headers: {Authorization: `Bearer ${token}`}})
        setMealLogs(res.data)
        console.log("dữ liệu logmeal",res.data)
      } catch (error) {
        setError(error.message)
      }
    }
    useEffect(()=> {
      handlemeallog()
    },[])
    const handleAnalyze = async () => {
      if (!image) {
      setError('Vui lòng chọn ảnh');
      return;
    }
      setLoading(true)
      setError("")
        try {
            const token = localStorage.getItem('access')
            const formData = new FormData();
            
            formData.append('image',image)
            const res = await api.post("/api/analyze/",formData,{headers: {Authorization: `Bearer ${token}`} });
            console.log("dữ liệu",res.data)
            setNutrition(res.data)

        } catch (error) {
            console.log(error)
            setError(error.message)
        }
        finally {
          setLoading(false)
        }
    }
  return (
<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center py-10 px-4">
  <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">Phân tích calo từ khẩu phần ăn</h1>

  <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
    
    {/* CỘT PHÂN TÍCH ẢNH */}
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full lg:w-2/3">
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">Tải ảnh khẩu phần ăn của bạn:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-green-400"
        />
      </div>

      {image && (
        <div className="my-4 flex justify-center">
          <img src={URL.createObjectURL(image)} alt="Meal Preview" className="rounded-lg shadow-md max-h-64 object-contain" />
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleAnalyze}
          disabled={!image || loading}
          className={`mt-4 px-6 py-3 rounded-lg font-semibold ${
            image && !loading
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-400 text-gray-100 cursor-not-allowed'
          } transition duration-300`}
        >
          {loading ? 'Đang phân tích...' : 'Phân tích'}
        </button>
      </div>

      {loading && (
        <div className="mt-4 text-center text-green-600 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>Đang chờ phân tích...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-600">
          <p>{error}</p>
        </div>
      )}

      {nutrition && (
        <div className="mt-8 bg-green-50 p-6 rounded-lg shadow-inner border border-green-200">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Kết quả dinh dưỡng</h2>
          <p><strong>Món ăn:</strong> {nutrition.detected_foods?.join(', ') || 'Không xác định'}</p>
          <p><strong>Calories:</strong> {nutrition.results?.total_calories || 0} kcal</p>
          {nutrition.results?.food_items?.length > 0 ? (
            nutrition.results.food_items.map((item, index) => (
              <div key={index} className="mt-2">
                <p><strong>{item.name}</strong></p>
                <p>Chất đạm: ({item.protein || 0})/100g</p>
                <p>Chất béo: ({item.fat || 0})/100g</p>
                <p>Tinh bột: ({item.carb || 0})/100g</p>
              </div>
            ))
          ) : (
            <p>Không có thông tin chi tiết về thực phẩm.</p>
          )}
        </div>
      )}
    </div>

    {/* CỘT NHẬT KÝ BỮA ĂN */}
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full lg:w-1/3">
      <h2 className="text-xl font-bold text-green-700 mb-4 text-center">Nhật ký bữa ăn gần đây</h2>
      {mealLogs && mealLogs.results.length > 0 ? (
<ul className="space-y-4 max-h-[500px] overflow-y-auto">
  {mealLogs.results.map((meal, idx) => (
    <li
      key={idx}
      className="border p-3 rounded-md bg-green-50 hover:bg-green-100 transition flex gap-4"
    >
      {/* Ảnh bữa ăn */}
      <img
        src={meal.image}
        alt="Meal"
        className="w-24 h-24 rounded object-cover border"
      />

      {/* Thông tin chi tiết */}
      <div>
        <p className="text-sm text-gray-500">
          📅 {new Date(meal.analyzed_at).toLocaleString()}
        </p>
        <p className="text-md font-semibold text-green-800">
          Tổng calo: {meal.total_calories} kcal
        </p>
        {meal.food_items?.map((food, i) => (
          <div key={i} className="ml-2 text-sm text-gray-700">
            - {food.name} ({food.calories_per_100g} kcal/100g)
          </div>
        ))}
      </div>
    </li>
  ))}
</ul>

      ) : (
        <p className="text-gray-500 text-center">Chưa có bữa ăn nào được lưu.</p>
      )}
    </div>

  </div>
</div>

  )
}
