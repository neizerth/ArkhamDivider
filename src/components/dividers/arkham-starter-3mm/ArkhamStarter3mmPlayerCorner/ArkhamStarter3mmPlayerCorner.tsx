import S from './ArkhamStarter3mmPlayerCorner.module.scss';

import playerBorder from './images/playerBorder.png';
import playerInner from './images/player.png';

export type ArkhamStarter3mmPlayerCornerProps = {
  color: string
}

export const ArkhamStarter3mmPlayerCorner = ({
  color
}: ArkhamStarter3mmPlayerCornerProps) => {
  return (
    <div className={S.container}>
      <img src={playerBorder} className={S.playerBorder} />

      <div className={S.mask}>
        <img src={playerInner} className={S.playerInner} />
        <div className={S.color} style={{ backgroundColor: color }}/>
      </div>
    </div>
  );
}