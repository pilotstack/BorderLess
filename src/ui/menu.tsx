import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from '@/ui/mode-toggle';
import logo from '../assets/borderLess.svg';
import { Link } from 'react-router';
export default function NavigationMenuDemo() {
  const isMobile = useIsMobile();

  return (
    <div className="flex my-2 mx-2 gap-3 justify-between items-center">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src={logo} width={150} alt="BorderLessLogo" />
        </Link>
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="flex-wrap gap-4">
            <NavigationMenuItem>
              <Link to="all_passport">全球</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="rank">排行</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
}
