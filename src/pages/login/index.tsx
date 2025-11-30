import TourBg from '@/assets/images/tour_login_bg.jpg'
import LoginImage from '@/assets/images/login-page-img.svg'
import { LoginForm } from './LoginForm';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router';

const LoginPage = () => {
    return (
        <div className='rounded-[20px] grid grid-cols-1 lg:grid-cols-2 min-h-svh'>
            <img className='w-full min-h-full h-full object-cover order-2 lg:order-1' src={LoginImage} alt="login image" />

            <div className='order-1 lg:order-2 bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center' style={{ backgroundImage: `url(${TourBg})` }}>
                <Link to={'/'} className='absolute top-0 right-0 cursor-pointer z-50 w-12 h-12 flex items-center justify-center bg-white rounded-l-full rounded-b-full shadow-sm'><RxCross2 size={22} /></Link>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;