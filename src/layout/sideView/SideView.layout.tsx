import ShoppingCart from '@/components/shoppingCart/ShoppingCart.component';
import styles from './SideView.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePartnerStore } from '@/state/partner';

type Props = {};

const SideView = (props: Props) => {
  //Make an array of the slides
  //Make a function that will change the slide

  // pull out from the partnerStore the partner
  const { branding } = usePartnerStore((state) => state);
  console.log(branding);

  type Slide = {
    id: number;
    title: JSX.Element;
    subMessage: JSX.Element;
    image: string;
  };

  const slides: Slide[] = [
    {
      id: 1,
      title: (
        <>
          Be your own <span>Boss!</span>
        </>
      ),
      subMessage: (
        <>
          Take control of your content and your revenue. <br />
        </>
      ),
      image:
        'https://www.iwillteachyoutoberich.com/wp-content/uploads/asg_DCVJ1ucjCehvlKcK2Frevision-2F1626755784978-shutterstock_136-scaled.jpg',
    },
    {
      id: 2,
      title: (
        <>
          Unlimited <span>Potential</span>
        </>
      ),
      subMessage: (
        <>
          Reach beyond your walls and grow your audience. <br />
        </>
      ),
      image:
        'https://www.templars-law.com/app/uploads/2023/01/Expertise-Block-Mergers-Acquisitions-1.jpg',
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
            background: `linear-gradient(65deg,
          #23262a 0%,
          rgba(20, 80, 163, .5) 100%), url(${slides[currentSlide].image})`,
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
              You are signing up for processing with {branding.name} via
              PyreProcessing!
            </p>
          </div>
        )}
        <div className={styles.pyrecontainer}>
          <h1 className={`${styles.message}`}>{slides[currentSlide].title}</h1>
          <p className={`${styles.subMessage}`}>
            {slides[currentSlide].subMessage}
          </p>
          <div className={styles.logoContainer}>
            <Image
              src={
                'https://res.cloudinary.com/dth50fuyb/image/upload/v1715617089/logo_g4ootz.png'
              }
              width={200}
              height={200}
              style={{
                objectFit: 'contain',
                aspectRatio: '1/1',
              }}
              alt="Pyre Processing Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideView;
