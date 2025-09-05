import React from 'react';

interface StatusBadgeProps {
  status: 'enabled' | 'disabled' | 'not-required';
  children: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'enabled':
        return 'text-emerald-700 bg-accent-green';
      case 'disabled':
        return 'text-red-700 bg-red-100';
      case 'not-required':
        return 'text-gray-500 bg-gray-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getStatusStyles()}`}>
      {children}
    </span>
  );
}
