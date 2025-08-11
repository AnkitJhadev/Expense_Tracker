const express = require('express');
const { body, validationResult } = require('express-validator');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/expenses
// @desc    Get all expenses for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id })
      .sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/expenses/monthly
// @desc    Get monthly expenses summary
// @access  Private
router.get('/monthly', auth, async (req, res) => {
  try {
    const { year, month } = req.query;
    const startDate = new Date(year || new Date().getFullYear(), month ? month - 1 : new Date().getMonth(), 1);
    const endDate = new Date(year || new Date().getFullYear(), month ? month : new Date().getMonth() + 1, 0);

    const expenses = await Expense.find({
      user: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    });

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const categoryBreakdown = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    res.json({
      total,
      count: expenses.length,
      categoryBreakdown,
      expenses
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/expenses/analytics
// @desc    Get expense analytics for charts
// @access  Private
router.get('/analytics', auth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let startDate, endDate;

    if (period === 'month') {
      startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    } else if (period === 'year') {
      startDate = new Date(new Date().getFullYear(), 0, 1);
      endDate = new Date(new Date().getFullYear(), 11, 31);
    }

    const expenses = await Expense.find({
      user: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    });

    // Category breakdown
    const categoryData = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // Daily breakdown for the period
    const dailyData = {};
    expenses.forEach(expense => {
      const date = expense.date.toISOString().split('T')[0];
      dailyData[date] = (dailyData[date] || 0) + expense.amount;
    });

    res.json({
      categoryData,
      dailyData,
      total: expenses.reduce((sum, expense) => sum + expense.amount, 0),
      count: expenses.length
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/expenses
// @desc    Create a new expense
// @access  Private
router.post('/', [
  auth,
  body('title', 'Title is required').not().isEmpty(),
  body('amount', 'Amount must be a positive number').isFloat({ min: 0 }),
  body('category', 'Category is required').isIn(['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, amount, category, description, date } = req.body;

    const newExpense = new Expense({
      user: req.user._id,
      title,
      amount,
      category,
      description,
      date: date || new Date()
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/expenses/:id
// @desc    Update an expense
// @access  Private
router.put('/:id', [
  auth,
  body('title', 'Title is required').not().isEmpty(),
  body('amount', 'Amount must be a positive number').isFloat({ min: 0 }),
  body('category', 'Category is required').isIn(['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, amount, category, description, date } = req.body;

    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Make sure user owns the expense
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category, description, date },
      { new: true }
    );

    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Make sure user owns the expense
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await expense.remove();
    res.json({ message: 'Expense removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
