import { createEditGroupSchema, CreateEditGroupType } from '@kkrawczyk/todo-common';
import express, { Request, Response } from 'express';
import { Group } from '../models/group';
import { getSessionUserId } from '../utils/auth';
import { validateBody } from '../utils/validation';

const groups = express.Router();

groups.post('/createGroup', validateBody<CreateEditGroupType>(createEditGroupSchema), async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);

	const newGroup = new Group({
		title: req.body.title,
		themeColor: 'blue',
		createdAt: Date.now(),
		userId: userId,
	});

	try {
		const group = await newGroup.save();
		res.status(200).json({
			body: {
				id: group._id,
				title: group.title,
				themeColor: group.themeColor,
				createdAt: group.createdAt,
			},
			message: `group created successfully`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

groups.get('/getGroups', async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);

	const groups = await Group.find({ userId });
	try {
		res.status(200).json({
			body: groups,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

groups.delete('/removeGroup', async (req: Request, res: Response) => {
	const group = await Group.deleteOne({ _id: req.body._id });
	try {
		res.status(200).json({
			body: group,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

groups.patch('/editGroup', validateBody<CreateEditGroupType>(createEditGroupSchema), async (req: Request, res: Response) => {
	await Group.updateOne({ _id: req.body._id }, { $set: { title: req.body.title } });
	try {
		res.status(200).json({
			message: `status changed successfully to ${req.body.title}`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

export default groups;
