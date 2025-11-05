import pageBgImage from '@/assets/images/page-banner-bg.jpg';

interface Props {
    title: string,
    bgImage?: string
}

const PageBanner = ({ title, bgImage }: Props) => {
    return (
        <section className="bg-cover bg-no-repeat bg-center relative py-10 md:py-16" style={{ backgroundImage: `url(${pageBgImage || bgImage})` }}>
            <div className="absolute top-0 right-0 left-0 bottom-0 inset-0 bg-black/50"></div>
            <div className='tp-container text-center relative'>
                <h1 className='text-3xl md:text-5xl lg:text-6xl text-white font-semibold'>{title || 'Please enter a title'}</h1>
            </div>
        </section>
    );
};

export default PageBanner;