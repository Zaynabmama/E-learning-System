import { Withdrawal } from '../models/withdrawal.model.js';
import { Class } from '../models/class.model.js';
import { User } from '../models/user.model.js';

// Handler to request withdrawal from a class
export const requestWithdrawal = async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.user.id; // Extract user ID from the authenticated request

    // Check if the class exists
    const classToUpdate = await Class.findById(classId);
    if (!classToUpdate) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if the user is enrolled in the class
    if (!classToUpdate.students.includes(userId)) {
      return res.status(400).json({ message: 'User is not enrolled in this class' });
    }

    // Create a new withdrawal request
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

// Handler to list all withdrawal requests
export const listWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().populate('user').populate('class');
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching withdrawal requests', error: error.message });
  }
};

// Handler to manage a withdrawal request (approve or reject)
export const manageWithdrawal = async (req, res) => {
  try {
    const { id } = req.params; // Withdrawal request ID
    const { status } = req.body; // Should be 'approved' or 'rejected'

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Find and update the withdrawal request with the new status
    const withdrawalRequest = await Withdrawal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user')
     .populate('class');

    if (!withdrawalRequest) {
      return res.status(404).json({ message: 'Withdrawal request not found' });
    }

    // If approved, remove the user from the class
    if (status === 'approved') {
      const classToUpdate = await Class.findById(withdrawalRequest.class);
      if (classToUpdate) {
        classToUpdate.students.pull(withdrawalRequest.user); // Remove user from class
        await classToUpdate.save(); // Save updated class document
      }
    }

    res.json({ message: 'Withdrawal request managed', withdrawalRequest });
  } catch (error) {
    res.status(400).json({ message: 'Error managing withdrawal request', error: error.message });
  }
};
