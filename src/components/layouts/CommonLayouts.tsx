import GuestNavBar from '../shared/GuestNavBar';
import Footer from '../shared/sections/Footer';

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