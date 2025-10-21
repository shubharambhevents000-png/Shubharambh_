import {
  Heart,
  Sparkles,
  Flower,
  Camera,
  Music,
  Utensils,
  CheckCircle,
  Users,
  Calendar,
  Award,
} from "lucide-react";

export interface ServiceFeature {
  icon: any;
  title: string;
  description: string;
}

export interface SubService {
  name: string;
  description: string;
  image: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  icon: any;
  color: string;
  features: ServiceFeature[];
  detailImage: string;
  detailTitle: string;
  detailDescription: string;
  subServices: SubService[];
  ctaText: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "1",
    name: "Wedding Planning",
    slug: "wedding-planning",
    title: "Complete Wedding Planning Services",
    description:
      "From engagement to reception, we handle every detail of your special day",
    heroImage:
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heroTitle: "Dream Wedding Planning",
    heroSubtitle: "Creating magical moments that last a lifetime",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    features: [
      {
        icon: CheckCircle,
        title: "Wedding Checklist",
        description:
          "Comprehensive planning checklist to ensure nothing is missed on your big day",
      },
      {
        icon: Users,
        title: "Contact Vendors",
        description:
          "Access to our network of trusted and verified wedding vendors",
      },
      {
        icon: Calendar,
        title: "Budget Management",
        description:
          "Smart budget tracking and management tools for your wedding expenses",
      },
      {
        icon: Award,
        title: "Hire Wedding Professionals",
        description:
          "Connect with experienced wedding planners and coordinators",
      },
    ],
    detailImage:
      "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1920",
    detailTitle: "Your Perfect Wedding, Perfectly Planned",
    detailDescription:
      "We understand that your wedding day is one of the most important days of your life. Our expert team works tirelessly to ensure every detail is perfect, from the initial planning stages to the final send-off. With years of experience and a passion for creating unforgettable moments, we transform your vision into reality. Let us handle the stress while you enjoy every moment of your special day.",
    subServices: [
      {
        name: "Wedding Venue",
        description:
          "Stunning venues for ceremonies and receptions, from intimate gardens to grand ballrooms",
        image:
          "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Wedding Caterers",
        description:
          "Exquisite cuisine and professional catering services for your wedding feast",
        image:
          "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Entertainment",
        description:
          "Live music, DJs, and entertainment to keep your guests dancing all night",
        image:
          "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Photographer",
        description:
          "Professional photography and videography to capture every precious moment",
        image:
          "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    ctaText: "Start Planning Your Dream Wedding",
  },
  {
    id: "2",
    name: "Birthday & Baby Shower",
    slug: "birthday-baby-shower",
    title: "Birthday & Baby Shower Celebrations",
    description:
      "Memorable celebrations for life's special milestones and moments",
    heroImage:
      "https://m.media-amazon.com/images/I/71IC2lqIgdL._AC_UF1000,1000_QL80_.jpg",
    heroTitle: "Celebrate Every Milestone",
    heroSubtitle: "Creating joyful memories for birthdays and baby showers",
    icon: Sparkles,
    color: "from-purple-500 to-indigo-500",
    features: [
      {
        icon: CheckCircle,
        title: "Theme Planning",
        description: "Creative theme selection and design for your celebration",
      },
      {
        icon: Users,
        title: "Guest Coordination",
        description:
          "Seamless management of invitations and guest arrangements",
      },
      {
        icon: Calendar,
        title: "Event Timeline",
        description: "Detailed schedule planning for a smooth celebration",
      },
      {
        icon: Award,
        title: "Entertainment Setup",
        description: "Fun activities and entertainment for all age groups",
      },
    ],
    detailImage:
      "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1920",
    detailTitle: "Make Every Birthday & Baby Shower Special",
    detailDescription:
      "Birthdays and baby showers are precious moments that deserve to be celebrated in style. Our creative team specializes in designing themed parties that reflect your personality and create lasting memories. From intimate gatherings to grand celebrations, we handle every detail with care and creativity. Let us bring your vision to life with our expertise in party planning and decoration.",
    subServices: [
      {
        name: "Theme Decoration",
        description:
          "Custom themed decorations tailored to your celebration style",
        image:
          "https://images.pexels.com/photos/2072130/pexels-photo-2072130.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Catering Services",
        description: "Delicious food and beverage arrangements for your guests",
        image:
          "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Entertainment",
        description:
          "Games, activities, and entertainment for memorable celebrations",
        image:
          "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Photography",
        description: "Capture precious moments with professional photography",
        image:
          "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    ctaText: "Plan Your Celebration",
  },
  {
    id: "3",
    name: "Rangoli & Floral",
    slug: "rangoli-floral",
    title: "Rangoli & Floral Arrangements",
    description:
      "Traditional and modern decorative arrangements for all occasions",
    heroImage:
      "https://d1msew97rp2nin.cloudfront.net/prodin/phool/plpimages/design-for-diwali-rangoli-1728453297509-c4b5e00c-ba41-4bfd-a465-bc79a4fcf708.webp",
    heroTitle: "Beautiful Rangoli & Floral Designs",
    heroSubtitle: "Traditional artistry meets modern elegance",
    icon: Flower,
    color: "from-orange-500 to-yellow-500",
    features: [
      {
        icon: CheckCircle,
        title: "Custom Designs",
        description:
          "Unique rangoli patterns and floral arrangements tailored to your event",
      },
      {
        icon: Users,
        title: "Expert Artists",
        description:
          "Skilled artists specializing in traditional and contemporary designs",
      },
      {
        icon: Calendar,
        title: "Timely Setup",
        description: "Professional installation before your event begins",
      },
      {
        icon: Award,
        title: "Premium Materials",
        description:
          "High-quality materials and fresh flowers for lasting beauty",
      },
    ],
    detailImage:
      "https://images.pexels.com/photos/1071878/pexels-photo-1071878.jpeg?auto=compress&cs=tinysrgb&w=1920",
    detailTitle: "Artistic Expressions for Your Special Day",
    detailDescription:
      "Rangoli and floral decorations add a touch of elegance and tradition to any celebration. Our talented artists create stunning designs that blend traditional patterns with modern aesthetics. Whether you prefer classic rangoli designs or contemporary floral arrangements, we bring artistic excellence to your events. Each creation is carefully crafted to complement your venue and theme.",
    subServices: [
      {
        name: "Rangoli Designs",
        description:
          "Traditional and contemporary rangoli patterns for entrances and venues",
        image:
          "https://images.pexels.com/photos/3054973/pexels-photo-3054973.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Floral Arrangements",
        description: "Beautiful fresh flower decorations for all occasions",
        image:
          "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Traditional Decor",
        description:
          "Authentic traditional decorative elements for cultural events",
        image:
          "https://images.pexels.com/photos/1544947/pexels-photo-1544947.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Modern Styling",
        description:
          "Contemporary floral and decorative styling for modern events",
        image:
          "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    ctaText: "Get Custom Design Quote",
  },
  {
    id: "4",
    name: "Professional Photography",
    slug: "professional-photography",
    title: "Professional Photography Services",
    description: "Capture every precious moment with our expert photographers",
    heroImage:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heroTitle: "Professional Event Photography",
    heroSubtitle: "Preserving your memories with artistic excellence",
    icon: Camera,
    color: "from-blue-500 to-cyan-500",
    features: [
      {
        icon: CheckCircle,
        title: "HD Photography",
        description:
          "High-resolution photography capturing every detail perfectly",
      },
      {
        icon: Users,
        title: "Experienced Team",
        description:
          "Professional photographers with years of event experience",
      },
      {
        icon: Calendar,
        title: "Full Coverage",
        description: "Complete event coverage from start to finish",
      },
      {
        icon: Award,
        title: "Quick Delivery",
        description: "Fast editing and delivery of your beautiful photographs",
      },
    ],
    detailImage:
      "https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=1920",
    detailTitle: "Capturing Moments That Last Forever",
    detailDescription:
      "Our professional photography team specializes in capturing the essence and emotion of your special events. With state-of-the-art equipment and an artistic eye, we document every important moment, from candid shots to formal portraits. We believe that great photography tells a story, and we're dedicated to telling yours beautifully. Trust us to create a stunning visual narrative of your celebration.",
    subServices: [
      {
        name: "Wedding Photography",
        description:
          "Comprehensive wedding photography packages with candid and formal shots",
        image:
          "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Event Coverage",
        description:
          "Professional coverage for corporate events, parties, and celebrations",
        image:
          "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Portrait Sessions",
        description: "Individual and family portrait photography sessions",
        image:
          "https://images.pexels.com/photos/1122528/pexels-photo-1122528.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Video Services",
        description: "Cinematic video production and live streaming services",
        image:
          "https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    ctaText: "Book Your Photography Session",
  },
  {
    id: "5",
    name: "DJ & Sound Systems",
    slug: "dj-sound-systems",
    title: "DJ & Professional Sound Systems",
    description:
      "Professional audio equipment and entertainment for unforgettable events",
    heroImage:
      "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heroTitle: "Premium DJ & Sound Solutions",
    heroSubtitle: "Bringing energy and excitement to your celebration",
    icon: Music,
    color: "from-green-500 to-emerald-500",
    features: [
      {
        icon: CheckCircle,
        title: "Professional DJs",
        description: "Experienced DJs who know how to keep the party going",
      },
      {
        icon: Users,
        title: "Custom Playlists",
        description:
          "Personalized music selection matching your taste and theme",
      },
      {
        icon: Calendar,
        title: "Sound Setup",
        description: "Professional audio equipment setup and management",
      },
      {
        icon: Award,
        title: "Lighting Effects",
        description: "Dynamic lighting systems to enhance the atmosphere",
      },
    ],
    detailImage:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1920",
    detailTitle: "Set the Perfect Mood with Music",
    detailDescription:
      "Music is the heartbeat of any celebration, and our DJ and sound services ensure your event has the perfect rhythm. Our professional DJs bring years of experience reading crowds and creating the right atmosphere. With top-of-the-line sound systems and lighting equipment, we deliver an immersive audio-visual experience that keeps your guests entertained and engaged throughout your event.",
    subServices: [
      {
        name: "DJ Services",
        description:
          "Professional DJs for weddings, parties, and corporate events",
        image:
          "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Sound Systems",
        description: "High-quality audio equipment rental and setup",
        image:
          "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Lighting",
        description: "Professional stage and ambient lighting solutions",
        image:
          "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Live Music",
        description: "Live bands and musicians for sophisticated entertainment",
        image:
          "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    ctaText: "Book Your DJ & Sound Package",
  },
  {
    id: "6",
    name: "Catering Services",
    slug: "catering-services",
    title: "Professional Catering Services",
    description:
      "Delicious cuisine and professional catering for all types of events",
    heroImage:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heroTitle: "Exquisite Catering Services",
    heroSubtitle: "Delighting your guests with culinary excellence",
    icon: Utensils,
    color: "from-red-500 to-pink-500",
    features: [
      {
        icon: CheckCircle,
        title: "Menu Customization",
        description:
          "Personalized menus tailored to your preferences and dietary needs",
      },
      {
        icon: Users,
        title: "Expert Chefs",
        description:
          "Skilled chefs preparing delicious and visually appealing dishes",
      },
      {
        icon: Calendar,
        title: "Professional Service",
        description: "Courteous and efficient service staff for your event",
      },
      {
        icon: Award,
        title: "Quality Ingredients",
        description: "Fresh, high-quality ingredients for the best taste",
      },
    ],
    detailImage:
      "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=1920",
    detailTitle: "Culinary Excellence for Every Occasion",
    detailDescription:
      "Great food is essential to any successful event, and our catering services deliver excellence in every dish. Our experienced chefs create menus that delight the palate while our professional service staff ensures a seamless dining experience. From traditional cuisines to contemporary fusion, we offer diverse options to suit any taste and dietary requirement. Let us make your event memorable with our exceptional culinary offerings.",
    subServices: [
      {
        name: "Multi-Cuisine",
        description:
          "Diverse menu options including Indian, Chinese, Continental, and more",
        image:
          "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Live Counters",
        description: "Interactive live cooking stations and food counters",
        image:
          "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Traditional Food",
        description: "Authentic traditional cuisines for cultural celebrations",
        image:
          "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        name: "Modern Presentation",
        description: "Contemporary plating and presentation styles",
        image:
          "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    ctaText: "Request Catering Quote",
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((service) => service.slug);
}
