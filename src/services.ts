// declare const CONFIG: Config;

export interface Config {
    api: string;
}
// TODO: create evniroments configs
// port the as as in app.use.cors
export const register = 'http://localhost:3000/api/register';
export const login = 'http://localhost:3000/api/login';
export const me = 'http://localhost:3000/api/me';
export const logout = 'http://localhost:3000/api/logout';

// main list
export const getMainList = 'http://localhost:3000/api/getMainList';

// list
export const getLists = 'http://localhost:3000/api/getLists';
export const getListById = 'http://localhost:3000/api/getList';
export const createList = 'http://localhost:3000/api/createList';
export const editList = 'http://localhost:3000/api/editList';
export const removeList = 'http://localhost:3000/api/removeList';

// task
export const createTask = 'http://localhost:3000/api/createTask';
export const getTasks = 'http://localhost:3000/api/getTasks';
export const getTask = 'http://localhost:3000/api/getTask';
export const changeTaskStatus = 'http://localhost:3000/api/changeTaskStatus';
export const removeTask = 'http://localhost:3000/api/removeTask';
export const changeTaskImportance = 'http://localhost:3000/api/changeTaskImportance'; 
export const addTaskToImportantList = 'http://localhost:3000/api/addTaskToImportantList';