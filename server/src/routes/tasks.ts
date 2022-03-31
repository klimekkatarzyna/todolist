import express, { Request, Response } from 'express';
import Task from '../models/task';
import { taskSocket } from '../utils/socketsEvents';
import { Importance, listIdForTasksSchema, taskIdSchema } from '@kkrawczyk/todo-common';
import { validateParams } from '../utils/validation';

const tasks = express.Router();

tasks.post('/createTask', async (req: Request, res: Response) => {
	await Task.find({ id: req.body._id });
	const task = new Task({
		title: req.body.title,
		parentFolderId: req.body.parentFolderId,
		importance: req.body.importance,
		themeColor: req.body.themeColor,
		createdAt: Date.now(),
		taskStatus: req.body.taskStatus,
		sortType: req.body.sortType,
	});

	taskSocket('add-task', req.body.parentFolderId, task);

	try {
		await task.save();
		res.status(200).json({
			body: {
				id: task._id,
				title: task.title,
				parentFolderId: task.parentFolderId,
				importance: task.importance,
				themeColor: task.themeColor,
				createdAt: task.createdAt,
				taskStatus: task.taskStatus,
				sortType: task.sortType,
			},
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

tasks.get('/getTasks/:listId', validateParams(listIdForTasksSchema), async (req: Request, res: Response) => {
	const tasks = await Task.find({ parentFolderId: req.params.listId });
	try {
		res.status(200).json({
			body: {
				tasks,
			},
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

tasks.patch('/editTask', async (req: Request, res: Response) => {
	await Task.updateOne({ _id: req.body.taskId }, { $set: { title: req.body.taskName } });
	const updatedTaskData = {
		_id: req.body.taskId,
		title: req.body.taskName,
		parentFolderId: req.body.parentId,
	};

	taskSocket('edit-task', req.body.parentId, updatedTaskData);

	try {
		res.status(200).json({
			message: `title changed successfully to ${req.body.taskName}`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

tasks.patch('/changeTaskStatus/:taskId', async (req: Request, res: Response) => {
	await Task.updateOne({ _id: req.params.taskId }, { $set: { taskStatus: req.body.taskStatus } });
	try {
		res.status(200).json({
			message: `status changed successfully to ${req.body.taskStatus}`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

tasks.delete('/removeTask', async (req: Request, res: Response) => {
	const task = await Task.findById({ _id: req.body?.taskId || '' });

	const data = await Task.deleteOne({ _id: req.body?.taskId || '' });
	taskSocket('remove-task', req.body.parentFolderId, task);

	try {
		res.status(200).json({
			body: {
				tasks: data,
			},
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

tasks.get('/getTask/:id', validateParams(taskIdSchema), async (req: Request, res: Response) => {
	try {
		const task = await Task.find({ _id: req.params.id });
		res.status(200).json({
			body: task,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

tasks.patch('/changeTaskImportance/:listId/:taskId', async (req: Request, res: Response) => {
	await Task.updateOne({ _id: req.params.taskId, parentFolderId: req.params.listId }, { $set: { importance: req.body.importance } });
	try {
		res.status(200).json({
			message: `importance has been successfully changed to ${req.body.importance}`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

tasks.patch('/addTaskToMyDay/:taskId', async (req: Request, res: Response) => {
	await Task.updateOne({ _id: req.params.taskId }, { $set: { isMyDay: req.body.isMyDay } });
	try {
		res.status(200).json({
			message: `task has been added to my day`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

tasks.get('/getImportanceTasks', async (req: Request, res: Response) => {
	const tasks = await Task.find({ importance: Importance.high });
	try {
		res.status(200).json({
			body: {
				tasks,
			},
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
});

export default tasks;