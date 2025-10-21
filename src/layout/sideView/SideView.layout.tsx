import ShoppingCart from '@/components/shoppingCart/ShoppingCart.component';
import styles from './SideView.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePartnerStore } from '@/state/partner';

const SideView = () => {
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
      title: <></>,
      subMessage: <></>,
      image:
        'https://www.acstechnologies.com/church-growth/wp-content/uploads/sites/5/2024/05/Technology-Can-Assist-Pastors-1024x683.jpg',
    },
    {
      id: 2,
      title: <></>,
      subMessage: <></>,
      image:
        'https://cdn.churchleaders.com/wp-content/uploads/2014/09/benefits-of-technology-in-church-640x427.jpg',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        slides.length % currentSlide === 0 ? 0 : currentSlide + 1
      );
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
            // only show the image if slides.length is greater than 0
            background:
              slides.length > 0
                ? `linear-gradient(65deg,
            #23262a 0%,
            rgba(20, 58, 163, 0.49) 100%), url(${slides[currentSlide]?.image})`
                : '',
          }}
        ></motion.div>
      </AnimatePresence>
      <div
        className={`${styles.featuredContainer} ${
          branding ? styles.partner : ''
        }`}
      >
        {branding && branding.logo && (
          <div className={styles.branding}>
            <Image
              src={branding.logo}
              width={300}
              height={150}
              alt="Partner Logo"
            />
            <h1 className={`${styles.message}`}>
              <span>{branding.name}</span>
            </h1>
            <p className={`${styles.subMessage}`}>
              You are signing up with {branding.name} for ShepherdsCMS!
            </p>
          </div>
        )}
        <div className={styles.pyrecontainer}>
          <h1 className={`${styles.message}`}>{slides[currentSlide]?.title}</h1>
          <p className={`${styles.subMessage}`}>
            {slides[currentSlide]?.subMessage}
          </p>
          <div className={styles.logoContainer}>
            <Image
              src={'/images/ShepherdsCMSLogo.png'}
              width={200}
              height={200}
              style={{
                objectFit: 'contain',
                aspectRatio: '1/1',
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
