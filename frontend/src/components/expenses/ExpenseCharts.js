import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUp, IndianRupee } from 'lucide-react';

const ExpenseCharts = ({ analyticsData }) => {
  const [activeTab, setActiveTab] = useState('category');

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];

  // Prepare data for pie chart
  const pieData = Object.entries(analyticsData.categoryData || {}).map(([name, value]) => ({
    name,
    value: parseFloat(value)
  }));

  // Prepare data for bar chart
  const barData = Object.entries(analyticsData.dailyData || {})
    .map(([date, value]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: parseFloat(value)
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-30); // Last 30 days

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <div className="flex items-center space-x-1">
            <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
            <p className="text-green-600 dark:text-green-400 font-semibold">{payload[0].value.toFixed(2)}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 dark:text-white">{payload[0].name}</p>
          <div className="flex items-center space-x-1">
            <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
            <p className="text-green-600 dark:text-green-400 font-semibold">{payload[0].value.toFixed(2)}</p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {((payload[0].value / analyticsData.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Expense Analytics</h2>
        </div>
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('category')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'category'
                ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Category
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'daily'
                ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Daily
          </button>
        </div>
      </div>

      {activeTab === 'category' ? (
        <div className="space-y-6">
          {/* Pie Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={Math.ceil(barData.length / 10)}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis tick={{ fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="amount" 
                fill="url(#gradient)" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Expenses</p>
            <div className="flex items-center justify-center space-x-1">
              <IndianRupee className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.total?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Count</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.count || 0}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average per Day</p>
            <div className="flex items-center justify-center space-x-1">
              <IndianRupee className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {barData.length > 0 ? (analyticsData.total / barData.length).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
