import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Linking,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  type: string;
  featured: boolean;
  source?: string;
  url?: string;
  entities?: {
    players: string[];
    teams: string[];
    coaches: string[];
    matches: string[];
  };
  sentiment?: {
    score: number;
    label: string;
  };
  isTransferNews?: boolean;
  importanceScore?: number;
}

interface CrawlerStats {
  total_articles: number;
  sources_count: number;
  today_articles: number;
  trending_topics: string[];
}

const NewsScreen: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [stats, setStats] = useState<CrawlerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');

  const categories = [
    { id: 'all', name: 'همه', icon: 'newspaper-outline' },
    { id: 'matches', name: 'مسابقات', icon: 'football-outline' },
    { id: 'achievements', name: 'موفقیت‌ها', icon: 'trophy-outline' },
    { id: 'training', name: 'تمرینات', icon: 'fitness-outline' },
    { id: 'events', name: 'رویدادها', icon: 'calendar-outline' },
    { id: 'transfers', name: 'انتقالات', icon: 'swap-horizontal-outline' },
  ];

  const sources = [
    { id: 'all', name: 'همه منابع', icon: 'globe-outline' },
    { id: 'academy', name: 'آکادمی AP', icon: 'home-outline' },
    { id: 'external', name: 'اخبار خارجی', icon: 'newspaper-outline' },
  ];

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, selectedSource]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      
      // Replace with your actual API endpoint
      const baseUrl = 'https://your-website.com/api/crawler-news';
      const params = new URLSearchParams({
        category: selectedCategory,
        source: selectedSource,
        limit: '20'
      });

      const response = await fetch(`${baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      setNews(data.news || []);
      setStats(data.stats);
      
    } catch (error) {
      console.error('Error fetching news:', error);
      Alert.alert('خطا', 'خطا در دریافت اخبار. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  const handleNewsPress = (item: NewsItem) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else {
      Alert.alert(item.title, item.content);
    }
  };

  const handleShare = async (item: NewsItem) => {
    try {
      const message = `${item.title}\n\n${item.excerpt}\n\n${item.url || 'آکادمی فوتبال AP'}`;
      await Share.share({
        message,
        title: item.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getSentimentColor = (sentiment?: { score: number; label: string }) => {
    if (!sentiment) return '#6B7280';
    
    switch (sentiment.label) {
      case 'positive': return '#10B981';
      case 'negative': return '#EF4444';
      case 'neutral': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getSentimentIcon = (sentiment?: { score: number; label: string }) => {
    if (!sentiment) return 'remove-outline';
    
    switch (sentiment.label) {
      case 'positive': return 'happy-outline';
      case 'negative': return 'sad-outline';
      case 'neutral': return 'remove-outline';
      default: return 'remove-outline';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : 'newspaper-outline';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 1) return 'همین الان';
    if (hours < 24) return `${hours} ساعت پیش`;
    if (days < 7) return `${days} روز پیش`;
    return date.toLocaleDateString('fa-IR');
  };

  const renderStatsCard = () => (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>آمار اخبار</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats?.total_articles || 0}</Text>
          <Text style={styles.statLabel}>کل اخبار</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats?.today_articles || 0}</Text>
          <Text style={styles.statLabel}>امروز</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats?.sources_count || 0}</Text>
          <Text style={styles.statLabel}>منابع</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats?.trending_topics?.length || 0}</Text>
          <Text style={styles.statLabel}>ترند</Text>
        </View>
      </View>
    </View>
  );

  const renderCategoryFilter = () => (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>دسته‌بندی</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.filterButton,
              selectedCategory === category.id && styles.filterButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons 
              name={category.icon as any} 
              size={20} 
              color={selectedCategory === category.id ? '#fff' : '#6B7280'} 
            />
            <Text style={[
              styles.filterButtonText,
              selectedCategory === category.id && styles.filterButtonTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderSourceFilter = () => (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>منبع</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {sources.map((source) => (
          <TouchableOpacity
            key={source.id}
            style={[
              styles.filterButton,
              selectedSource === source.id && styles.filterButtonActive
            ]}
            onPress={() => setSelectedSource(source.id)}
          >
            <Ionicons 
              name={source.icon as any} 
              size={20} 
              color={selectedSource === source.id ? '#fff' : '#6B7280'} 
            />
            <Text style={[
              styles.filterButtonText,
              selectedSource === source.id && styles.filterButtonTextActive
            ]}>
              {source.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderNewsItem = (item: NewsItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.newsCard,
        item.featured && styles.featuredNewsCard
      ]}
      onPress={() => handleNewsPress(item)}
    >
      <View style={styles.newsHeader}>
        <View style={styles.newsMetadata}>
          <Ionicons 
            name={getCategoryIcon(item.category) as any} 
            size={16} 
            color="#6B7280" 
          />
          <Text style={styles.newsSource}>{item.author}</Text>
          <Text style={styles.newsDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.newsActions}>
          {item.sentiment && (
            <Ionicons 
              name={getSentimentIcon(item.sentiment) as any} 
              size={16} 
              color={getSentimentColor(item.sentiment)} 
            />
          )}
          <TouchableOpacity onPress={() => handleShare(item)}>
            <Ionicons name="share-outline" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsExcerpt}>{item.excerpt}</Text>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {item.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Special indicators */}
      <View style={styles.newsFooter}>
        <View style={styles.newsIndicators}>
          {item.isTransferNews && (
            <View style={styles.transferBadge}>
              <Text style={styles.transferBadgeText}>انتقال</Text>
            </View>
          )}
          {item.featured && (
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.featuredBadgeText}>ویژه</Text>
            </View>
          )}
        </View>
        <Text style={styles.readTime}>{item.readTime}</Text>
      </View>

      {/* Entity tags */}
      {item.entities && (
        <View style={styles.entitiesContainer}>
          {item.entities.players.slice(0, 2).map((player, idx) => (
            <View key={idx} style={styles.entityTag}>
              <Ionicons name="person" size={12} color="#3B82F6" />
              <Text style={styles.entityText}>{player}</Text>
            </View>
          ))}
          {item.entities.teams.slice(0, 2).map((team, idx) => (
            <View key={idx} style={styles.entityTag}>
              <Ionicons name="people" size={12} color="#10B981" />
              <Text style={styles.entityText}>{team}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC2626" />
        <Text style={styles.loadingText}>در حال دریافت اخبار...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {stats && renderStatsCard()}
        {renderCategoryFilter()}
        {renderSourceFilter()}
        
        <View style={styles.newsContainer}>
          {news.map(renderNewsItem)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'IRANSans',
  },
  statsCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'IRANSans',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    fontFamily: 'IRANSans',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'IRANSans',
  },
  filterContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    fontFamily: 'IRANSans',
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  filterButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'IRANSans',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  newsContainer: {
    paddingHorizontal: 16,
  },
  newsCard: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredNewsCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  newsSource: {
    fontSize: 12,
    color: '#6B7280',
    marginHorizontal: 8,
    fontFamily: 'IRANSans',
  },
  newsDate: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'IRANSans',
  },
  newsActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 22,
    fontFamily: 'IRANSans',
  },
  newsExcerpt: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'IRANSans',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#1E40AF',
    fontFamily: 'IRANSans',
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  newsIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferBadge: {
    backgroundColor: '#F97316',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  transferBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'IRANSans',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  featuredBadgeText: {
    fontSize: 10,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'IRANSans',
  },
  readTime: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'IRANSans',
  },
  entitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  entityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
    marginBottom: 4,
  },
  entityText: {
    fontSize: 10,
    color: '#374151',
    marginLeft: 4,
    fontFamily: 'IRANSans',
  },
});

export default NewsScreen; 