import React, { createContext, useCallback, useEffect, useState, useContext, useMemo } from 'react'

const RouterContext = createContext({
  location: "",
  push: () => { },
});

const Router = ({children}) => {
  
  const [location, setLocation] = useState(window.location.pathname)
  
  const handlePush = useCallback(
    (newLocation) => {
      window.history.pushState({}, "", newLocation)
      setLocation(newLocation)
    },
    []
  )

  const handleHashChange = useCallback(() => {
    setLocation(window.location.pathname)
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', handleHashChange)
    return () => window.removeEventListener('popstate', handleHashChange)
  }, [handleHashChange])

  const value = useMemo(() => {
    return {location, push: handlePush}
  }, [location, handlePush])

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  )

}


/* const Link = ({to, children}) => {    

  const {push} = useContext(RouterContext)

  const handleClick = (e) => {
    e.prevent.default()
    push(to)
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
 */
export default function Link({to, children}) {
  const {push} = useContext(RouterContext)

  const handleClick = (e) => {
    e.prevent.default()
    push(to)
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}

const Route = ({children}) => {
  return children
}


function compilePath(path) {
  const keys = [];

  path = path.replace(/:(\w+)/g, (_, key) => {
    keys.push(key);
    return "([^\\/]+)";
  });

  const source = `^(${path})`;

  const regex = new RegExp(source, "i");
  return { regex, keys };
}

function matchRoutes(children, location) {
  const matches = [];

  React.Children.forEach(children, (route) => {
    const { regex, keys } = compilePath(route.props.path);
    const match = location.match(regex);

    if (match) {
      const params = match.slice(2);
      matches.push({
        route: route.props.children,
        params: keys.reduce((collection, param, index) => {
          collection[param] = params[index];
          return collection;
        }, {}),
      });
    }
  });

  return matches[0];
}

const RouteContext = createContext({
  params: {},
});


function Routes({ children }) {
  const { location } = useContext(RouterContext);
  const match = useMemo(() => matchRoutes(children, location), [
    children,
    location,
  ]);

  const value = useMemo(() => {
    return { params: match.params }
  }, [match])

  // if no routes matched then render null
  if (!match) return null;

  return (
    <RouteContext.Provider value={value}>
      {match.route}
    </RouteContext.Provider>
  );
}

function useParams() {
  return useContext(RouteContext).params;
}

export {Router, Routes, Route, useParams}