const Expense = require('../models/Expense');
const mongoose = require('mongoose');

const addExpense = async (req, res) => {
  try {
    const { title, amount, note } = req.body;
    const expense = new Expense({ title, amount, note, user: req.user.id });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Not found' });

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const updateExpense = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Not found' });

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, amount, note } = req.body;
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, note },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { addExpense, getExpenses, deleteExpense, updateExpense };