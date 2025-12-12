import { createBrowserRouter } from 'react-router';
import App from './App';

import Body from './ui/body';
import AllPassport from './ui/all_passport';
import GlobalPassportRanking from './ui/global_passport_ranking';
const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Body }, // / 主页
      { path: 'all_passport', Component: AllPassport },
      { path: 'rank', Component: GlobalPassportRanking },
    ],
  },
]);

export default router;
