
import Footer from '../utilities/Footer';
import GuestNavBar from '../utilities/GuestNavBar';

interface IProps {
    children: React.ReactNode;
}

const CommonLayouts = ({ children }: IProps) => {
    return (
        <>
            <GuestNavBar />
            {children}
            <Footer />
        </>
    );
};

export default CommonLayouts;