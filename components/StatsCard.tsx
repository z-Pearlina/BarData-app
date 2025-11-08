import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './ui/Text';
interface StatsCardProps {
    label: string;
    value: number | string;
}
export default function StatsCard({ label, value }: StatsCardProps) {
    return (
        <View style={styles.card}>
            <Text type="body" weight="medium" style={styles.label}>{label}</Text>
            <Text type="2xl" weight="bold" style={styles.value}>{value}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.9)",
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    label: {
        color: '#6b7280',
    },
    value: {
        color: '#1f2937',
        marginTop: 4,
    }
});