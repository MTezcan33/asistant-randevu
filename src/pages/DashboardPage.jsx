import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Plus, 
  MessageCircle, 
  Users, 
  Clock, 
  Settings, 
  BarChart3,
  Filter,
  Search,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterService, setFilterService] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load user and company data
    const userData = localStorage.getItem('user');
    const companyData = localStorage.getItem('company');
    
    if (!userData) {
      navigate('/register');
      return;
    }

    if (!companyData) {
      navigate('/onboarding');
      return;
    }

    setUser(JSON.parse(userData));
    setCompany(JSON.parse(companyData));

    // Load or generate sample appointments
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      generateSampleAppointments();
    }
  }, [navigate]);

  const generateSampleAppointments = () => {
    const sampleAppointments = [
      {
        id: 1,
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        customerName: 'Ahmet Yılmaz',
        customerPhone: '+90 532 123 45 67',
        service: 'Saç Kesimi',
        duration: 30,
        status: 'confirmed',
        notes: 'Kısa kesim tercih ediyor'
      },
      {
        id: 2,
        date: new Date().toISOString().split('T')[0],
        time: '14:30',
        customerName: 'Ayşe Demir',
        customerPhone: '+90 533 987 65 43',
        service: 'Saç Kesimi + Sakal',
        duration: 45,
        status: 'pending',
        notes: ''
      },
      {
        id: 3,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '11:00',
        customerName: 'Mehmet Kaya',
        customerPhone: '+90 534 555 66 77',
        service: 'Cilt Bakımı',
        duration: 60,
        status: 'confirmed',
        notes: 'Hassas cilt'
      }
    ];

    setAppointments(sampleAppointments);
    localStorage.setItem('appointments', JSON.stringify(sampleAppointments));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('company');
    localStorage.removeItem('appointments');
    navigate('/');
    toast({
      title: "Çıkış Yapıldı",
      description: "Başarıyla çıkış yaptınız."
    });
  };

  const handleAddAppointment = () => {
    toast({
      title: "Randevu Ekleme",
      description: "🚧 Manuel randevu ekleme özelliği henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
    });
  };

  const handleEditAppointment = (appointmentId) => {
    toast({
      title: "Randevu Düzenleme",
      description: "🚧 Randevu düzenleme özelliği henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
    });
  };

  const handleDeleteAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    toast({
      title: "Randevu Silindi",
      description: "Randevu başarıyla silindi."
    });
  };

  const handleWhatsAppStatus = () => {
    toast({
      title: "WhatsApp Durumu",
      description: "🚧 WhatsApp bağlantı kontrolü henüz hazır değil—ama merak etmeyin! Bir sonraki istekte talep edebilirsiniz! 🚀"
    });
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = appointment.date === selectedDate;
    const matchesService = filterService === 'all' || appointment.service === filterService;
    const matchesSearch = appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.customerPhone.includes(searchTerm);
    return matchesDate && matchesService && matchesSearch;
  });

  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);
  const confirmedToday = todayAppointments.filter(apt => apt.status === 'confirmed').length;
  const pendingToday = todayAppointments.filter(apt => apt.status === 'pending').length;

  if (!user || !company) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - {company.companyName} | RandevuBot</title>
        <meta name="description" content="Randevularınızı yönetin ve firma ayarlarınızı düzenleyin." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{company.companyName}</h1>
                  <p className="text-sm text-gray-500">{company.sector}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge 
                  variant="outline" 
                  className="text-green-600 border-green-200 cursor-pointer"
                  onClick={handleWhatsAppStatus}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  WhatsApp Aktif
                </Badge>
                
                <Button variant="outline" onClick={() => navigate('/pricing')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Planı Yükselt
                </Button>
                
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bugün Toplam</p>
                    <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Onaylanmış</p>
                    <p className="text-2xl font-bold text-green-600">{confirmedToday}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingToday}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bu Ay</p>
                    <p className="text-2xl font-bold text-purple-600">{appointments.length}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calendar">📅 Takvim</TabsTrigger>
              <TabsTrigger value="appointments">📋 Randevu Listesi</TabsTrigger>
              <TabsTrigger value="settings">⚙️ Firma Ayarları</TabsTrigger>
            </TabsList>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Takvim Görünümü</CardTitle>
                      <CardDescription>Randevularınızı takvim üzerinde görüntüleyin</CardDescription>
                    </div>
                    <Button onClick={handleAddAppointment} className="whatsapp-green text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Randevu Ekle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Label htmlFor="date">Tarih Seç:</Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-auto"
                      />
                    </div>

                    <div className="grid gap-4">
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                          <motion.div
                            key={appointment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="appointment-slot border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                    {appointment.time}
                                  </Badge>
                                  <Badge variant="outline">{appointment.service}</Badge>
                                  <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                    {appointment.status === 'confirmed' ? 'Onaylandı' : 'Bekliyor'}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold text-gray-900">{appointment.customerName}</h3>
                                <p className="text-sm text-gray-600 flex items-center mt-1">
                                  <Phone className="w-4 h-4 mr-1" />
                                  {appointment.customerPhone}
                                </p>
                                {appointment.notes && (
                                  <p className="text-sm text-gray-500 mt-2">{appointment.notes}</p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditAppointment(appointment.id)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDeleteAppointment(appointment.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Bu tarihte randevu yok</h3>
                          <p className="text-gray-500">Seçili tarihte henüz randevu bulunmuyor.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Randevu Listesi</CardTitle>
                  <CardDescription>Tüm randevularınızı listeleyin ve yönetin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Müşteri adı veya telefon ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={filterService} onValueChange={setFilterService}>
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="Hizmet filtrele" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tüm Hizmetler</SelectItem>
                          {company.services?.map((service) => (
                            <SelectItem key={service.id} value={service.name}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Appointments Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-medium text-gray-900">ID</th>
                            <th className="text-left p-3 font-medium text-gray-900">Tarih & Saat</th>
                            <th className="text-left p-3 font-medium text-gray-900">Müşteri</th>
                            <th className="text-left p-3 font-medium text-gray-900">Telefon</th>
                            <th className="text-left p-3 font-medium text-gray-900">Hizmet</th>
                            <th className="text-left p-3 font-medium text-gray-900">Durum</th>
                            <th className="text-left p-3 font-medium text-gray-900">İşlemler</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointment) => (
                            <tr key={appointment.id} className="border-b hover:bg-gray-50">
                              <td className="p-3 text-sm text-gray-600">#{appointment.id}</td>
                              <td className="p-3 text-sm">
                                {new Date(appointment.date).toLocaleDateString('tr-TR')} {appointment.time}
                              </td>
                              <td className="p-3 text-sm font-medium">{appointment.customerName}</td>
                              <td className="p-3 text-sm text-gray-600">{appointment.customerPhone}</td>
                              <td className="p-3 text-sm">{appointment.service}</td>
                              <td className="p-3">
                                <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                  {appointment.status === 'confirmed' ? 'Onaylandı' : 'Bekliyor'}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditAppointment(appointment.id)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDeleteAppointment(appointment.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Firma Bilgileri</CardTitle>
                    <CardDescription>Firma bilgilerinizi görüntüleyin ve düzenleyin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Firma Adı</Label>
                        <p className="text-gray-900">{company.companyName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Sektör</Label>
                        <p className="text-gray-900">{company.sector}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">WhatsApp</Label>
                        <p className="text-gray-900 flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {company.whatsappNumber}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">E-posta</Label>
                        <p className="text-gray-900 flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {company.email || 'Belirtilmemiş'}
                        </p>
                      </div>
                    </div>

                    {company.address && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Adres</Label>
                        <p className="text-gray-900 flex items-start">
                          <MapPin className="w-4 h-4 mr-2 mt-1" />
                          {company.address}
                        </p>
                      </div>
                    )}

                    <Button 
                      onClick={() => navigate('/onboarding')}
                      variant="outline"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Bilgileri Düzenle
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>WhatsApp Bağlantısı</CardTitle>
                    <CardDescription>WhatsApp entegrasyonu durumu ve ayarları</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-green-900">Bağlantı Aktif</p>
                          <p className="text-sm text-green-700">WhatsApp sistemi çalışıyor</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={handleWhatsAppStatus}
                        className="text-green-600 border-green-200"
                      >
                        Durumu Kontrol Et
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ödeme Planı</CardTitle>
                    <CardDescription>Mevcut planınız ve yükseltme seçenekleri</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-900">Standart Plan</p>
                        <p className="text-sm text-blue-700">₺299/ay - Sınırsız randevu</p>
                      </div>
                      <Button 
                        onClick={() => navigate('/pricing')}
                        className="whatsapp-green text-white"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Planı Yükselt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;