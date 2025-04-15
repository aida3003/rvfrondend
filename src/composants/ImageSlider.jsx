import  { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sante from "../assets/sante.png"; // ✅ Chemin relatif correct

const images = [
  sante,sante,sante
 
];

// ... reste 
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="position-relative w-100 h-100 overflow-hidden rounded"
      style={{ borderRadius: "1rem", height: "100%" }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="position-absolute w-100 h-100"
          style={{ objectFit: "cover", borderRadius: "1rem" }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div
        className="position-absolute d-flex justify-content-center gap-2"
        style={{ bottom: "1rem", left: 0, right: 0 }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="btn p-1"
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: currentIndex === index ? "#fff" : "rgba(255, 255, 255, 0.5)",
              border: "none"
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;



