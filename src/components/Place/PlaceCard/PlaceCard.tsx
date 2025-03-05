import { Swiper, SwiperSlide } from 'swiper/react';
import { FaCarAlt } from "react-icons/fa";

import type { LocalMarker } from "../../../types";


import "swiper/css"

import "./PlaceCard.css"

interface IPlaceCardProps {
    marker: LocalMarker;
}

export const PlaceCard = ({ marker }: IPlaceCardProps) => {
    return (
        <div className="place-card">

            <div className='place-card__carrousel'>
                <Swiper
                    onSlideChange={() => console.log('slide change')}
                >
                    {
                        marker.place?.images.map((image) => (
                            <SwiperSlide key={image.url}>
                                <img
                                    className='place-card__image'
                                    alt={`Community provided photography of ${marker.name}`}
                                    src={image.url}
                                />
                            </SwiperSlide>))
                    }
                </Swiper>
            </div>

            <section className='place-card__information'>
                <p className='place-card__information-description'>
                    {
                        marker.place?.description
                    }
                </p>
                <p className='place-card__information-location'>
                    {marker.place?.location[0]}, {marker.place?.location[1]}
                </p>
            </section>

            <section className='place-card__button-container'>
                <button type="button" className='place-card__button'>
                    See directions <FaCarAlt />
                </button>
            </section>

        </div>
    )
};