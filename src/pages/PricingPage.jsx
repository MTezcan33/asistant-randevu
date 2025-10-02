import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  ArrowLeft, 
  MessageCircle, 
  Star, 
  Zap, 
  Shield,
  Crown,
  Rocket
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Deneme",
      price: "Ücretsiz",
      period: "14 gün",
      description: "Sistemi test etmek için ideal",
      features: [
        "50 randevu/ay",
        "1 takvim",
        "Temel WhatsApp entegrasyonu",
        "E-posta desteği",
        "Temel raporlar"
      ],
      limitations: [
        "Sınırlı randevu sayısı",
        "Temel özellikler"
      ],
      popular: false,
      cta: "Ücretsiz Başla",
      color: "gray",
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: "Standart", 
      price: "₺299",
      period: "/ay",
      description: "Küçük ve orta işletmeler için",
      features: [
        "Sınırsız randevu",
        "1 takvim",
        "Gelişmiş AI asistan",
        "Telefon + e-posta desteği",
        "Randevu hatırlatmaları",
        "Detaylı raporlar",
        "SMS bildirimleri",
        "Temel entegrasyonlar"
      ],
      limitations: [],
      popular: true,
      cta: "Hemen Başla",
      color: "blue",
      icon: <Star className="w-6 h-6" />
    },
    {
      name: "Pro",
      price: "₺599", 
      period: "/ay",
      description: "Büyük işletmeler ve zincirler için",
      features: [
        "Sınırsız randevu",
        "Çoklu takvim (5 adete kadar)",
        "Çok dilli AI (TR/EN/UKR)",
        "Öncelikli 7/24 destek",
        "Gelişmiş analitik raporlar",
        "API entegrasyonu",
        "Özel eğitim ve kurulum",
        "Beyaz etiket çözümü",
        "Çoklu lokasyon desteği",
        "Özel alan adı"
      ],
      limitations: [],
      popular: false,
      cta: "Pro'ya Geç",
      color: "purple",
      icon: <Crown className="w-6 h-6" />
    }
  ];

  const handleSelectPlan = (planName) => {
    toast({
      title: `${planName} Planı Seçildi`,
      description: "🚧 Ödeme işlemi henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
    });
  };

  const faqs = [
    {
      question: "Ücretsiz deneme süresi var mı?",
      answer: "Evet! 14 gün boyunca tüm özellikleri ücretsiz deneyebilirsiniz. Kredi kartı bilgisi gerekmez."
    },
    {
      question: "WhatsApp entegrasyonu nasıl çalışır?",
      answer: "WhatsApp Business API kullanarak müşterilerinizle otomatik konuşmalar gerçekleştiriyoruz. Kurulum tamamen bizim tarafımızdan yapılır."
    },
    {
      question: "Planımı istediğim zaman değiştirebilir miyim?",
      answer: "Tabii ki! Planınızı istediğiniz zaman yükseltebilir veya düşürebilirsiniz. Değişiklik hemen geçerli olur."
    },
    {
      question: "Hangi dilleri destekliyorsunuz?",
      answer: "Standart planda Türkçe, Pro planda ise Türkçe, İngilizce ve Ukraynaca desteklenmektedir."
    },
    {
      question: "Teknik destek nasıl alırım?",
      answer: "E-posta, telefon ve canlı chat üzerinden 7/24 destek sağlıyoruz. Pro plan müşterilerimize öncelikli destek veriyoruz."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Fiyatlandırma - RandevuBot</title>
        <meta name="description" content="WhatsApp randevu sistemi fiyatları. İhtiyacınıza uygun planı seçin ve hemen başlayın." />
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
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              İhtiyacınıza Uygun 
              <span className="gradient-text block">Planı Seçin</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              WhatsApp destekli AI randevu sistemi ile işinizi büyütün. 
              14 gün ücretsiz deneme ile risk almadan başlayın.
            </p>
            
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>14 gün ücretsiz</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Kredi kartı gerekmez</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>İstediğiniz zaman iptal</span>
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className={`h-full relative ${
                  plan.popular 
                    ? 'border-2 border-blue-500 shadow-2xl scale-105' 
                    : 'border shadow-lg hover:shadow-xl transition-shadow'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white px-6 py-2 text-sm font-medium">
                        🔥 En Popüler
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      plan.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {plan.icon}
                    </div>
                    
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600 mb-4">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="space-y-2">
                      <div className="text-5xl font-bold text-gray-900">
                        {plan.price}
                      </div>
                      <div className="text-gray-500">{plan.period}</div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-sm font-medium text-gray-500 mb-2">Sınırlamalar:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="text-sm text-gray-500">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => handleSelectPlan(plan.name)}
                      className={`w-full text-lg py-6 ${
                        plan.popular 
                          ? 'whatsapp-green text-white hover:bg-green-700' 
                          : plan.color === 'purple'
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {plan.cta}
                      {plan.popular && <Rocket className="w-5 h-5 ml-2" />}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <Card className="overflow-hidden">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Özellik Karşılaştırması</CardTitle>
                <CardDescription>Planlar arasındaki farkları detaylı inceleyin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Özellik</th>
                        <th className="text-center p-4 font-medium">Deneme</th>
                        <th className="text-center p-4 font-medium">Standart</th>
                        <th className="text-center p-4 font-medium">Pro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "Aylık Randevu Sayısı", deneme: "50", standart: "Sınırsız", pro: "Sınırsız" },
                        { feature: "Takvim Sayısı", deneme: "1", standart: "1", pro: "5" },
                        { feature: "AI Asistan", deneme: "Temel", standart: "Gelişmiş", pro: "Çok Dilli" },
                        { feature: "WhatsApp Entegrasyonu", deneme: "✓", standart: "✓", pro: "✓" },
                        { feature: "Randevu Hatırlatmaları", deneme: "✗", standart: "✓", pro: "✓" },
                        { feature: "Detaylı Raporlar", deneme: "✗", standart: "✓", pro: "✓" },
                        { feature: "API Entegrasyonu", deneme: "✗", standart: "✗", pro: "✓" },
                        { feature: "Çoklu Lokasyon", deneme: "✗", standart: "✗", pro: "✓" },
                        { feature: "Öncelikli Destek", deneme: "✗", standart: "✗", pro: "✓" }
                      ].map((row, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{row.feature}</td>
                          <td className="p-4 text-center">{row.deneme}</td>
                          <td className="p-4 text-center">{row.standart}</td>
                          <td className="p-4 text-center">{row.pro}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sıkça Sorulan Sorular
              </h2>
              <p className="text-xl text-gray-600">
                Merak ettiğiniz soruların cevapları
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">
                  Hemen Başlamaya Hazır mısınız?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  14 gün ücretsiz deneme ile risk almadan sistemi test edin
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/register')}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
                  >
                    Ücretsiz Denemeyi Başlat
                  </Button>
                  <Button 
                    onClick={() => navigate('/support')}
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
                  >
                    Satış Danışmanı ile Görüş
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;