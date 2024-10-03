import S from './Footer.module.scss';

const GAME_URL = "https://www.fantasyflightgames.com/en/products/arkham-horror-the-card-game/";
const FFG_URL = "https://www.fantasyflightgames.com/";

export type FooterProps = {

}

export const Footer = ({}: FooterProps) => {
  return (
    <footer className={S.container}>
      <a 
        href={GAME_URL} 
        target='_blank'
      >
        Arkham Horror: The Card Game™
      </a> and all related content ©
      {' '}
      <a 
        href={FFG_URL}
        target='_blank'
      >
        Fantasy Flight Games (FFG)
      </a>. 
      This site is not produced, endorsed by or affiliated with FFG.

    </footer>
  );
}