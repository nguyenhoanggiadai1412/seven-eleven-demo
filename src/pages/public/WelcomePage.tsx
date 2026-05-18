import MagicRings from "../../components/common/MagicRing/MagicRings";
import ModelViewr from "../../components/common/ModelViewer";
import seveneleven from "../../assets/seven11new.glb";
import BlueButton from "../../components/common/Button/BlueButton";
import styles from "./WelcomePage.module.css";
import { useNavigate } from "react-router-dom";
function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <MagicRings
        color="#10B981"
        colorTwo="#F97316"
        ringCount={6}
        speed={1}
        attenuation={10}
        lineThickness={2}
        baseRadius={0.35}
        radiusStep={0.1}
        scaleRate={0.1}
        opacity={1}
        blur={0}
        noiseAmount={0.1}
        rotation={0}
        ringGap={1.5}
        fadeIn={0.7}
        fadeOut={0.5}
        followMouse={false}
        mouseInfluence={0.2}
        hoverScale={1.2}
        parallax={0.05}
        clickBurst={false}
      />

      <div className={styles.content}>
        <BlueButton text="User Portal" onClick={() => navigate("/user")}/>

        <div className={styles.modelBox}>
          <ModelViewr modelUrl={seveneleven} />
        </div>

        <BlueButton text="Admin Portal" onClick={() => navigate("/admin")}/>
      </div>
    </div>
  );
}

export default WelcomePage;