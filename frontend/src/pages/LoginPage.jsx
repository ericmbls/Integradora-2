import LoginForm from '../components/LoginForm';
import BrandingSide from '../components/BrandingSide';
import './LoginPage.css';

export default function LoginPage({ setIsLoggedIn }) {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-side">
          <LoginForm onLogin={() => setIsLoggedIn(true)} />
        </div>
        <BrandingSide />
      </div>
    </div>
  );
}
