
import { LoginForm } from "../../../components/Forms/LoginForm/LoginForm.jsx";
import { RegisterForm } from "../../../components/Forms/RegisterForm/RegisterForm.jsx";
import "./AuthPage.css";

const AuthPage = ({ mode, onLoginSuccess }) => {
    return (
        <main className="at-container">
            <div className="at-content">
                {mode === "login" ? 
                <LoginForm onLoginSuccess={onLoginSuccess} /> 
                : 
                <RegisterForm />}
            </div>
        </main>
    ) 
}
export default AuthPage;