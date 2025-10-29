import GuestNavBar from '../shared/GuestNavBar';

interface IProps {
    children: React.ReactNode;
}

const CommonLayouts = ({ children }: IProps) => {
    return (
        <>
            <GuestNavBar />
            {children}
        </>
    );
};

export default CommonLayouts;