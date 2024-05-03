import { DesktopHeader } from './versions/desktop-header';
import { MobileHeader } from './versions/mobile-header';


const Header = (): JSX.Element => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};

export default Header;