
import { motion } from "framer-motion";

const texts = [
  "Bienvenue",
  "Si sunu wergi yayam",
  "Welcome",
  "Sunu Wergi Yaram"
];

const TextMarquee = () => {
  return (
    <div
      className="w-100 h-100 d-flex flex-column justify-content-center align-items-center position-relative p-4"
      style={{
        overflow: "hidden",
        background: "linear-gradient(to right, #4ade80, #3b82f6)", // from-green-400 to-blue-500
        borderRadius: "1rem"
      }}
    >
      {texts.map((text, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20]
          }}
          transition={{
            duration: 4,
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
            repeatDelay: texts.length * 4,
            delay: index * 4
          }}
          className="position-absolute text-white text-center"
        >
          <h2 className="fw-bold" style={{ fontSize: "2.5rem" }}>
            {text}
          </h2>
          {text === "Sunu Wergi Yaram" && (
            <p className="mt-2" style={{ fontSize: "1.125rem" }}>
              Le bouton ci-dessous vous permettra de prendre Rendez-vous
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TextMarquee;
