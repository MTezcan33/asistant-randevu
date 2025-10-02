import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    acceptTerms: false
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      acceptTerms: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && !formData.acceptTerms) {
      toast({
        title: "Hata",
        description: "Kullanım şartlarını kabul etmelisiniz.",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration/login
    const userData = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      registeredAt: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: isLogin ? "Giriş Başarılı!" : "Kayıt Başarılı!",
      description: isLogin ? "Hoş geldiniz!" : "E-posta onayı gönderildi. Telefon doğrulaması için yönlendiriliyorsunuz."
    });

    // Simulate email verification and phone verification
    setTimeout(() => {
      navigate('/onboarding');
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'} - RandevuBot</title>
        <meta name="description" content="RandevuBot'a kayıt olun ve WhatsApp destekli AI randevu sisteminizi kurmaya başlayın." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ana sayfaya dön
              </Link>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold gradient-text">RandevuBot</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Tekrar Hoş Geldiniz' : 'Hesap Oluşturun'}
              </h1>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Hesabınıza giriş yapın ve randevu sisteminizi yönetin'
                  : 'WhatsApp destekli randevu sisteminizi kurmaya başlayın'
                }
              </p>
            </div>

            {/* Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-center">
                  {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                </CardTitle>
                <CardDescription className="text-center">
                  {isLogin 
                    ? 'E-posta ve şifrenizi girin'
                    : 'Bilgilerinizi girerek hesabınızı oluşturun'
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Ad</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="Adınız"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Soyad</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Soyadınız"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon Numarası</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+90 5XX XXX XX XX"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="text-sm text-gray-500">
                        WhatsApp doğrulaması için gereklidir
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Şifre</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Güçlü bir şifre oluşturun"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={handleCheckboxChange}
                        className="mt-1"
                      />
                      <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                        <span className="text-gray-700">
                          KVKK kapsamında kişisel verilerimin işlenmesini kabul ediyorum ve{' '}
                        </span>
                        <Link to="/legal" className="text-blue-600 hover:underline">
                          Kullanım Şartları
                        </Link>
                        <span className="text-gray-700"> ile </span>
                        <Link to="/legal" className="text-blue-600 hover:underline">
                          Gizlilik Politikası
                        </Link>
                        <span className="text-gray-700">'nı kabul ediyorum.</span>
                      </Label>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full whatsapp-green text-white text-lg py-6"
                  >
                    {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="ml-2 text-blue-600 hover:underline font-medium"
                    >
                      {isLogin ? 'Kayıt olun' : 'Giriş yapın'}
                    </button>
                  </p>
                </div>

                {!isLogin && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Kayıt sonrası:</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>📩 E-posta onayı gönderilecek</li>
                      <li>📲 WhatsApp ile telefon doğrulaması yapılacak</li>
                      <li>🏢 Firma profili oluşturma sayfasına yönlendirileceksiniz</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;