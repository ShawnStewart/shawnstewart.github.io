import { Route, Routes } from 'react-router-dom';

import { routes } from '..';

export function Pages() {
  return (
    <Routes>
      {Object.values(routes).map(({ path, component: Component }) => {
        return <Route element={<Component />} key={path} path={path} />;
      })}
    </Routes>
  );
}
