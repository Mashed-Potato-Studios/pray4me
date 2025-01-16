import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Prayer, getPrayers, getFeaturedPrayers, likePrayer } from "@/lib/prayers";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get('window');
const CLOUD_SIZES = [0.8, 1, 1.2]; // Size multipliers for variety

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [prayers, setPrayers] = useState([]);
  const [featuredPrayers, setFeaturedPrayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrayers();
  }, []);

  const loadPrayers = async () => {
    try {
      const [allPrayers, featured] = await Promise.all([
        getPrayers(20),
        getFeaturedPrayers(3)
      ]);
      
      setPrayers(allPrayers.documents);
      setFeaturedPrayers(featured.documents);
    } catch (error) {
      console.error('Error loading prayers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLikePrayer = async (prayerId: string) => {
    try {
      await likePrayer(prayerId);
      // Reload prayers to update the UI
      loadPrayers();
    } catch (error) {
      console.error('Error liking prayer:', error);
    }
  };

  const getRandomCloudSize = () => CLOUD_SIZES[Math.floor(Math.random() * CLOUD_SIZES.length)];

  const renderFeaturedPrayer = (prayer: Prayer, index: number) => (
    <Animated.View
      entering={FadeInDown.delay(index * 200)}
      key={prayer.id}
      className="mb-4"
    >
      <TouchableOpacity
        onPress={() => router.push(`/prayers/${prayer.id}`)}
        className="overflow-hidden bg-black rounded-3xl mx-4"
      >
        <View className="p-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="bg-white/10 px-4 py-1.5 rounded-full">
              <Text className="text-white text-xs font-medium tracking-wide">
                FEATURED
              </Text>
            </View>
            <View className="flex-row items-center space-x-4">
              <View className="flex-row items-center space-x-2">
                <Ionicons name="people" size={16} color="white" />
                <Text className="text-white text-sm font-medium">
                  {prayer.prayerCount}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => handleLikePrayer(prayer.id)}
                className="flex-row items-center space-x-2"
              >
                <Ionicons name="heart" size={16} color="white" />
                <Text className="text-white text-sm font-medium">
                  {prayer.likeCount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Text className="text-white font-bold text-2xl mb-3 tracking-tight" numberOfLines={2}>
            {prayer.title}
          </Text>
          
          <Text className="text-white/70 text-base leading-6" numberOfLines={3}>
            {prayer.description}
          </Text>
          
          <View className="flex-row items-center mt-6">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-white/10 items-center justify-center">
                <Ionicons name="arrow-forward" size={18} color="white" />
              </View>
              <Text className="text-white text-sm font-medium ml-3">
                Pray Now
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderPrayerCloud = (prayer: Prayer, index: number) => {
    const size = getRandomCloudSize();
    const cloudWidth = width * 0.45 * size;
    
    return (
      <Animated.View 
        entering={FadeInDown.delay(index * 100)}
        key={prayer.id}
        style={{
          width: cloudWidth,
          marginHorizontal: 8,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push(`/prayers/${prayer.id}`)}
          className="overflow-hidden rounded-3xl"
        >
          <BlurView intensity={80} tint="light" className="p-4">
            <View className="items-center">
              <View className="bg-white/30 p-2 rounded-full mb-2">
                <Ionicons name="cloud" size={24} color="#000" />
              </View>
              <Text className="font-bold text-black text-center mb-1" numberOfLines={2}>
                {prayer.title}
              </Text>
              <Text className="text-sm text-black/70 text-center" numberOfLines={3}>
                {prayer.description}
              </Text>
              <View className="flex-row items-center mt-3 space-x-4">
                <View className="flex-row items-center space-x-2">
                  <Ionicons name="people" size={16} color="#000" />
                  <Text className="text-xs text-black/70">{prayer.prayerCount}</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => handleLikePrayer(prayer.id)}
                  className="flex-row items-center space-x-2"
                >
                  <Ionicons name="heart" size={16} color="#000" />
                  <Text className="text-xs text-black/70">{prayer.likeCount}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Header />
      
      <ScrollView className="flex-1">
        <View className="px-4 py-3">
          <Search
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search prayer requests..."
          />
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <>
            {/* Featured Prayers Section */}
            {featuredPrayers.length > 0 && (
              <View key="featured-section" className="mb-8">
                <Text className="px-4 text-xl font-bold text-black mb-4">
                  Featured Prayers
                </Text>
                {featuredPrayers.map((prayer) => renderFeaturedPrayer(prayer, featuredPrayers.indexOf(prayer)))}
              </View>
            )}

            {/* All Prayers Grid */}
            <View key="all-prayers-section" className="flex-1 px-2">
              <Text className="px-2 text-xl font-bold text-black mb-4">
                All Prayers
              </Text>
              <View className="flex-row flex-wrap justify-center">
                {prayers.map((prayer) => renderPrayerCloud(prayer, prayers.indexOf(prayer)))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
