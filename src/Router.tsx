import { FC, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import MyDay from './pages/MyDay';
import Important from './pages/Important';
import Planned from './pages/Planned';
import { Sidebar } from './components/Sidebar';
import Inbox from './pages/Inbox';
import Assigned from './pages/Assigned';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound';
import { AuthContext, AuthContextType } from './AuthContext';
import Loader from './components/Loader/Loader';
import { useHistory } from 'react-router';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0px;
`;

const Content= styled.div`
    display: flex;
    flex: 1 1 0px;
`;
  
const BrowserRouter: FC = () => {
    const { authData, isCheckSessionLoading, sessionChecked } = useContext<AuthContextType>(AuthContext);
    const history = useHistory(); 

    useEffect(() => {
        if (authData?._id && sessionChecked) return;
        history.push('/login');
    }, [authData]);

    return (
        <Wrapper>
            {(isCheckSessionLoading && sessionChecked) ? (
                <Loader />
            ) : (
            <Router>
                {(authData?._id && sessionChecked )&&
                    <Header userName={authData?.username || ''} />
                }
                <Content>
                    {(authData?._id && sessionChecked) &&
                        <Sidebar />
                    }
                    <Switch>
                        {(authData?._id && sessionChecked) ? (
                            <>
                                <PrivateRoute exact path="/">
                                    <MyDay />
                                </PrivateRoute>
                                <PrivateRoute exact path="/important">
                                    <Important />
                                </PrivateRoute>
                                <PrivateRoute exact path="/planned">
                                    <Planned />
                                </PrivateRoute>
                                <PrivateRoute exact path="/assigned_to_me">
                                    <Assigned />
                                </PrivateRoute>
                                <PrivateRoute exact path="/inbox">
                                    <Inbox />
                                </PrivateRoute>
                                <PrivateRoute exact path="/tasks/:listId">
                                    <Tasks />
                                </PrivateRoute>
                                <PrivateRoute exact path="/tasks/:listId/:taskId">
                                    <Tasks />
                                </PrivateRoute>

                            {/* <Route render={(routeProps) => {
                                return (
                                    <NotFound />
                                );
                            }} /> */}
                            </>
                        ) : (
                            <>
                                <Route path="/register">
                                    <Register />
                                </Route>
                                <Route path="/login">
                                    <Login />
                                </Route>
                            </>
                        )}
                    </Switch>
                </Content>
            </Router>
            )}
        </Wrapper>
    );
};

export default BrowserRouter;