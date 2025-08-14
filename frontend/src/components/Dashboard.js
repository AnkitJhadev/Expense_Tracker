import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { format } from 'date-fns';
import { Plus, TrendingUp, Calendar, DollarSign, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import ExpenseForm from './expenses/ExpenseForm';
import ExpenseList from './expenses/ExpenseList';
import ExpenseCharts from './expenses/ExpenseCharts';
import MonthlyTracker from './expenses/MonthlyTracker';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [analyticsData, setAnalyticsData] = useState({});
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesRes, monthlyRes, analyticsRes] = await Promise.all([
        api.get('/api/expenses'),
        api.get('/api/expenses/monthly'),
        api.get('/api/expenses/analytics')
      ]);

      setExpenses(expensesRes.data.data || expensesRes.data);
      setMonthlyData(monthlyRes.data);
      setAnalyticsData(analyticsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await api.post('/api/expenses', expenseData);
      if (response.data.success) {
        setExpenses([response.data.data, ...expenses]);
        await fetchData(); // Refresh all data
        setShowExpenseForm(false);
        toast.success('Expense added successfully!');
      } else {
        toast.error(response.data.message || 'Failed to add expense');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.[0]?.message || 
                          'Failed to add expense';
      toast.error(errorMessage);
      // eslint-disable-next-line no-console
      console.error('Error adding expense:', error);
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const response = await api.put(`/api/expenses/${id}`, expenseData);
      if (response.data.success) {
        setExpenses(expenses.map(exp => exp._id === id ? response.data.data : exp));
        await fetchData(); // Refresh all data
        setEditingExpense(null);
        toast.success('Expense updated successfully!');
      } else {
        toast.error(response.data.message || 'Failed to update expense');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.[0]?.message || 
                          'Failed to update expense';
      toast.error(errorMessage);
      // eslint-disable-next-line no-console
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const response = await api.delete(`/api/expenses/${id}`);
        if (response.data.success) {
          setExpenses(expenses.filter(exp => exp._id !== id));
          await fetchData(); // Refresh all data
          toast.success('Expense deleted successfully!');
        } else {
          toast.error(response.data.message || 'Failed to delete expense');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.errors?.[0]?.message || 
                            'Failed to delete expense';
        toast.error(errorMessage);
        // eslint-disable-next-line no-console
        console.error('Error deleting expense:', error);
      }
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Expense Tracker</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white black:text-white">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Manage your expenses, track your spending, and gain insights into your financial habits
        </p>
        <button
          onClick={() => setShowExpenseForm(true)}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Expense</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card card-hover bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <DollarSign className="h-7 w-7 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-700 dark:text-green-300">Total This Month</p>
              <p className="text-3xl font-bold text-green-800 dark:text-green-200">
                ₹{monthlyData.total?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="card card-hover bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Expenses Count</p>
              <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                {monthlyData.count || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="card card-hover bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-700">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
              <Calendar className="h-7 w-7 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Current Month</p>
              <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                {format(new Date(), 'MMM yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Tracker */}
      <MonthlyTracker monthlyData={monthlyData} />

      {/* Charts Section */}
      <ExpenseCharts analyticsData={analyticsData} />

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm
          onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
          onCancel={() => {
            setShowExpenseForm(false);
            setEditingExpense(null);
          }}
          expense={editingExpense}
          isEditing={!!editingExpense}
        />
      )}

      {/* Expense List */}
      <ExpenseList
        expenses={expenses}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />
    </div>
  );
};

export default Dashboard;
