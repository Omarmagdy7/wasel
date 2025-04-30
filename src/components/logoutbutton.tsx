// src/components/LogoutButton.tsx
import { useAuth } from '../contexts/AuthContext';

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button 
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
    >
      تسجيل الخروج
    </button>
  );
}

export default LogoutButton;
