import { Route, Switch } from 'react-router-dom';
import universal from 'react-universal-component';

const MyDay = universal(() => import('./pages/MyDay')); // TODO: should be universal ?
const Planned = universal(() => import('./pages/Planned'));
const Important = universal(() => import('./pages/Important'));

export const routes = [{
    path: '/',
    component: MyDay,
    exact: true
}, {
    path: '/myday',
    component: MyDay,
    exact: true
}, {
    path: '/planned',
    component: Planned,
    exact: true
}, {
    path: '/important',
    component: Important,
    exact: true,
    //requireAuth: true,
}];

export const RoutesComponent = (route: any) => (
    <Route path={route.path} render={props => {
        console.log(route.requireAuth && !localStorage.getItem('token')?.length);
        if (route.requireAuth && !localStorage.getItem('token')?.length) {
            props.history.push(`/login`);
        }

        // if (!route.requireAuth || (route.requireAuth && localStorage.getItem('token'))) {
        //     return (<route.component {...props} routes={route.routes} route={route} lang={route.lang} />)
        // } else {
        //     props.history.push('/signup')
        // }

        return (
            <route.component routes={route.routes} route={route} lang={route.lang} />
        );

        //return <div />
    }}/>
  );

  export default () => {
      console.log('object');
    return (
        <Switch>
           {routes.map((route, i) => <RoutesComponent key={i} {...route} />)}
        </Switch>
    );
};
