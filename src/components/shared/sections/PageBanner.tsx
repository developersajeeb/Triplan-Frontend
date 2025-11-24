import pageBgImage from '@/assets/images/page-banner-bg.jpg';
import { useSearchParams } from 'react-router';

interface Props {
    title: string,
    bgImage?: string
}

const PageBanner = ({ title, bgImage }: Props) => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    const tourType = searchParams.get("tourType");
    const division = searchParams.get("division");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let searchText = "";

    if (search) searchText += `${search} `;
    if (tourType) searchText += `${tourType.replace(/,/g, ", ")} `;
    if (division) searchText += `${division.replace(/,/g, ", ")} `;
    if (minPrice || maxPrice) searchText += `${minPrice || 0} - ${maxPrice || ""} TK`;

    searchText = searchText.trim();

    return (
        <section className="bg-cover bg-no-repeat bg-center relative py-10 md:py-16" style={{ backgroundImage: `url(${pageBgImage || bgImage})` }}>
            <div className="absolute top-0 right-0 left-0 bottom-0 inset-0 bg-black/50"></div>
            <div className='tp-container text-center relative'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tight'>{title || 'Please enter a title'}</h1>
                {searchText && (
                    <p className="text-white text-lg mt-3 opacity-90">
                        Search For: <span className="font-semibold">"{searchText}"</span>
                    </p>
                )}
            </div>
        </section>
    );
};

export default PageBanner;