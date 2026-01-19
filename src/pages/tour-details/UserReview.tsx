import NotUserIcon from "@/components/shared/blocks/NotUserIcon";
import { FaStar } from "react-icons/fa6";

interface Review {
  name: string;
  date: string;
  rating: number;
  comment: string;
  images: string[];
}

interface UserReviewProps {
  review: Review;
  reviewIndex?: number;
}

const UserReview = ({ review, reviewIndex }: UserReviewProps) => {
    return (
        <div key={reviewIndex}>
            <div className="flex gap-2 items-center">
                <NotUserIcon
                    minWidth="w-14"
                    width="w-14"
                    height="h-14"
                    iconSize={30}
                />
                <div>
                    <p className="font-semibold text-gray-800 text-lg">
                        {review.name}
                    </p>
                    <p className="text-sm text-gray-600">{review.date}</p>
                </div>
            </div>

            <ul className="flex gap-1 mt-4 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                    <li key={i}>
                        <FaStar size={20} className="text-primary-500" />
                    </li>
                ))}
            </ul>

            <p className="mt-3 mb-4 text-gray-600 font-medium">
                {review.comment}
            </p>

            <div className="flex flex-wrap gap-3">
                {review.images.map((img, imgIndex) => (
                    <a
                        key={imgIndex}
                        href={img}
                        data-fancybox={`review-${reviewIndex}`}
                        className="min-w-20 w-20 h-20"
                    >
                        <img
                            src={img}
                            alt="Review image"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default UserReview;