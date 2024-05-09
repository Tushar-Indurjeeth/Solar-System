import { OrbitControls } from "@react-three/drei";
import { AnimatedStars } from "./AnimatedStars";

import { Sun } from "./scenes/sun/Sun";
import { Mercury } from "./scenes/mercury/Mercury";
import { Earth } from "./scenes/earth/Earth";
import { Venus } from "./scenes/venus/Venus";
import { Mars } from "./scenes/mars/Mars";
import { Jupiter } from "./scenes/jupiter/Jupiter";
import { Saturn } from "./scenes/saturn/Saturn";
import { Uranus } from "./scenes/uranus/Uranus";
import { Neptune } from "./scenes/neptune/Neptune";

export const MainContainer = ({ speed }) => {
  return (
    <>
      <OrbitControls />

      <AnimatedStars />
      <ambientLight intensity={0.1} />

      <Sun />
      <Mercury
        rotationSpeed={0.3}
        distance={15}
        angleMultiplier={0.7 * speed}
      />
      <Venus rotationSpeed={0.1} distance={20} angleMultiplier={0.6 * speed} />
      <Earth rotationSpeed={0.05} distance={25} angleMultiplier={0.5 * speed} />
      <Mars rotationSpeed={0.05} distance={40} angleMultiplier={0.4 * speed} />
      <Jupiter
        rotationSpeed={0.05}
        distance={60}
        angleMultiplier={0.1 * speed}
      />
      <Saturn
        rotationSpeed={0.05}
        distance={80}
        angleMultiplier={0.05 * speed}
      />
      <Uranus
        rotationSpeed={0.05}
        distance={100}
        angleMultiplier={0.04 * speed}
      />
      <Neptune
        rotationSpeed={0.05}
        distance={120}
        angleMultiplier={0.03 * speed}
      />
    </>
  );
};
