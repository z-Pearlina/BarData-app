import { generateMonthlyData } from "@/constants/DummyData";
import { Color } from "@/constants/TWPalette";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { ScrollView, View, LayoutAnimation, UIManager, Platform } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import MonthNavigator from "./MonthNavigator";
import StatsSummary from "./StatsSummary";
import ThemeSelector from "./ThemeSelector";
import { Text } from "./ui/Text";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface BarData {
  value: number;
  label?: string;
  frontColor?: string;
  [key:string]: any;
}

export const colorThemes = {
  blue: { name: "blue", primary: 500, accent: 600 },
  purple: { name: "purple", primary: 500, accent: 600 },
  emerald: { name: "emerald", primary: 500, accent: 600 },
  orange: { name: "orange", primary: 500, accent: 600 },
  pink: { name: "pink", primary: 500, accent: 600 },
  cyan: { name: "cyan", primary: 500, accent: 600 },
} as const;

export type ColorTheme = keyof typeof colorThemes;

export default function AnalyticsScreen() {
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [colorTheme, setColorTheme] = useState<ColorTheme>("purple");

  const theme = colorThemes[colorTheme];
  const themeColor = Color[theme.name as keyof typeof Color][theme.primary];

  const monthlyData = useMemo(
    () => generateMonthlyData(currentYear, currentMonth + 1),
    [currentYear, currentMonth]
  );
  
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [monthlyData]);

  const handleMonthNavigate = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedBarIndex(null);
  };

  const handleThemeSelect = (themeName: ColorTheme) => {
    setColorTheme(themeName);
    setSelectedBarIndex(null);
  };

  const chartData = useCallback(() => {
    return monthlyData.map((item, index) => ({
      ...item,
      frontColor: selectedBarIndex === index ? Color[theme.name as keyof typeof Color][theme.accent] : themeColor,
      gradientColor: selectedBarIndex === index ? Color[theme.name as keyof typeof Color][400] : Color[theme.name as keyof typeof Color][300],
      topLabelComponent: () =>
        selectedBarIndex === index ? (
          <Text style={{ color: Color[theme.name as keyof typeof Color][700], fontSize: 10, fontWeight: "600", marginBottom: 4 }}>
            {item.value}
          </Text>
        ) : null,
    }));
  }, [monthlyData, selectedBarIndex, themeColor, theme]);

  const bgColors = [Color[colorThemes[colorTheme].name][100], "#ffffff", Color[colorThemes[colorTheme].name][100]];

  return (
    <LinearGradient colors={bgColors} style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: 32}}>
        
        <StatsSummary data={monthlyData} />

        <View style={{ paddingHorizontal: 16, marginTop: 32, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 20, marginHorizontal: 16, paddingVertical: 24, overflow: 'hidden' }}>
          <MonthNavigator
            month={currentMonth}
            year={currentYear}
            onNavigate={handleMonthNavigate}
          />
          <BarChart
            noOfSections={4}
            barBorderRadius={4}
            data={chartData()}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisLabelTextStyle={{ color: Color.gray[400], fontSize: 12, fontWeight: "500" }}
            yAxisTextStyle={{ color: Color.gray[400], fontSize: 12, fontWeight: "500" }}
            isAnimated
            animationDuration={300}
            onPress={(_item: BarData, index: number) => {
              setSelectedBarIndex(selectedBarIndex === index ? null : index);
            }}
            showGradient
            dashGap={10}
          />
        </View>
        
        <ThemeSelector
          themes={colorThemes}
          activeTheme={colorTheme}
          onSelectTheme={handleThemeSelect}
        />
      </ScrollView>
    </LinearGradient>
  );
}