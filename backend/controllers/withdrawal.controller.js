import { Withdrawal } from '../models/withdrawal.model.js';
import { Class } from '../models/class.model.js';
import { User } from '../models/user.model.js';

export const requestWithdrawal = async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.user.id; 


    const classToUpdate = await Class.findById(classId);
    if (!classToUpdate) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (!classToUpdate.students.includes(userId)) {
      return res.status(400).json({ message: 'User is not enrolled in this class' });
    }


    const withdrawalRequest = new Withdrawal({
      user: userId,
      class: classId,
    });

    await withdrawalRequest.save();

    res.status(201).json({ message: 'Withdrawal request submitted successfully', withdrawalRequest });
  } catch (error) {
    res.status(400).json({ message: 'Error requesting withdrawal', error: error.message });
  }
};

export const listWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().populate('user').populate('class');
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching withdrawal requests', error: error.message });
  }
};


export const manageWithdrawal = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;


    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }


    const withdrawalRequest = await Withdrawal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user')
     .populate('class');

    if (!withdrawalRequest) {
      return res.status(404).json({ message: 'Withdrawal request not found' });
    }

    if (status === 'approved') {
      const classToUpdate = await Class.findById(withdrawalRequest.class);
      if (classToUpdate) {
        classToUpdate.students.pull(withdrawalRequest.user);
        await classToUpdate.save();
      }
    }

    res.json({ message: 'Withdrawal request managed', withdrawalRequest });
  } catch (error) {
    res.status(400).json({ message: 'Error managing withdrawal request', error: error.message });
  }
};
