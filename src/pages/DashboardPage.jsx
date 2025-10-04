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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Plus, 
  MessageCircle, 
  Clock, 
  Search,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  LogOut,
  BarChart3
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterService, setFilterService] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [navigate]);

  const loadData = async () => {
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

    const parsedUser = JSON.parse(userData);
    const parsedCompany = JSON.parse(companyData);
    
    setUser(parsedUser);
    setCompany(parsedCompany);

    try {
      const { data: appointmentsData, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('company_id', parsedCompany.id)
        .order('appointment_time', { ascending: true });

      if (error) {
        console.error('Error loading appointments:', error);
        generateSampleAppointments();
      } else if (appointmentsData && appointmentsData.length > 0) {
        const formattedAppointments = appointmentsData.map(apt => ({
          id: apt.id,
          date: new Date(apt.appointment_time).toISOString().split('T')[0],
          time: new Date(apt.appointment_time).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          customerName: apt.customer_name,
          customerPhone: apt.customer_phone,
          service: apt.service,
          duration: apt.duration,
          status: apt.status,
          notes: ''
        }));
        setAppointments(formattedAppointments);
      } else {
        generateSampleAppointments();
      }
    } catch (error) {
      console.error('Error:', error);
      generateSampleAppointments();
    } finally {
      setIsLoading(false);
    }
  };

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
        notes: ''
      }
    ];
    setAppointments(sampleAppointments);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);

      if (error) {
        console.error('Delete Error:', error);
      }
      
      const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
      setAppointments(updatedAppointments);
      
      toast({
        title: "Randevu Silindi",
        description: "Randevu başarıyla silindi."
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    toast({
      title: "Çıkış Yapıldı"
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

  if (isLoading || !user || !company) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - {company.name} | RandevuBot</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{company.name}</h1>
                  <p className="text-sm text-gray-500">{company.sector || 'Firma'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
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

          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calendar">Takvim</TabsTrigger>
              <TabsTrigger value="appointments">Randevu Listesi</TabsTrigger>
              <TabsTrigger value="settings">Firma Ayarları</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Takvim Görünümü</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-auto"
                    />
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((apt) => (
                        <div key={apt.id} className="border rounded-lg p-4">
                          <div className="flex justify-between">
                            <div>
                              <Badge>{apt.time}</Badge>
                              <h3 className="font-semibold mt-2">{apt.customerName}</h3>
                              <p className="text-sm text-gray-600">{apt.customerPhone}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteAppointment(apt.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">Bu tarihte randevu yok</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Randevu Listesi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Tüm randevular burada görünecek</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Firma Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Firma Adı</Label>
                      <p>{company.name}</p>
                    </div>
                    <div>
                      <Label>E-posta</Label>
                      <p>{company.email || 'Belirtilmemiş'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;