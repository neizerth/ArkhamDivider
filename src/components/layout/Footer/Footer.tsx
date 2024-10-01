import S from './Footer.module.scss';

export type FooterProps = {

}

export const Footer = ({}: FooterProps) => {
  return (
    <footer className={S.container}>
      Made by <a>@neizerth</a>
    </footer>
  );
}