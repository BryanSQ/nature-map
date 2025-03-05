import { Swiper, SwiperSlide } from 'swiper/react';

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
                                    alt="PLACE NAME"
                                    src='https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg'
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
            </section>

            <section className='place-card__button-container'>
                <button type="button" className='place-card__button'>
                    Take me there
                </button>
                <button type="button" className='place-card__button'>
                    Other button
                </button>
            </section>

        </div>
    )
};