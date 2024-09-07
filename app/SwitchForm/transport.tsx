import React from "react"
import { View, Button, Alert, StyleSheet, Text, FlatList } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SwitchController from "@/components/SwitchController"
import { Mapdata } from "@/components/data/mapData"
// import { Mapdata } from "@/data/Mapdata" // Update the path if needed

// Define your form schema using Zod
const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

export default function Transport() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      security_emails: true,
      marketing_emails: true,
    },
  })

  const onSubmit = (data: any) => {
    Alert.alert(
      "Form Submitted",
      `You submitted the following values: ${JSON.stringify(data, null, 2)}`
    )
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.studentContainer}>
      <Text style={styles.header}>{item.name}</Text>
      <SwitchController
        control={control}
        name={`student_${item.id}`} // Dynamically generate a unique name for each switch
        label={`student ID: ${item.id}`}
        description={`Location: (${item.latitude}, ${item.longitude})`}
        disabled={false}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={Mapdata.students} // Pass in the student data
        renderItem={renderItem} // Use the renderItem function to render each item
        keyExtractor={(item) => item.id} // Unique key for each item
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  studentContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
})