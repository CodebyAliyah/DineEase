import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout'; // <-- Adjust path if needed

const SupportScreen = () => {
  // Track which FAQ is currently expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Sample FAQ data
  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Simply select your items, add them to the cart, and proceed to checkout.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, and other popular payment methods.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is placed, you can track its status from the Orders screen.',
    },
    {
      question: 'Can I cancel or modify my order?',
      answer: 'Yes, you can cancel or modify your order before it’s confirmed by the restaurant.',
    },
  ];

  const toggleFAQ = (index: number) => {
    // If the user taps the same FAQ, collapse it. Otherwise, expand the newly tapped FAQ.
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    color: '#FF6A6A',
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  answerText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    lineHeight: 20,
  },
});
