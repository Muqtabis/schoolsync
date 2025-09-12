import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GradeAnalytics = ({ students, assignments, grades }) => {
  const [selectedView, setSelectedView] = useState('distribution');
  const [selectedAssignment, setSelectedAssignment] = useState('all');

  const viewOptions = [
    { value: 'distribution', label: 'Grade Distribution' },
    { value: 'trends', label: 'Performance Trends' },
    { value: 'comparison', label: 'Assignment Comparison' },
    { value: 'individual', label: 'Individual Progress' }
  ];

  const assignmentOptions = [
    { value: 'all', label: 'All Assignments' },
    ...assignments?.map(a => ({ value: a?.id, label: a?.title }))
  ];

  // Calculate grade distribution
  const getGradeDistribution = () => {
    const distribution = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    
    students?.forEach(student => {
      const studentGrades = grades?.filter(g => g?.studentId === student?.id);
      if (studentGrades?.length > 0) {
        const average = studentGrades?.reduce((sum, grade) => sum + parseFloat(grade?.score || 0), 0) / studentGrades?.length;
        
        if (average >= 90) distribution.A++;
        else if (average >= 80) distribution.B++;
        else if (average >= 70) distribution.C++;
        else if (average >= 60) distribution.D++;
        else distribution.F++;
      }
    });

    return Object.entries(distribution)?.map(([grade, count]) => ({
      grade,
      count,
      percentage: ((count / students?.length) * 100)?.toFixed(1)
    }));
  };

  // Calculate assignment performance
  const getAssignmentPerformance = () => {
    return assignments?.map(assignment => {
      const assignmentGrades = grades?.filter(g => g?.assignmentId === assignment?.id);
      const average = assignmentGrades?.length > 0 
        ? assignmentGrades?.reduce((sum, grade) => sum + parseFloat(grade?.score || 0), 0) / assignmentGrades?.length
        : 0;
      
      return {
        name: assignment?.title?.substring(0, 10) + '...',
        fullName: assignment?.title,
        average: parseFloat(average?.toFixed(1)),
        category: assignment?.category,
        submissions: assignmentGrades?.length,
        totalStudents: students?.length
      };
    });
  };

  // Calculate class performance trends
  const getPerformanceTrends = () => {
    const sortedAssignments = [...assignments]?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    return sortedAssignments?.map((assignment, index) => {
      const assignmentGrades = grades?.filter(g => g?.assignmentId === assignment?.id);
      const average = assignmentGrades?.length > 0 
        ? assignmentGrades?.reduce((sum, grade) => sum + parseFloat(grade?.score || 0), 0) / assignmentGrades?.length
        : 0;
      
      return {
        assignment: `Assignment ${index + 1}`,
        fullName: assignment?.title,
        average: parseFloat(average?.toFixed(1)),
        date: new Date(assignment.dueDate)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
    });
  };

  // Get individual student progress
  const getStudentProgress = () => {
    return students?.map(student => {
      const studentGrades = grades?.filter(g => g?.studentId === student?.id);
      const average = studentGrades?.length > 0 
        ? studentGrades?.reduce((sum, grade) => sum + parseFloat(grade?.score || 0), 0) / studentGrades?.length
        : 0;
      
      return {
        name: student?.name,
        average: parseFloat(average?.toFixed(1)),
        totalAssignments: assignments?.length,
        completedAssignments: studentGrades?.length,
        completionRate: ((studentGrades?.length / assignments?.length) * 100)?.toFixed(1)
      };
    })?.sort((a, b) => b?.average - a?.average);
  };

  const gradeDistribution = getGradeDistribution();
  const assignmentPerformance = getAssignmentPerformance();
  const performanceTrends = getPerformanceTrends();
  const studentProgress = getStudentProgress();

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6B7280'];

  const renderDistributionChart = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="text-sm font-medium text-foreground mb-4">Grade Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gradeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, 'Students']}
                labelFormatter={(label) => `Grade: ${label}`}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="text-sm font-medium text-foreground mb-4">Grade Percentage</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {gradeDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {gradeDistribution?.map((item, index) => (
          <div key={item?.grade} className="bg-card rounded-lg border border-border p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: COLORS?.[index] }}>
              {item?.count}
            </div>
            <div className="text-sm text-muted-foreground">Grade {item?.grade}</div>
            <div className="text-xs text-muted-foreground">{item?.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrendsChart = () => (
    <div className="bg-card rounded-lg border border-border p-4">
      <h4 className="text-sm font-medium text-foreground mb-4">Class Performance Over Time</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={performanceTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Average Score']}
            labelFormatter={(label, payload) => {
              if (payload && payload?.[0]) {
                return payload?.[0]?.payload?.fullName;
              }
              return label;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="average" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderComparisonChart = () => (
    <div className="bg-card rounded-lg border border-border p-4">
      <h4 className="text-sm font-medium text-foreground mb-4">Assignment Performance Comparison</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={assignmentPerformance} margin={{ bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Average Score']}
            labelFormatter={(label, payload) => {
              if (payload && payload?.[0]) {
                return payload?.[0]?.payload?.fullName;
              }
              return label;
            }}
          />
          <Bar dataKey="average" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderIndividualProgress = () => (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground">Individual Student Progress</h4>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {studentProgress?.map((student, index) => (
          <div key={student?.name} className={`p-4 border-b border-border last:border-b-0 ${
            index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">
                    {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{student?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {student?.completedAssignments}/{student?.totalAssignments} assignments completed
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-semibold ${
                  student?.average >= 90 ? 'text-success' :
                  student?.average >= 80 ? 'text-primary' :
                  student?.average >= 70 ? 'text-warning' :
                  student?.average >= 60 ? 'text-orange-500' : 'text-error'
                }`}>
                  {student?.average}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {student?.completionRate}% completion
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Grade Analytics</h2>
          <p className="text-sm text-muted-foreground">Analyze class performance and grade trends</p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            options={viewOptions}
            value={selectedView}
            onChange={setSelectedView}
            className="w-48"
          />
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            size="sm"
          >
            Export Report
          </Button>
        </div>
      </div>
      {/* Analytics Content */}
      <div className="space-y-6">
        {selectedView === 'distribution' && renderDistributionChart()}
        {selectedView === 'trends' && renderTrendsChart()}
        {selectedView === 'comparison' && renderComparisonChart()}
        {selectedView === 'individual' && renderIndividualProgress()}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{students?.length}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{assignments?.length}</p>
              <p className="text-sm text-muted-foreground">Assignments</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {(grades?.reduce((sum, grade) => sum + parseFloat(grade?.score || 0), 0) / grades?.length || 0)?.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Class Average</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {Math.round((grades?.length / (students?.length * assignments?.length)) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeAnalytics;