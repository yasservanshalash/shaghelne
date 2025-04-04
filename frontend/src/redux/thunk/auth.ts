import { userActions } from '../slices/userSlice';
import { AppDispatch } from '../store';

const API_URL = 'http://localhost:5000/api/auth';

// Login user
export function loginUser(credentials: { email: string; password: string }) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userActions.startLoading());
      
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "فشل تسجيل الدخول");
      }
      
      dispatch(userActions.setUser({ token: data.token, user: data.user }));
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول";
      dispatch(userActions.setError(errorMessage));
      throw error;
    }
  };
}

// Register user
export function registerUser(userData: { name: string; email: string; password: string; role: string }) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userActions.startLoading());
      
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "فشل إنشاء الحساب");
      }
      
      dispatch(userActions.setUser({ token: data.token, user: data.user }));
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحساب";
      dispatch(userActions.setError(errorMessage));
      throw error;
    }
  };
} 