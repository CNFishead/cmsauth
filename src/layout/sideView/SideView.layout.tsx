import ShoppingCart from "@/components/shoppingCart/ShoppingCart.component";
import styles from "./SideView.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePartnerStore } from "@/state/partner";

type Props = {};

const SideView = (props: Props) => {
  //Make an array of the slides
  //Make a function that will change the slide

  // pull out from the partnerStore the partner
  const { branding } = usePartnerStore((state) => state);

  type Slide = {
    id: number;
    title: JSX.Element;
    subMessage: JSX.Element;
    image: string;
  };

  const slides: Slide[] = [
    {
      id: 1,
      title: <> </>,
      subMessage: <></>,
      image: "https://tse4.mm.bing.net/th?id=OIG2.pYHvOafBsN3WXXTlkyNz&pid=ImgGn",
    },
    {
      id: 2,
      title: <></>,
      subMessage: <></>,
      image: "https://tse1.mm.bing.net/th?id=OIG3.X0E8xwvwLO2pai2Vgwln&pid=ImgGn",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(slides.length % currentSlide === 0 ? 0 : currentSlide + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={currentSlide}
          className={styles.imageCarousel}
          style={{
            background: `linear-gradient(65deg,
          #23262a 0%,
          rgba(20, 80, 163, .5) 100%), url(${slides[currentSlide].image})`,
          }}
        ></motion.div>
      </AnimatePresence>
      <div className={`${styles.featuredContainer} ${branding ? styles.partner : ""}`}>
        {branding && branding.logo && (
          <div className={styles.branding}>
            <Image src={branding.logo} width={300} height={150} alt="Partner Logo" />
            <h1 className={`${styles.message}`}>
              <span>{branding.name}</span>
            </h1>
            <p className={`${styles.subMessage}`}>You are signing up with {branding.name} for ShepherdsCMS!</p>
          </div>
        )}
        <div className={styles.pyrecontainer}>
          <h1 className={`${styles.message}`}>{slides[currentSlide].title}</h1>
          <p className={`${styles.subMessage}`}>{slides[currentSlide].subMessage}</p>
          <div className={styles.logoContainer}>
            <Image
              src={"https://res.cloudinary.com/wulfdev/image/upload/v1730653004/ShepherdsCMSLogo_sbkr3b.png"}
              width={200}
              height={200}
              style={{
                objectFit: "contain",
                aspectRatio: "1/1",
              }}
              alt="Logo"
            />
            <div className={styles.message}>
              <span>Shepherds CMS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideView;
