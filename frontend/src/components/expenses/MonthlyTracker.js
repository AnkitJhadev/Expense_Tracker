import React from 'react';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

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
    if (count === 0) return <Minus className="h-5 w-5 text-gray-400" />;
    if (total > 1000) return <TrendingUp className="h-5 w-5 text-danger-500" />;
    if (total > 500) return <TrendingUp className="h-5 w-5 text-yellow-500" />;
    return <TrendingDown className="h-5 w-5 text-success-500" />;
  };

  const getTrendColor = () => {
    if (count === 0) return 'text-gray-500';
    if (total > 1000) return 'text-danger-600';
    if (total > 500) return 'text-yellow-600';
    return 'text-success-600';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Monthly Expense Tracker</h2>
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {count === 0 ? 'No expenses' : total > 1000 ? 'High spending' : total > 500 ? 'Moderate spending' : 'Good control'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Month Summary */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{currentMonth}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Spent:</span>
                <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expenses Count:</span>
                <span className="font-semibold text-gray-900">{count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Average:</span>
                <span className="font-semibold text-gray-900">${averagePerDay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projected Month:</span>
                <span className="font-semibold text-gray-900">${projectedTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Top Categories</h3>
          {categories.length > 0 ? (
            <div className="space-y-3">
              {categories.map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-700">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${(amount / total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No expenses this month</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Month Progress</span>
          <span>{currentDay}/{daysInMonth} days</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentDay / daysInMonth) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTracker;
