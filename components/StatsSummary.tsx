import React, { useMemo } from 'react';
import { View } from 'react-native';
import StatsCard from './StatsCard';

interface StatsSummaryProps {
  data: { value: number }[];
}

export default function StatsSummary({ data }: StatsSummaryProps) {
  const { average, total, peak } = useMemo(() => {
    if (!data || data.length === 0) {
      return { average: 0, total: 0, peak: 0 };
    }
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    const averageValue = Math.round(totalValue / data.length);
    const peakValue = Math.max(...data.map((item) => item.value));
    return { average: averageValue, total: totalValue, peak: peakValue };
  }, [data]);

  return (
    <View style={{ flexDirection: "row", gap: 12, paddingHorizontal: 16 }}>
      <StatsCard label="Average" value={average} />
      <StatsCard label="Total" value={total} />
      <StatsCard label="Peak" value={peak} />
    </View>
  );
}