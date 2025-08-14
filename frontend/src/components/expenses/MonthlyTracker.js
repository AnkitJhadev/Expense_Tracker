import React from 'react';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, Minus, Calendar, BarChart3, IndianRupee } from 'lucide-react';

const MonthlyTracker = ({ monthlyData }) => {
  const currentMonth = format(new Date(), 'MMMM yyyy');
  const total = monthlyData.total || 0;
  const count = monthlyData.count || 0;
  
  // Calculate average per day (assuming current month)
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const currentDay = new Date().getDate();
  const averagePerDay = total / currentDay;
  const projectedTotal = averagePerDay * daysInMonth;

  // Get category breakdown for display
  const categories = Object.entries(monthlyData.categoryBreakdown || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const getTrendIcon = () => {
    if (count === 0) return <Minus className="h-5 w-5 text-gray-400 dark:text-gray-500" />;
    if (total > 1000) return <TrendingUp className="h-5 w-5 text-red-500" />;
    if (total > 500) return <TrendingUp className="h-5 w-5 text-yellow-500" />;
    return <TrendingDown className="h-5 w-5 text-green-500" />;
  };

  const getTrendColor = () => {
    if (count === 0) return 'text-gray-500 dark:text-gray-400';
    if (total > 1000) return 'text-red-600 dark:text-red-400';
    if (total > 500) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getTrendText = () => {
    if (count === 0) return 'No expenses';
    if (total > 1000) return 'High spending';
    if (total > 500) return 'Moderate spending';
    return 'Good control';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Monthly Expense Tracker</h2>
        </div>
        <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {getTrendText()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Month Summary */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>{currentMonth}</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Spent:</span>
                <div className="flex items-center space-x-1">
                  <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Expenses Count:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Daily Average:</span>
                <div className="flex items-center space-x-1">
                  <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">{averagePerDay.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Projected Month:</span>
                <div className="flex items-center space-x-1">
                  <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">{projectedTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span>Top Categories</span>
          </h3>
          {categories.length > 0 ? (
            <div className="space-y-3">
              {categories.map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{category}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(amount / total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center space-x-1 w-20 text-right">
                      <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
              <p>No expenses this month</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="font-medium">Month Progress</span>
          <span className="font-medium">{currentDay}/{daysInMonth} days</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
            style={{ width: `${(currentDay / daysInMonth) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          {Math.round((currentDay / daysInMonth) * 100)}% of month completed
        </div>
      </div>
    </div>
  );
};

export default MonthlyTracker;
