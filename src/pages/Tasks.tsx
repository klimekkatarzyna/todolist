import { Board } from '../components/Board';
import useList from '../components/List/useList';
import Loader from '../components/Loader/Loader';
import CreateTask from '../components/Tasks/CreateTask';
import TasksList from '../components/Tasks/Tasks';
import Toolbar from '../components/Toolbar';


const Tasks = () => {
    const { getListByIdData, getListByIdLoading } = useList();

    return (
        <Board>
            <div>
                {getListByIdLoading ? (
                    <Loader />
                ) : (
                    <Toolbar name={getListByIdData?.title || ''} colorType={getListByIdData?.themeColor} />
                )}
                
                <div>
                    <CreateTask />
                    <TasksList />
                </div>
            </div>
        </Board>
    );
};

export default Tasks;