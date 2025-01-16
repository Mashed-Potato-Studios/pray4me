import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (query: string) => void;
  loading?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  autoFocus?: boolean;
  showCancelButton?: boolean;
  onCancel?: () => void;
}

export default function Search({
  placeholder = 'Search...',
  value,
  onChangeText,
  onSearch,
  loading = false,
  containerStyle,
  inputStyle,
  autoFocus = false,
  showCancelButton = false,
  onCancel,
}: SearchProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
    Keyboard.dismiss();
  };

  const handleCancel = () => {
    handleClear();
    onCancel?.();
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    onSearch?.(value);
    Keyboard.dismiss();
  };

  return (
    <View 
      className={'flex-row items-center space-x-2 ' + 
        (containerStyle ? '' : 'px-4 py-2')}
      style={containerStyle}
    >
      <View 
        className={'flex-1 flex-row items-center bg-white rounded-xl px-4 py-2 ' +
          (isFocused ? 'border border-indigo-500' : 'border border-gray-200')}
      >
        <Ionicons 
          name="search-outline" 
          size={20} 
          color={isFocused ? '#4F46E5' : '#9CA3AF'} 
        />
        
        <TextInput
          className="flex-1 ml-2 text-base"
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoFocus={autoFocus}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {loading ? (
          <ActivityIndicator size="small" color="#4F46E5" />
        ) : value ? (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ) : null}
      </View>

      {showCancelButton && isFocused && (
        <TouchableOpacity 
          onPress={handleCancel}
          className="py-2"
        >
          <Ionicons name="close" size={24} color="#4F46E5" />
        </TouchableOpacity>
      )}
    </View>
  );
}