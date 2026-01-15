
export type UserRole = 'RESTAURANT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  whatsappNumber?: string;
  createdAt: string;
  status: 'TRIAL' | 'ACTIVE' | 'CANCELLED' | 'UNPAID';
  trialEndsAt: string;
  isUnlimited?: boolean;
}

export interface Message {
  id: string;
  sender: 'CUSTOMER' | 'AI' | 'HUMAN';
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerPhone: string;
  lastMessage: string;
  lastTimestamp: string;
  status: 'PENDING' | 'RESOLVED';
  messages: Message[];
}

export interface RestaurantInfo {
  name: string;
  hours: string;
  address: string;
  phone: string;
  website: string;
  bookingUrl: string;
  menuText: string;
  menuPdf?: string;
  allergensInfo: string;
  allergensPdf?: string;
  faqs: { question: string; answer: string }[];
  services: { title: string; description: string; price: string; pdf?: string }[];
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'PAID' | 'PENDING';
  url: string;
}

export interface PlatformConfig {
  companyName: string;
  taxId: string;
  address: string;
  email: string;
  bankAccount: string;
  bankHolder: string;
}

export interface PlatformMetrics {
  activeRestaurants: number;
  trialRestaurants: number;
  totalMessages: number;
  automatedRate: number;
  totalRevenue: number;
  timeSavedHours: number;
}
