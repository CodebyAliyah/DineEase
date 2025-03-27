import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import styles from './SupportStyle';
import {faqs} from '../../constants/faqs';
const SupportScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <ScreenLayout topbarProps="Support" showBackButton={true}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>SupportScreen</Text>

        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        {faqs.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleFAQ(index)}>
              <Text style={styles.questionText}>{item.question}</Text>
            </TouchableOpacity>

            {expandedIndex === index && (
              <Text style={styles.answerText}>{item.answer}</Text>
            )}
          </View>
        ))}
      </View>
    </ScreenLayout>
  );
};

export default SupportScreen;
