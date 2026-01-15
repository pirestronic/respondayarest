
import React from 'react';
import { LayoutDashboard, MessageSquare, Settings, CreditCard, PieChart, Users, FileText, Gift } from 'lucide-react';
import { Conversation } from './types';

export const COLORS = {
  primary: '#059669', // Emerald-600
  secondary: '#0f172a', // Slate-900
};

export const COMMON_QUESTIONS = [
  "¿Admitís mascotas?",
  "¿Tenéis opciones sin gluten?",
  "¿Tenéis opciones veganas?",
  "¿Hay terraza disponible?",
  "¿Es necesario reservar?",
  "¿Tenéis tronas para niños?",
  "¿Cuál es el plato estrella?",
  "¿Hay parking cerca?",
  "¿Tenéis menú del día?",
  "¿Se puede celebrar eventos privados?",
  "¿Cuál es el precio medio por persona?",
  "¿Tenéis opciones para alérgicos a los frutos secos?",
  "¿Aceptáis pagos con American Express?",
  "¿Tenéis zona de juegos para niños?",
  "¿Hacéis comida para llevar?"
];

export const MOCK_RESTAURANT_INFO = {
  name: "Casa Paco",
  hours: "Lunes a Viernes de 13:00 a 16:00 y 20:00 a 23:00. Sábados de 13:00 a 17:00.",
  address: "Calle Mayor 123, Madrid",
  phone: "+34 600 000 000",
  website: "www.casapaco.es",
  bookingUrl: "www.casapaco.es/reservas",
  menuText: "Nuestros platos estrella son el Cocido Madrileño y las Croquetas de Jamón. Tenemos menú del día por 15€.",
  menuPdf: "carta_casa_paco_2024.pdf",
  allergensInfo: "Disponemos de opciones sin gluten y sin lactosa previa consulta al camarero.",
  allergensPdf: "alergenos_v1.pdf",
  faqs: [
    { question: "¿Aceptáis mascotas?", answer: "Sí, admitimos mascotas en nuestra zona de terraza." },
    { question: "¿Tenéis terraza?", answer: "Sí, disponemos de una amplia terraza climatizada." }
  ],
  services: [
    { title: "Cata de Vinos", description: "Cata de 5 vinos de la región con maridaje.", price: "35€/persona", pdf: "detalle_cata.pdf" }
  ]
};

// Fixed: Added explicit Conversation[] type to ensure string literals like 'PENDING', 'RESOLVED', 'CUSTOMER', and 'AI'
// are correctly typed as union members instead of generic strings, which resolves the assignability error in App.tsx.
export const MOCK_CHATS: Conversation[] = [
  {
    id: '1',
    customerName: 'Juan Pérez',
    customerPhone: '+34 611 222 333',
    lastMessage: '¿Tenéis mesa para hoy a las 14:00?',
    lastTimestamp: '10:30',
    status: 'PENDING',
    messages: [
      { id: 'm1', sender: 'CUSTOMER', text: 'Hola, ¿qué tal?', timestamp: '10:25', isRead: true },
      { id: 'm2', sender: 'AI', text: 'Hola 😊 Gracias por contactar con Casa Paco. ¿En qué podemos ayudarte?', timestamp: '10:25', isRead: true },
      { id: 'm3', sender: 'CUSTOMER', text: '¿Tenéis mesa para hoy a las 14:00?', timestamp: '10:30', isRead: true }
    ]
  },
  {
    id: '2',
    customerName: 'Maria Garcia',
    customerPhone: '+34 622 333 444',
    lastMessage: 'Muchas gracias por la información.',
    lastTimestamp: '09:15',
    status: 'RESOLVED',
    messages: [
      { id: 'm4', sender: 'CUSTOMER', text: '¿Cuál es vuestro horario?', timestamp: '09:10', isRead: true },
      { id: 'm5', sender: 'AI', text: 'Hola 😊 Gracias por contactar con Casa Paco. Nuestro horario es Lunes a Viernes de 13:00 a 16:00 y 20:00 a 23:00. Sábados de 13:00 a 17:00.', timestamp: '09:11', isRead: true },
      { id: 'm6', sender: 'CUSTOMER', text: 'Muchas gracias por la información.', timestamp: '09:15', isRead: true }
    ]
  }
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Resumen', icon: LayoutDashboard },
  { id: 'messages', label: 'Mensajes', icon: MessageSquare },
  { id: 'config', label: 'Datos Negocio', icon: Settings },
  { id: 'services', label: 'Servicios/Extras', icon: Gift },
  { id: 'billing', label: 'Facturación', icon: CreditCard },
];

export const ADMIN_NAV_ITEMS = [
  { id: 'admin-dashboard', label: 'Global', icon: PieChart },
  { id: 'admin-users', label: 'Restaurantes', icon: Users },
  { id: 'admin-revenue', label: 'Ingresos', icon: CreditCard },
  { id: 'admin-config', label: 'Datos Fiscales', icon: FileText },
];
