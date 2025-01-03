import {
  Skia,
  Canvas,
  Atlas,
  useRectBuffer,
  useImage
} from "@shopify/react-native-skia"
import { useEffect } from 'react';
import { useSharedValue } from "react-native-reanimated"

export default function AnimatedStyleUpdateExample() {
  const counter = useSharedValue(0)

  useEffect(() => {
    const interval = setInterval(() => {
      counter.value = (counter.value + 1) % 8
    }, 100)

    return () => clearInterval(interval);
  }, []);

  const spriteMap = useImage(require('../../assets/images/sprite-sheet.png'))
 
  const numberOfSprites = 2

  const sprites = useRectBuffer(numberOfSprites, (rect, i) => {
    "worklet"
    let frameSelect
    if (!counter) { frameSelect = 0 }
    else { frameSelect = 36 * (Math.floor(counter.value + i * 3) % 8) }
    rect.setXYWH(frameSelect, 0, 36, 80)
  })

  const transforms = [
    Skia.RSXform(3, 0, 50, 100),
    Skia.RSXform(3, 0, 80, 200)
  ]

  return (
      <Canvas style={{ flex: 1 }}>
        <Atlas
          image={spriteMap}
          sprites={sprites}
          transforms={transforms}
        />
      </Canvas>
  );
}