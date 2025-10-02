import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageCircle, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle,
  BookOpen,
  Video,
  Users,
  Headphones
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SupportPage = () => {
  const handleContactSupport = (method) => {
    toast({
      title: `${method} Desteği`,
      description: "🚧 Destek kanalları henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
    });
  };

  const supportOptions = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Canlı Chat",
      description: "Anında destek için canlı chat kullanın",
      availability: "7/24 Aktif",
      action: "Chat Başlat",
      color: "green"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Telefon Desteği",
      description: "Doğrudan telefon ile iletişime geçin",
      availability: "09:00 - 18:00",
      action: "Ara: +90 850 XXX XX XX",
      color: "blue"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "E-posta Desteği",
      description: "Detaylı sorularınız için e-posta gönderin",
      availability: "24 saat içinde yanıt",
      action: "E-posta Gönder",
      color: "purple"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Görüşme",
      description: "Ekran paylaşımı ile teknik destek",
      availability: "Randevu ile",
      action: "Randevu Al",
      color: "orange"
    }
  ];

  const faqCategories = [
    {
      title: "Başlangıç",
      icon: <BookOpen className="w-6 h-6" />,
      questions: [
        "Sistemi nasıl kurarım?",
        "WhatsApp entegrasyonu nasıl yapılır?",
        "İlk randevumu nasıl oluştururum?",
        "Firma bilgilerimi nasıl güncellerim?"
      ]
    },
    {
      title: "Randevu Yönetimi",
      icon: <Clock className="w-6 h-6" />,
      questions: [
        "Randevu saatlerimi nasıl ayarlarım?",
        "Tatil günlerini nasıl belirlerim?",
        "Randevu iptallerini nasıl yönetirim?",
        "Müşteri bilgilerini nasıl görürüm?"
      ]
    },
    {
      title: "Teknik Sorunlar",
      icon: <HelpCircle className="w-6 h-6" />,
      questions: [
        "WhatsApp mesajları gelmiyor",
        "Takvim senkronizasyonu sorunu",
        "Giriş yapamıyorum",
        "Ödeme sorunları"
      ]
    },
    {
      title: "Faturalama",
      icon: <Users className="w-6 h-6" />,
      questions: [
        "Planımı nasıl değiştirebilirim?",
        "Fatura bilgilerimi nasıl güncellerim?",
        "İptal işlemi nasıl yapılır?",
        "Geri ödeme politikası nedir?"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Destek - RandevuBot</title>
        <meta name="description" content="RandevuBot destek merkezi. Sorularınız için bizimle iletişime geçin." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <span className="text-xl font-bold gradient-text">RandevuBot</span>
              </Link>
              
              <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ana sayfaya dön
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Size Nasıl 
              <span className="gradient-text block">Yardımcı Olabiliriz?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              RandevuBot ekibi olarak size en iyi desteği sağlamak için buradayız. 
              Sorularınız için bizimle iletişime geçin.
            </p>
          </motion.div>

          {/* Support Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      option.color === 'green' ? 'bg-green-100 text-green-600 group-hover:bg-green-200' :
                      option.color === 'blue' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
                      option.color === 'purple' ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-200' :
                      'bg-orange-100 text-orange-600 group-hover:bg-orange-200'
                    } transition-colors`}>
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-sm text-gray-500">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {option.availability}
                    </div>
                    <Button 
                      onClick={() => handleContactSupport(option.title)}
                      className={`w-full ${
                        option.color === 'green' ? 'whatsapp-green text-white' :
                        option.color === 'blue' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                        option.color === 'purple' ? 'bg-purple-600 text-white hover:bg-purple-700' :
                        'bg-orange-600 text-white hover:bg-orange-700'
                      }`}
                    >
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Sıkça Sorulan Sorular
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                En çok merak edilen konular ve cevapları
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {faqCategories.map((category, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        {category.icon}
                      </div>
                      <span>{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.questions.map((question, qIndex) => (
                        <li key={qIndex}>
                          <button 
                            onClick={() => toast({ title: "🚧 FAQ detayları henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀" })}
                            className="text-left text-gray-700 hover:text-blue-600 transition-colors"
                          >
                            • {question}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Knowledge Base */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl font-bold mb-4">
                  Bilgi Bankası
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Detaylı kılavuzlar, video eğitimler ve adım adım talimatlar
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => toast({ title: "🚧 Bilgi bankası henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀" })}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Kılavuzları İncele
                  </Button>
                  <Button 
                    onClick={() => toast({ title: "🚧 Video eğitimler henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀" })}
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Video Eğitimler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Teknik Destek</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-1 text-sm">
                  <p className="text-gray-600">7/24 teknik destek</p>
                  <p className="font-medium">support@randevubot.com</p>
                  <p className="font-medium">+90 850 XXX XX XX</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Satış Danışmanlığı</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-1 text-sm">
                  <p className="text-gray-600">Plan seçimi ve demo</p>
                  <p className="font-medium">sales@randevubot.com</p>
                  <p className="font-medium">+90 850 XXX XX XX</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Genel İletişim</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-1 text-sm">
                  <p className="text-gray-600">Genel sorular</p>
                  <p className="font-medium">info@randevubot.com</p>
                  <p className="text-gray-500">İstanbul, Türkiye</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SupportPage;