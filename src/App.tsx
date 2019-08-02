import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./routing/routes";
import { Transition, TransitionGroup } from "react-transition-group";
import { play, exit } from "./animations/routerAnimations";
import "./App.css";

const routeComponents = routes.map(({ path, component }, key) => (
  <Route exact path={path} component={component} key={key} />
));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route
        render={({ location }) => {
          const { pathname, key } = location;

          return (
            <TransitionGroup component={null}>
              <Transition
                key={key}
                appear={true}
                onEnter={(node, appears) => play(pathname, node, appears)}
                onExit={(node: HTMLElement) => exit(node)}
                timeout={{ enter: 750, exit: 150 }}
              >
                <Switch location={location}>{routeComponents}</Switch>
              </Transition>
            </TransitionGroup>
          );
        }}
      />
    </BrowserRouter>
  );
};

export default App;
