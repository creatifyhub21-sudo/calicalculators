import React from 'react';
import InfoCard from './InfoCard';

interface Item {
  title: string;
  value: string | number;
  hint?: string;
}

interface DetailCardGridProps {
  items: Item[];
  columns?: string;
}

export default function DetailCardGrid({
  items,
  columns = 'sm:grid-cols-2 xl:grid-cols-3',
}: DetailCardGridProps) {
  if (!items.length) return null;
  return (
    <div className={`grid gap-4 ${columns}`}>
      {items.map((item) => (
        <InfoCard
          key={item.title}
          title={item.title}
          value={item.value}
          hint={item.hint}
        />
      ))}
    </div>
  );
}
