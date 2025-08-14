import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit, Trash2, Tag, IndianRupee, Filter, SortAsc, SortDesc } from 'lucide-react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Gifts',
    'Other'
  ];

  // Filter and sort expenses
  const filteredAndSortedExpenses = expenses
    .filter(expense => !filterCategory || expense.category === filterCategory)
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'date':
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Transportation': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Entertainment': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Shopping': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'Bills & Utilities': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Healthcare': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Education': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'Travel': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
      'Gifts': 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
      'Other': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[category] || colors['Other'];
  };

  const SortableHeader = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      <span>{children}</span>
      {sortBy === field && (
        <span className="text-blue-600 dark:text-blue-400">
          {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
        </span>
      )}
    </button>
  );

  if (expenses.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Tag className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No expenses yet</h3>
        <p className="text-gray-600 dark:text-gray-400">Start tracking your expenses by adding your first one!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
            <Tag className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Expenses</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field pl-10 sm:w-44"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortableHeader field="title">Title</SortableHeader>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortableHeader field="amount">Amount</SortableHeader>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortableHeader field="category">Category</SortableHeader>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortableHeader field="date">Date</SortableHeader>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAndSortedExpenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{expense.title}</div>
                    {expense.description && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {expense.description}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {expense.amount.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {format(new Date(expense.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="p-2 text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                      title="Edit expense"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(expense._id)}
                      className="p-2 text-red-600 hover:text-red-900 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                      title="Delete expense"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>
            Showing {filteredAndSortedExpenses.length} of {expenses.length} expenses
          </span>
          <div className="flex items-center space-x-1">
            <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="font-semibold">
              {filteredAndSortedExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
