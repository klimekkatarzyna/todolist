import { Request, Response } from 'express';
import Task from '../models/task';
import { taskSocket } from '../utils/socketsEvents';
import { Importance } from '@kkrawczyk/todo-common';

export const createTask = async (req: Request, res: Response) => {
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
};

export const getTasks = async (req: Request, res: Response) => {
	const tasks = await Task.find({ parentFolderId: req.params.parentFolderId });
	try {
		res.status(200).json({
			body: tasks,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const editTask = async (req: Request, res: Response) => {
	await Task.updateOne({ _id: req.body._id }, { $set: { title: req.body.title } });
	const updatedTaskData = {
		_id: req.body._id,
		title: req.body.title,
		parentFolderId: req.body.parentFolderId,
	};

	taskSocket('edit-task', req.body.parentFolderId, updatedTaskData);

	try {
		res.status(200).json({
			message: `title changed successfully to ${req.body.title}`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const changeTaskStatus = async (req: Request, res: Response) => {
	await Task.updateOne({ _id: req.params._id }, { $set: { taskStatus: req.body.taskStatus } });
	try {
		res.status(200).json({
			message: `status changed successfully to ${req.body.taskStatus}`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const removeTask = async (req: Request, res: Response) => {
	const task = await Task.findById({ _id: req.body?._id || '' });

	const data = await Task.deleteOne({ _id: req.body?._id || '' });
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
};

export const getTask = async (req: Request, res: Response) => {
	try {
		const task = await Task.find({ _id: req.params._id });
		res.status(200).json({
			body: task[0],
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const changeTaskImportance = async (req: Request, res: Response) => {
	await Task.updateOne({ _id: req.params._id, parentFolderId: req.params.parentFolderId }, { $set: { importance: req.body.importance } });
	try {
		res.status(200).json({
			message: `importance has been successfully changed to ${req.body.importance}`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const addTaskToMyDay = async (req: Request, res: Response) => {
	await Task.updateOne({ _id: req.params._id }, { $set: { isMyDay: req.body.isMyDay } });
	try {
		res.status(200).json({
			message: `task has been added to my day`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const getImportanceTasks = async (req: Request, res: Response) => {
	const tasks = await Task.find({ importance: Importance.high });
	try {
		res.status(200).json({
			body: tasks,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};