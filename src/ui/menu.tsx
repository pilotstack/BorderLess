import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from '@/ui/mode-toggle';
import logo from '../assets/borderLess.svg';
export default function NavigationMenuDemo() {
  const isMobile = useIsMobile();

  return (
    <div className="flex my-2 mx-2 gap-3 justify-between items-center">
      <div className="flex items-center gap-3">
        <img src={logo} width={150} alt="BorderLessLogo" />
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
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
