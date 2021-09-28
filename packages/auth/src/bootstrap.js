import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount funtiont to start up the app
const mount = (el, { onNavigate, onSignIn, defaultHistory, initialPath }) => {
    const history =  defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if (onNavigate) {
        history.listen(onNavigate);
    }
    console.log("here render");
    ReactDOM.render(
        <App onSignIn={onSignIn} history={history}/>,
        el
    );

    return {
        onParentNavigate({ pathname: nextPathname}){
            const { pathname } = history.location;
            if (pathname !== nextPathname){
                history.push(nextPathname);
            }
        }
    };
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };