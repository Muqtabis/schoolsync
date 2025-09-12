import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PerformanceCharts = () => {
  const enrollmentData = [
    { month: 'Jan', students: 1200, teachers: 45 },
    { month: 'Feb', students: 1250, teachers: 47 },
    { month: 'Mar', students: 1280, teachers: 48 },
    { month: 'Apr', students: 1320, teachers: 50 },
    { month: 'May', students: 1350, teachers: 52 },
    { month: 'Jun', students: 1380, teachers: 53 },
    { month: 'Jul', students: 1400, teachers: 55 },
    { month: 'Aug', students: 1420, teachers: 56 },
    { month: 'Sep', students: 1450, teachers: 58 }
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 180, percentage: 12.4 },
    { grade: 'A', count: 320, percentage: 22.1 },
    { grade: 'B+', count: 280, percentage: 19.3 },
    { grade: 'B', count: 250, percentage: 17.2 },
    { grade: 'C+', count: 200, percentage: 13.8 },
    { grade: 'C', count: 150, percentage: 10.3 },
    { grade: 'D', count: 70, percentage: 4.9 }
  ];

  const financialData = [
    { name: 'Tuition Fees', value: 450000, color: '#2563EB' },
    { name: 'Activity Fees', value: 85000, color: '#059669' },
    { name: 'Transportation', value: 65000, color: '#F59E0B' },
    { name: 'Cafeteria', value: 45000, color: '#EF4444' },
    { name: 'Others', value: 25000, color: '#8B5CF6' }
  ];

  const attendanceData = [
    { day: 'Mon', attendance: 95.2 },
    { day: 'Tue', attendance: 94.8 },
    { day: 'Wed', attendance: 96.1 },
    { day: 'Thu', attendance: 93.7 },
    { day: 'Fri', attendance: 92.4 },
    { day: 'Sat', attendance: 89.3 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{`${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {`${entry?.name}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Enrollment Trends */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Enrollment Trends</h3>
        <div className="w-full h-64" aria-label="Enrollment Trends Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="students" 
                stroke="#2563EB" 
                strokeWidth={2}
                name="Students"
              />
              <Line 
                type="monotone" 
                dataKey="teachers" 
                stroke="#059669" 
                strokeWidth={2}
                name="Teachers"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Grade Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Grade Distribution</h3>
        <div className="w-full h-64" aria-label="Grade Distribution Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="grade" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Financial Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Financial Overview</h3>
        <div className="w-full h-64" aria-label="Financial Overview Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={financialData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {financialData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value?.toLocaleString()}`, 'Amount']}
                content={<CustomTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {financialData?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item?.color }}
              ></div>
              <span className="text-xs text-muted-foreground">{item?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Weekly Attendance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Attendance</h3>
        <div className="w-full h-64" aria-label="Weekly Attendance Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
              <YAxis 
                stroke="#64748B" 
                fontSize={12}
                domain={[85, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Attendance']}
                content={<CustomTooltip />}
              />
              <Bar 
                dataKey="attendance" 
                fill="#059669" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;