import { getMonthName } from '@/utils/dateUtils'; // We'll create this file
import React from 'react';
import { View } from 'react-native';
import { Button } from './ui/Button';
import { Text } from './ui/Text';
interface MonthNavigatorProps {
    month: number;
    year: number;
    onNavigate: (direction: number) => void;
    themeColor: string;
}
export default function MonthNavigator({ month, year, onNavigate, themeColor }: MonthNavigatorProps) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingHorizontal: 8 }}>
            <Button
                title=""
                symbol="chevron.backward"
                onPress={() => onNavigate(-1)}
                variant="soft"
                color="black"
                radius="full"
                style={{ width: 44, height: 44 }}
            />
            <Text type="lg" weight="semibold" style={{ color: '#1f2937' }}>
                {getMonthName(month)} {year}
            </Text>
            <Button
                title=""
                symbol="chevron.forward"
                onPress={() => onNavigate(1)}
                variant="soft"
                color="black"
                radius="full"
                style={{ width: 44, height: 44 }}
            />
        </View>
    );
}