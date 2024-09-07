import React from 'react'
import { Controller } from 'react-hook-form'
import { View, Text, Switch, StyleSheet } from 'react-native'

interface SwitchControllerProps {
  control?: any
  name: string
  label: string
  description: string
  disabled?: boolean
}

const SwitchController: React.FC<SwitchControllerProps> = ({
  control,
  name,
  label,
  description,
  disabled = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.switchContainer}>
          <View>
            <Text style={styles.label}>Class 6</Text>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <Switch
            value={value}
            onValueChange={onChange}
            disabled={disabled}
          />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
})

export default SwitchController
