import NotFoundImage from "@/assets/images/404-element.svg";
import { RiHome6Line } from "react-icons/ri";
import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <section className="tp-container pt-16 pb-20 md:pb-24">
            <div className="max-w-[600px] mx-auto text-center">
                <img className="w-full max-w-[550px] mx-auto" src={NotFoundImage} alt="Not found image" />
                <h1 className="text-primary-500 font-extrabold text-3xl md:text-4xl mt-8">UH OH!</h1>
                <p className="text-gray-600 font-medium mt-4 mb-6">Looks like this page bit the dust. You’re still breathing — go back home!</p>
                <Link to="/" className="tp-primary-btn inline-flex items-center gap-3">Back Home <span><RiHome6Line size={20} /></span></Link>
            </div>
        </section>
    );
};

export default NotFoundPage;