import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
	const { isLoading, error, sendRequest } = useHttp();

	const enterTaskHandler = async (taskText) => {
		const transformTask = (taskText, taskObj) => {
			const generatedId = taskObj.name; // firebase-specific => "name" contains generated id
			const createdTask = { id: generatedId, text: taskText };

			props.onAddTask(createdTask);
		};
		sendRequest(
			{
				url: 'https://react-http-9aa96-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: { text: taskText },
			},
			transformTask.bind(null, taskText)
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
