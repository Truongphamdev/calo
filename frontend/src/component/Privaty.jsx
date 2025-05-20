import React from 'react'
import {Navigate} from'react-router-dom'

export const Privaty = ({children}) => {
    const token = localStorage.getItem("access");

  if (!token) {
    // Nếu chưa login => chuyển hướng
    return <Navigate to="/login" />;
  }

  // Nếu đã login => cho truy cập vào children (ví dụ: <Analyze/>)
  return children;
}
