import WhiteSvgIcon from "@/components/shared/blocks/WhiteSvgIcon";
import type { IDivision } from "@/types/division.type";
import { Link } from "react-router";

interface Props {
  item: IDivision;
}

const DestinationCard = ({item}: Props) => {
    return (
        <div className="bg-no-repeat bg-cover bg-center p-5 rounded-2xl gap-2 justify-between !flex !flex-col relative overflow-hidden !h-[420px]" style={{ backgroundImage: `url(${item?.thumbnail})` }}>
            <div className="absolute inset-0 bg-black/30 z-0"></div>
            <div className="z-10">
                <p className="text-white font-medium">
                    {item?.totalTourListing} Listings
                </p>
                <p className="text-2xl text-white font-semibold">
                    {item?.name}
                </p>
            </div>
            <div className="z-10">
                <Link
                    to={`/tours?division=${item?.name}`}
                    className="group tp-transparent-white-btn !text-sm !px-6 !py-3 inline-flex items-center gap-3"
                >
                    Explore
                    <WhiteSvgIcon className="group-hover:stroke-primary-400 w-4 md:w-auto h-4 md:h-auto" />
                </Link>
            </div>
        </div>
    );
};

export default DestinationCard;