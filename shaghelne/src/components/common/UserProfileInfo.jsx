import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const UserProfileInfo = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  // Handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="user-profile-info p-3">
      <div className="d-flex align-items-center mb-3">
        <div className="user-avatar me-3">
          {user.profileImage ? (
            <img 
              src={user.profileImage} 
              alt={user.name} 
              className="rounded-circle"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          ) : (
            <div 
              className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white"
              style={{ width: '50px', height: '50px' }}
            >
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>
        <div>
          <h6 className="mb-0">{user.name}</h6>
          <p className="mb-0 text-muted small">{user.email}</p>
          <span className="badge bg-primary">{user.role}</span>
        </div>
      </div>
      
      <div className="d-grid gap-2">
        <Link to="/my-profile" className="btn btn-sm btn-outline-primary">
          <i className="flaticon-photo me-2"></i>
          View Profile
        </Link>
        <button 
          className="btn btn-sm btn-danger" 
          onClick={handleLogout}
        >
          <i className="flaticon-logout me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfileInfo; 