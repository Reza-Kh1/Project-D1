import { useState } from 'react'
import LoadingImg from '../LoadingImg/LoadingImg';
import imageError from "../../../public/errorImage.webp"

type ImageType = {
    src: string;
    alt: string | null;
    className?: string;
    width?: number;
    height?: number;
    classPlus?: string;
    figureClass?: string;
    onClick?: (value: any) => void
};

export default function ImageCustom({
    width,
    height,
    src,
    alt,
    className,
    classPlus,
    figureClass,
    onClick
}: ImageType) {
    const [load, setLoad] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  // تغییر نوع به string | null
    const classImage = className ? className : classPlus ? `${classPlus} rounded-md shadow-md table mx-auto` : "rounded-md shadow-md w-full h-auto table mx-auto object-fill"

    return (
        <figure className={figureClass || "w-full relative"}>
            <img
                width={width}
                height={height}
                loading="lazy"
                onClick={onClick}
                onLoad={() => setLoad(false)}
                src={error || src || imageError}
                alt={alt || "error"}
                className={classImage}
                onError={() => setError(imageError)}
            />
            {load && <LoadingImg />}
        </figure>
    )
}
