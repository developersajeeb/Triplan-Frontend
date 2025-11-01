import { LuUserRound } from "react-icons/lu";

interface Props {
    minWidth?: string
    width?: string
    height?: string
    iconSize?: number
}

const NotUserIcon = ({minWidth, width, height, iconSize}: Props) => {
    return (
        <span className={`text-gray-500 flex items-center justify-center rounded-full bg-gray-200 ${minWidth || 'min-w-16'} ${width || 'w-16'} ${height || 'h-16'}`}><LuUserRound size={iconSize || 35} /></span>
    );
};

export default NotUserIcon;