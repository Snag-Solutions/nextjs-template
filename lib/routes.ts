interface Route {
  name: string
  path: string
}
export const routes: Route[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Leaderboard',
    path: '/leaderboard',
  },
  {
    name: 'Rules',
    path: '/rules',
  },
  {
    name: 'Add Rule',
    path: '/addRule',
  },
  {
    name: 'Minting',
    path: '/minting',
  },
  {
    name: 'Profile',
    path: '/profile',
  },
]
