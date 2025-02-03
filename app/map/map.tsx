import { Mapdata } from '@/components/data/mapData';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // or 'react-native-vector-icons/FontAwesome'

interface BusLocation {
  id: string;
  latitude: number;
  longitude: number;
  route: string;
}

interface StudentLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
function Map() {
  const [busLocations, setBusLocations] = useState<BusLocation[]>([]);
  const [studentLocations, setStudentLocations] = useState<StudentLocation[]>([]);
  const [external, setExternal] = useState<StudentLocation[]>([]);

  useEffect(() => {
    // Simulate fetching Mapdata from backend
    setBusLocations(Mapdata.buses);
    setStudentLocations(Mapdata.students);
    setExternal(Mapdata.external);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsUserLocation={true}
        initialRegion={{
          latitude: 5.6037,
          longitude: -0.1870,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } as Region}
      >
        {busLocations.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
            title={bus.id}
            description={bus.route}
          >
            <View style={styles.busMarker}>
              <FontAwesome name="bus" size={40} color="black" />
            </View>
          </Marker>
        ))}
        {studentLocations.map((student) => (
          <Marker
            key={student.id}
            coordinate={{ latitude: student.latitude, longitude: student.longitude }}
            title={student.name}
            description={`Student ID: ${student.id}`}
            pinColor="blue"
          >
            <View style={styles.busMarker}>
              <FontAwesome name="child" size={40} color="black" />
            </View>
          </Marker>
        ))}
                {external.map((student) => (
          <Marker
            key={student.id}
            coordinate={{ latitude: student.latitude, longitude: student.longitude }}
            title={student.name}
            description={`Number Plate: ${student.id}`}
            pinColor="blue"
          >
            <View style={styles.busMarker}>
<AntDesign name="car" size={24} color="black" /> 

              {/* <FontAwesome name="child" size={40} color="black" /> */}
            </View>
          </Marker>
        ))}

      </MapView>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  busMarker: {
    backgroundColor: 'white', // optional, to make the icon more visible
    padding: 5,
    borderRadius: 10,
  },
});
