import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Calendar, Brain, Globe, Clock, Users, CheckCircle, Star, Menu, X, Play, ArrowRight, Smartphone, Zap, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleGetStarted = () => {
    navigate('/register');
  };
  const handleWatchDemo = () => {
    toast({
      title: "🎬 Demo Video",
      description: "🚧 Demo video özelliği henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
    });
  };
  const features = [{
    icon: <Brain className="w-8 h-8" />,
    title: t('landing.feature_1_title'),
    description: t('landing.feature_1_desc')
  }, {
    icon: <Calendar className="w-8 h-8" />,
    title: t('landing.feature_2_title'),
    description: t('landing.feature_2_desc')
  }, {
    icon: <MessageCircle className="w-8 h-8" />,
    title: t('landing.feature_3_title'),
    description: t('landing.feature_3_desc')
  }];
  
  const sectorExamples = {
    doctor: {
      conversation: [
        { sender: "customer", message: t('landing.doctor_convo_1') }, 
        { sender: "ai", message: t('landing.doctor_convo_2') }, 
        { sender: "customer", message: t('landing.doctor_convo_3') }, 
        { sender: "ai", message: t('landing.doctor_convo_4') }
      ],
      benefits: [
        t('landing.doctor_benefit_1'), 
        t('landing.doctor_benefit_2'), 
        t('landing.doctor_benefit_3'), 
        t('landing.doctor_benefit_4')
      ]
    },
    barber: {
      conversation: [
        { sender: "customer", message: t('landing.barber_convo_1') }, 
        { sender: "ai", message: t('landing.barber_convo_2') }, 
        { sender: "customer", message: t('landing.barber_convo_3') }, 
        { sender: "ai", message: t('landing.barber_convo_4') }
      ],
      benefits: [
        t('landing.barber_benefit_1'), 
        t('landing.barber_benefit_2'), 
        t('landing.barber_benefit_3'), 
        t('landing.barber_benefit_4')
      ]
    },
    beauty: {
      conversation: [
        { sender: "customer", message: t('landing.beauty_convo_1') }, 
        { sender: "ai", message: t('landing.beauty_convo_2') }, 
        { sender: "customer", message: t('landing.beauty_convo_3') }, 
        { sender: "ai", message: t('landing.beauty_convo_4') }
      ],
      benefits: [
        t('landing.beauty_benefit_1'), 
        t('landing.beauty_benefit_2'), 
        t('landing.beauty_benefit_3'), 
        t('landing.beauty_benefit_4')
      ]
    },
    other: {
      conversation: [
        { sender: "customer", message: t('landing.other_convo_1') }, 
        { sender: "ai", message: t('landing.other_convo_2') }, 
        { sender: "customer", message: t('landing.other_convo_3') }, 
        { sender: "ai", message: t('landing.other_convo_4') }
      ],
      benefits: [
        t('landing.other_benefit_1'), 
        t('landing.other_benefit_2'), 
        t('landing.other_benefit_3'), 
        t('landing.other_benefit_4')
      ]
    }
  };

  const steps = [{
    number: "1",
    title: t('landing.step_1_title'),
    description: t('landing.step_1_desc')
  }, {
    number: "2",
    title: t('landing.step_2_title'),
    description: t('landing.step_2_desc')
  }, {
    number: "3",
    title: t('landing.step_3_title'),
    description: t('landing.step_3_desc')
  }, {
    number: "4",
    title: t('landing.step_4_title'),
    description: t('landing.step_4_desc')
  }];
  
  const pricingPlans = [{
    name: t('landing.plan_trial'),
    price: t('landing.plan_trial_price'),
    period: t('landing.plan_trial_period'),
    features: [
      t('landing.plan_trial_feature_1'), 
      t('landing.plan_trial_feature_2'), 
      t('landing.plan_trial_feature_3'), 
      t('landing.plan_trial_feature_4')
    ],
    popular: false,
    cta: t('landing.plan_trial_cta')
  }, {
    name: t('landing.plan_standard'),
    price: t('landing.plan_standard_price'),
    period: t('landing.plan_standard_period'),
    features: [
      t('landing.plan_standard_feature_1'), 
      t('landing.plan_standard_feature_2'), 
      t('landing.plan_standard_feature_3'), 
      t('landing.plan_standard_feature_4'), 
      t('landing.plan_standard_feature_5'), 
      t('landing.plan_standard_feature_6')
    ],
    popular: true,
    cta: t('landing.plan_standard_cta')
  }, {
    name: t('landing.plan_pro'),
    price: t('landing.plan_pro_price'),
    period: t('landing.plan_pro_period'),
    features: [
      t('landing.plan_pro_feature_1'), 
      t('landing.plan_pro_feature_2'), 
      t('landing.plan_pro_feature_3'), 
      t('landing.plan_pro_feature_4'), 
      t('landing.plan_pro_feature_5'), 
      t('landing.plan_pro_feature_6'), 
      t('landing.plan_pro_feature_7')
    ],
    popular: false,
    cta: t('landing.plan_pro_cta')
  }];
  
  const languages = [
    { code: 'tr', name: 'TR' },
    { code: 'en', name: 'EN' },
    { code: 'uk', name: 'UKR' },
    { code: 'de', name: 'DE' },
    { code: 'ru', name: 'RU' },
  ];

  return <>
      <Helmet>
        <title>{t('landing.title')}</title>
        <meta name="description" content={t('landing.description')} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <span className="text-xl font-bold gradient-text">Randevu Asistanı</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">{t('landing.nav_features')}</a>
                <a href="#sectors" className="text-gray-700 hover:text-blue-600 transition-colors">{t('landing.nav_sectors')}</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">{t('landing.nav_pricing')}</a>
                <Button onClick={handleGetStarted} className="whatsapp-green text-white">
                  {t('landing.nav_get_started')}
                </Button>
              </div>

              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden mobile-menu ${mobileMenuOpen ? 'open' : ''} fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50`}>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <span className="text-lg font-bold">Randevu Asistanı</span>
              </div>
              <div className="space-y-4">
                <a href="#features" className="block text-gray-700">{t('landing.nav_features')}</a>
                <a href="#sectors" className="block text-gray-700">{t('landing.nav_sectors')}</a>
                <a href="#pricing" className="block text-gray-700">{t('landing.nav_pricing')}</a>
                <Button onClick={handleGetStarted} className="w-full whatsapp-green text-white">
                  {t('landing.nav_get_started')}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 hero-pattern overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -50
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8
            }} className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {t('landing.hero_badge')}
                  </Badge>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {t('landing.hero_title_1')}
                    <span className="gradient-text block">{t('landing.hero_title_2')}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    {t('landing.hero_subtitle')}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleGetStarted} size="lg" className="whatsapp-green text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    {t('landing.hero_cta_start')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button onClick={handleWatchDemo} variant="outline" size="lg" className="text-lg px-8 py-4 rounded-xl border-2 hover:bg-gray-50">
                    <Play className="w-5 h-5 mr-2" />
                    {t('landing.hero_cta_demo')}
                  </Button>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('landing.hero_benefit_1')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('landing.hero_benefit_2')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('landing.hero_benefit_3')}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 50
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="relative">
                <div className="floating-animation">
                  <img className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl" alt="WhatsApp randevu sistemi mockup" src="https://images.unsplash.com/photo-1628611225387-c7662c2d6e6c" />
                </div>
                
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg pulse-animation">
                  <MessageCircle className="w-6 h-6" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg pulse-animation">
                  <Calendar className="w-6 h-6" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('landing.features_title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {t('landing.features_subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: index * 0.2
            }}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Sectors Section */}
        <section id="sectors" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('landing.sectors_title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                {t('landing.sectors_subtitle')}
              </p>
            </motion.div>

            <Tabs defaultValue="doctor" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                <TabsTrigger value="doctor">{t('landing.sector_tab_1')}</TabsTrigger>
                <TabsTrigger value="barber">{t('landing.sector_tab_2')}</TabsTrigger>
                <TabsTrigger value="beauty">{t('landing.sector_tab_3')}</TabsTrigger>
                <TabsTrigger value="other">{t('landing.sector_tab_4')}</TabsTrigger>
              </TabsList>

              {Object.entries(sectorExamples).map(([key, sector]) => <TabsContent key={key} value={key}>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <MessageCircle className="w-5 h-5 text-green-600" />
                          <span>{t('landing.sector_convo_title')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {sector.conversation.map((msg, index) => <div key={index} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {msg.message}
                              </div>
                            </div>)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>{t('landing.sector_benefits_title')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {sector.benefits.map((benefit, index) => <li key={index} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>)}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>)}
            </Tabs>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('landing.how_it_works_title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                {t('landing.how_it_works_subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: index * 0.2
            }} className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -z-10"></div>}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('landing.pricing_title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                {t('landing.pricing_subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: index * 0.2
            }}>
                  <Card className={`h-full relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border shadow-md'}`}>
                    {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-500 text-white px-4 py-1">
                          {t('landing.popular_badge')}
                        </Badge>
                      </div>}
                    
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="space-y-2">
                        <div className="text-4xl font-bold text-gray-900">
                          {plan.price}
                        </div>
                        <div className="text-gray-500">{plan.period}</div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>)}
                      </ul>
                      
                      <Button onClick={() => navigate('/pricing')} className={`w-full ${plan.popular ? 'whatsapp-green text-white' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                  <span className="text-xl font-bold">Randevu Asistanı</span>
                </div>
                <p className="text-gray-400">
                  WhatsApp destekli AI randevu sistemi ile işinizi otomatikleştirin.
                </p>
              </div>
              
              <div>
                <p className="font-semibold mb-4">Menü</p>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/support" className="hover:text-white transition-colors">{t('landing.footer_about')}</a></li>
                  <li><a href="/support" className="hover:text-white transition-colors">{t('landing.footer_support')}</a></li>
                  <li><a href="/legal" className="hover:text-white transition-colors">{t('landing.footer_privacy')}</a></li>
                  <li><a href="/legal" className="hover:text-white transition-colors">{t('landing.footer_terms')}</a></li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold mb-4">{t('landing.footer_social')}</p>
                <div className="flex space-x-4">
                  <button onClick={() => toast({
                  title: "🚧 Sosyal medya linkleri henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
                })} className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </button>
                  <button onClick={() => toast({
                  title: "🚧 Sosyal medya linkleri henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
                })} className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>
              
              <div>
                <p className="font-semibold mb-4">{t('landing.footer_language')}</p>
                <div className="flex space-x-2">
                  {languages.map(lang => (
                    <Badge 
                      key={lang.code}
                      variant="outline" 
                      className={`cursor-pointer hover:text-white hover:border-white ${language === lang.code ? 'text-white border-white' : 'text-gray-400 border-gray-400'}`}
                      onClick={() => setLanguage(lang.code)}
                    >
                      {lang.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>{t('landing.footer_copyright')}</p>
            </div>
          </div>
        </footer>
      </div>
    </>;
};
export default LandingPage;