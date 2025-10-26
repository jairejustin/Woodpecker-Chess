import './Pages.css'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    return(
    <div className="main-layout">
      <div className="main-content">
        <div className='card'>
            <p> Already registered in? 
                <a> Sign in</a></p>
            <button className='btn'>
                <span>Register</span>
            </button>
        </div>
      </div>
    </div>

    );
}