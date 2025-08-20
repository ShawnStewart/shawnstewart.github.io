import { Route, Routes } from 'react-router-dom';

import { routes } from './routes';

export function Pages() {
  return (
    <Routes>
      {routes.map(({ path, component: Component }) => {
        return <Route element={<Component />} key={path} path={path} />;
      })}
    </Routes>
  );
}
