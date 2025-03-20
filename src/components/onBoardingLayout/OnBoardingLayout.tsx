import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

const OnboardingLayout = () => {
  return (
    <View style={styles.container}>
      {/* Top Image Section */}
      <View style={styles.topSection}>
        <Image 
          source={{ uri: "https://via.placeholder.com/300" }} 
          style={styles.image} 
        />
        <TouchableOpacity style={styles.skipButton}>
          {/* Skip Button */}
        </TouchableOpacity>
      </View>

      {/* Bottom Content Section */}
      <View style={styles.bottomSection}>
        {/* Placeholder for Title, Description, and Pagination */}
        <View style={styles.pagination}>
          {/* Pagination Dots */}
        </View>
        <TouchableOpacity style={styles.nextButton}>
          {/* Next Button */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC", // Light yellowish background
  },
  topSection: {
    flex: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  skipButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pagination: {
    flexDirection: "row",
  },
  nextButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#EB5222",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingLayout;
