import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Upload, 
  MapPin, 
  Plus, 
  Trash2, 
  Clock, 
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    sector: '',
    companyName: '',
    logo: null,
    email: '',
    whatsappNumber: '',
    phone: '',
    address: '',
    
    // Services
    services: [
      { id: 1, name: '', price: '', duration: '', description: '' }
    ],
    
    // Working Hours
    workingDays: {
      monday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      tuesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      wednesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      thursday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      friday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      saturday: { isOpen: false, openTime: '09:00', closeTime: '18:00' },
      sunday: { isOpen: false, openTime: '09:00', closeTime: '18:00' }
    },
    holidays: []
  });

  const sectors = [
    'Doktor & Klinik',
    'Berber & Kuaför',
    'Güzellik & Spa',
    'Diş Hekimi',
    'Veteriner',
    'Masaj & Terapi',
    'Fitness & Spor',
    'Eğitim & Kurs',
    'Danışmanlık',
    'Diğer'
  ];

  const dayNames = {
    monday: 'Pazartesi',
    tuesday: 'Salı',
    wednesday: 'Çarşamba',
    thursday: 'Perşembe',
    friday: 'Cuma',
    saturday: 'Cumartesi',
    sunday: 'Pazar'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceChange = (serviceId, field, value) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service =>
        service.id === serviceId ? { ...service, [field]: value } : service
      )
    }));
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      name: '',
      price: '',
      duration: '',
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const removeService = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== serviceId)
    }));
  };

  const handleWorkingDayChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: {
          ...prev.workingDays[day],
          [field]: value
        }
      }
    }));
  };

  const handleLogoUpload = () => {
    toast({
      title: "Logo Yükleme",
      description: "🚧 Logo yükleme özelliği henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
    });
  };

  const handleMapPin = () => {
    toast({
      title: "Harita Konumu",
      description: "🚧 Harita entegrasyonu henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // 1. Firmayı Supabase'e kaydet
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert([{
          name: formData.companyName,
          email: formData.email || null,
          phone: formData.phone || null,
          phone_verified: false,
          address: formData.address || null,
          services: formData.services, // JSONB
          working_hours: formData.workingDays, // JSONB
          plan_type: 'trial'
        }])
        .select()
        .single();

      if (companyError) {
        console.error('Supabase Company Error:', companyError);
        toast({
          title: "Hata!",
          description: `Firma kaydedilemedi: ${companyError.message}`,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      console.log('Company created:', companyData);

      // 2. Hizmetleri kaydet
      const validServices = formData.services.filter(s => s.name && s.duration);
      
      if (validServices.length > 0) {
        const servicesData = validServices.map(service => ({
          company_id: companyData.id,
          name: service.name,
          price: service.price ? parseFloat(service.price) : null,
          duration_minutes: parseInt(service.duration) || 30,
          description: service.description || null,
          is_active: true,
          currency: 'GBP'
        }));

        const { error: servicesError } = await supabase
          .from('company_services')
          .insert(servicesData);

        if (servicesError) {
          console.error('Services Error:', servicesError);
          // Hizmetler kaydedilemese bile devam et
        } else {
          console.log('Services created successfully');
        }
      }

      // 3. localStorage'a kaydet (yerel kullanım için)
      const completeCompanyData = {
        ...companyData,
        sector: formData.sector,
        whatsappNumber: formData.whatsappNumber,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      localStorage.setItem('company', JSON.stringify(completeCompanyData));
      
      toast({
        title: "Tebrikler! 🎉",
        description: "Firma profiliniz başarıyla oluşturuldu. Dashboard'a yönlendiriliyorsunuz."
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Hata!",
        description: "Bir hata oluştu, lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 'basic':
        return formData.sector && formData.companyName && formData.whatsappNumber;
      case 'services':
        return formData.services.some(service => service.name && service.duration);
      case 'schedule':
        return Object.values(formData.workingDays).some(day => day.isOpen);
      default:
        return false;
    }
  };

  const canProceed = (step) => {
    return isStepComplete(step);
  };

  return (
    <>
      <Helmet>
        <title>Firma Profili Oluştur - RandevuBot</title>
        <meta name="description" content="Firma bilgilerinizi girerek WhatsApp randevu sisteminizi kurmaya başlayın." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Firma Profilinizi Oluşturun
            </h1>
            <p className="text-xl text-gray-600">
              WhatsApp randevu sisteminizi kurmak için gerekli bilgileri adım adım girelim
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[
                { key: 'basic', label: 'Temel Bilgiler', number: 1 },
                { key: 'services', label: 'Hizmetler', number: 2 },
                { key: 'schedule', label: 'Çalışma Saatleri', number: 3 }
              ].map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep === step.key 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : isStepComplete(step.key)
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {isStepComplete(step.key) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep === step.key ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                  {index < 2 && (
                    <ArrowRight className="w-4 h-4 text-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Tabs value={currentStep} onValueChange={setCurrentStep}>
              {/* Step 1: Basic Info */}
              <TabsContent value="basic">
                <Card className="shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      <span>Temel Bilgiler</span>
                    </CardTitle>
                    <CardDescription>
                      Firmanızın temel bilgilerini girin
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sector">Firma Sektörü *</Label>
                        <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sektörünüzü seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {sectors.map(sector => (
                              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName">Firma Adı *</Label>
                        <Input
                          id="companyName"
                          placeholder="Firma adınızı girin"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Logo Yükleme</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 mb-2">Logo yüklemek için tıklayın</p>
                        <Button 
                          variant="outline" 
                          onClick={handleLogoUpload}
                          className="text-gray-600"
                        >
                          Dosya Seç
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Firma E-posta</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="info@firmaniz.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="whatsappNumber">WhatsApp Numarası *</Label>
                        <Input
                          id="whatsappNumber"
                          placeholder="+90 5XX XXX XX XX"
                          value={formData.whatsappNumber}
                          onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Sabit Telefon</Label>
                      <Input
                        id="phone"
                        placeholder="+90 2XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Açık Adres</Label>
                      <div className="flex space-x-2">
                        <Textarea
                          id="address"
                          placeholder="Firmanızın tam adresi"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleMapPin}
                          className="px-3"
                        >
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        onClick={() => setCurrentStep('services')}
                        disabled={!canProceed('basic')}
                        className="whatsapp-green text-white"
                      >
                        Sonraki Adım
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 2: Services */}
              <TabsContent value="services">
                <Card className="shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-6 h-6 text-blue-600" />
                      <span>Hizmetler</span>
                    </CardTitle>
                    <CardDescription>
                      Sunduğunuz hizmetleri tanımlayın
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {formData.services.map((service, index) => (
                      <div key={service.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Hizmet {index + 1}</h3>
                          {formData.services.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeService(service.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Hizmet Adı *</Label>
                            <Input
                              placeholder="Örn: Saç Kesimi"
                              value={service.name}
                              onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Fiyat</Label>
                            <Input
                              placeholder="₺ 0"
                              value={service.price}
                              onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Ortalama Süre (dakika) *</Label>
                            <Input
                              type="number"
                              placeholder="30"
                              value={service.duration}
                              onChange={(e) => handleServiceChange(service.id, 'duration', e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Açıklama</Label>
                            <Input
                              placeholder="Hizmet detayları"
                              value={service.description}
                              onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button 
                      variant="outline" 
                      onClick={addService}
                      className="w-full border-dashed"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Yeni Hizmet Ekle
                    </Button>

                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep('basic')}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Önceki Adım
                      </Button>
                      <Button 
                        onClick={() => setCurrentStep('schedule')}
                        disabled={!canProceed('services')}
                        className="whatsapp-green text-white"
                      >
                        Sonraki Adım
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 3: Schedule */}
              <TabsContent value="schedule">
                <Card className="shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <span>Çalışma Günleri & Saatleri</span>
                    </CardTitle>
                    <CardDescription>
                      Çalışma saatlerinizi belirleyin
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {Object.entries(formData.workingDays).map(([day, schedule]) => (
                        <div key={day} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="flex items-center space-x-2 w-32">
                            <Checkbox
                              checked={schedule.isOpen}
                              onCheckedChange={(checked) => handleWorkingDayChange(day, 'isOpen', checked)}
                            />
                            <Label className="font-medium">{dayNames[day]}</Label>
                          </div>

                          {schedule.isOpen ? (
                            <div className="flex items-center space-x-2 flex-1">
                              <Input
                                type="time"
                                value={schedule.openTime}
                                onChange={(e) => handleWorkingDayChange(day, 'openTime', e.target.value)}
                                className="w-32"
                              />
                              <span className="text-gray-500">-</span>
                              <Input
                                type="time"
                                value={schedule.closeTime}
                                onChange={(e) => handleWorkingDayChange(day, 'closeTime', e.target.value)}
                                className="w-32"
                              />
                            </div>
                          ) : (
                            <div className="flex-1">
                              <Badge variant="secondary">Kapalı</Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Tatil & Özel Günler</h3>
                      <p className="text-sm text-blue-800 mb-3">
                        Özel günlerde kapatmak istediğiniz tarihleri belirleyebilirsiniz
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => toast({ title: "🚧 Tatil takvimi henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz!" })}
                        className="text-blue-600 border-blue-200"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Tatil Günleri Ekle
                      </Button>
                    </div>

                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep('services')}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Önceki Adım
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        disabled={!canProceed('schedule') || isLoading}
                        className="whatsapp-green text-white"
                      >
                        {isLoading ? 'Kaydediliyor...' : 'Profili Tamamla'}
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;