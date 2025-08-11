import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react';
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
        axios.get('/api/expenses'),
        axios.get('/api/expenses/monthly'),
        axios.get('/api/expenses/analytics')
      ]);

      setExpenses(expensesRes.data);
      setMonthlyData(monthlyRes.data);
      setAnalyticsData(analyticsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await axios.post('/api/expenses', expenseData);
      setExpenses([response.data, ...expenses]);
      await fetchData(); // Refresh all data
      setShowExpenseForm(false);
      toast.success('Expense added successfully!');
    } catch (error) {
      toast.error('Failed to add expense');
      console.error('Error adding expense:', error);
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const response = await axios.put(`/api/expenses/${id}`, expenseData);
      setExpenses(expenses.map(exp => exp._id === id ? response.data : exp));
      await fetchData(); // Refresh all data
      setEditingExpense(null);
      toast.success('Expense updated successfully!');
    } catch (error) {
      toast.error('Failed to update expense');
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        setExpenses(expenses.filter(exp => exp._id !== id));
        await fetchData(); // Refresh all data
        toast.success('Expense deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete expense');
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your expenses and track your spending</p>
        </div>
        <button
          onClick={() => setShowExpenseForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                ${monthlyData.total?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expenses Count</p>
              <p className="text-2xl font-bold text-gray-900">
                {monthlyData.count || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Month</p>
              <p className="text-2xl font-bold text-gray-900">
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
