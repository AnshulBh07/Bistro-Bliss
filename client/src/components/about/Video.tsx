import React from "react";
import styles from "../../sass/videoStyles.module.scss";
import { featureList } from "../../services/data/featuresList";
import { FeatureCard } from "./FeatureCard";
import Logo from "../../assets/images/logo.png";
// https://drive.google.com/drive/folders/1-khOckdvbOdWJla78n5zCiNxs9Pzn6jS/video2.mp4?usp=sharing
// import { FaPlay } from "react-icons/fa";

export const Video: React.FC = () => {
  // const [showPoster, setShowPoster] = useState<boolean>(true);

  return (
    <section className={styles.container}>
      <div className={styles.video_player}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/jK5MSloH7ng?si=wUxotrXi3DovyMq5&autoplay=1&vq=hd1080p&playlist=jK5MSloH7ng&loop=1&muted=1&showinfo=0"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.player}
        ></iframe>

        {/* poster over the video whenever it is paused */}
        <div
          className={styles.poster}
          // style={{
          //   display: showPoster ? "" : "none",
          // }}
        >
          <div className={styles.bg}></div>
          {/* <button
            className={styles.play_btn}
            onClick={() => {
              setShowPoster(false);
              vidRef.current!.controls = true;
              vidRef.current!.play();
            }}
          >
            <FaPlay className={styles.icon} />
          </button> */}
          <div className={styles.logo_wrapper}>
            <img src={Logo} alt="logo" />
          </div>
          <p className={styles.phrase}>
            Feel the authentic & original taste from us
          </p>
        </div>
      </div>

      {/* feature content section */}
      <div className={styles.content}>
        {featureList.map((item, index) => {
          return <FeatureCard key={index} data={item} />;
        })}
      </div>
    </section>
  );
};
