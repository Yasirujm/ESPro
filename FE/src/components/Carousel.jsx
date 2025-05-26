import React, { useState } from "react";
import "../Home.css";
import valorantImage from "../images/valorant-tour.jpg";
import nightMarket from "../images/upseso.jpg";
import dota2 from "../images/paris.jpg";

const slides = [
  {
    img: valorantImage,
    caption: "2025 VALORANT CHAMPIONS TOUR",
    link: "https://valorantesports.com/en-US/",
  },
  {
    img: nightMarket,
    caption: "Upcoming Season 2025",
    link: "https://www.vlr.gg/vct-2025",
  },
  {
    img: dota2,
    caption: "2025 VALORANT CHAMPIONS IN PARIS",
    link: "https://valorantesports.com/en-AU/tournament/113482263742879102/overview",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-button" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="carousel-slide">
        <a
          href={slides[current].link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={slides[current].img} alt={slides[current].caption} />
        </a>
        <div className="carousel-caption">{slides[current].caption}</div>
      </div>
      <button className="carousel-button" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}

export default Carousel;
