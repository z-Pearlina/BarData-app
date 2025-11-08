import { Color } from '@/constants/TWPalette';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './ui/Text';
import { ColorTheme, colorThemes } from './AnalyticsScreen';

interface ThemeSelectorProps {
  themes: typeof colorThemes;
  activeTheme: ColorTheme;
  onSelectTheme: (theme: ColorTheme) => void;
}

export default function ThemeSelector({ themes, activeTheme, onSelectTheme }: ThemeSelectorProps) {
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 32 }}>
      <Text type="body" weight="medium" style={{ color: '#6b7280', marginBottom: 12, textAlign: 'center' }}>
        Change Accent Color
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
        {(Object.keys(themes) as ColorTheme[]).map((theme) => (
          <Pressable
            key={theme}
            onPress={() => onSelectTheme(theme)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: Color[themes[theme].name as keyof typeof Color][500],
              borderWidth: 3,
              borderColor: activeTheme === theme ? Color[themes[theme].name as keyof typeof Color][700] : 'transparent',
              transform: [{ scale: activeTheme === theme ? 1.1 : 1.0 }],
            }}
          />
        ))}
      </View>
    </View>
  );
}