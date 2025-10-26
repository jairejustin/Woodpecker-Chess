import './Pages.css'

export default function LoginPage() {
    return(
    <div className="main-layout">
      <div className="main-content">
        <div className='card'>
            <p> No account?
                <a> Register</a>
            </p>
            <button className='btn'>               
                <span>Login</span>
            </button>
        </div>
      </div>
    </div>

    );
}