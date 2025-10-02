import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  ArrowLeft, 
  Shield, 
  FileText, 
  Lock,
  Eye,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

const LegalPage = () => {
  return (
    <>
      <Helmet>
        <title>Yasal Bilgiler - RandevuBot</title>
        <meta name="description" content="RandevuBot gizlilik politikası, kullanım şartları ve yasal bilgiler." />
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Yasal 
              <span className="gradient-text"> Bilgiler</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gizlilik politikamız, kullanım şartlarımız ve yasal bilgilerimiz
            </p>
          </motion.div>

          {/* Legal Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Tabs defaultValue="privacy" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="privacy" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Gizlilik Politikası</span>
                </TabsTrigger>
                <TabsTrigger value="terms" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Kullanım Şartları</span>
                </TabsTrigger>
                <TabsTrigger value="kvkk" className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>KVKK</span>
                </TabsTrigger>
              </TabsList>

              {/* Privacy Policy */}
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-6 h-6 text-blue-600" />
                      <span>Gizlilik Politikası</span>
                    </CardTitle>
                    <CardDescription>
                      Son güncelleme: 27 Eylül 2024
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Toplanan Bilgiler</h3>
                        <p className="text-gray-700 mb-4">
                          RandevuBot olarak, hizmetlerimizi sunabilmek için aşağıdaki kişisel bilgileri topluyoruz:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Ad, soyad ve iletişim bilgileri</li>
                          <li>E-posta adresi ve telefon numarası</li>
                          <li>Firma bilgileri ve sektör bilgisi</li>
                          <li>WhatsApp numarası (randevu sistemi için)</li>
                          <li>Randevu ve müşteri verileri</li>
                          <li>Ödeme bilgileri (güvenli ödeme sağlayıcıları aracılığıyla)</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Bilgilerin Kullanımı</h3>
                        <p className="text-gray-700 mb-4">
                          Toplanan bilgiler aşağıdaki amaçlarla kullanılır:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Randevu sistemi hizmetlerinin sağlanması</li>
                          <li>Müşteri desteği ve teknik yardım</li>
                          <li>Sistem güvenliği ve dolandırıcılık önleme</li>
                          <li>Hizmet iyileştirmeleri ve yeni özellikler</li>
                          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Bilgi Güvenliği</h3>
                        <p className="text-gray-700">
                          Kişisel verileriniz, endüstri standardı güvenlik önlemleri ile korunmaktadır. 
                          SSL şifreleme, güvenli veri merkezleri ve düzenli güvenlik denetimleri ile 
                          verilerinizin güvenliğini sağlıyoruz.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Üçüncü Taraf Paylaşımı</h3>
                        <p className="text-gray-700">
                          Kişisel bilgilerinizi, yasal zorunluluklar dışında üçüncü taraflarla paylaşmıyoruz. 
                          Hizmet sağlayıcılarımız (ödeme işlemcileri, bulut hizmetleri) ile sadece 
                          hizmet sunumu için gerekli bilgiler paylaşılır.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Çerezler</h3>
                        <p className="text-gray-700">
                          Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanıyoruz. 
                          Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">6. İletişim</h3>
                        <p className="text-gray-700">
                          Gizlilik politikamız hakkında sorularınız için: 
                          <strong> privacy@randevubot.com</strong> adresinden bizimle iletişime geçebilirsiniz.
                        </p>
                      </section>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Terms of Service */}
              <TabsContent value="terms">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <span>Kullanım Şartları</span>
                    </CardTitle>
                    <CardDescription>
                      Son güncelleme: 27 Eylül 2024
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Hizmet Tanımı</h3>
                        <p className="text-gray-700">
                          RandevuBot, WhatsApp entegrasyonlu yapay zeka destekli randevu yönetim sistemi sunar. 
                          Hizmetimiz, işletmelerin randevu süreçlerini otomatikleştirmesine yardımcı olur.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Kullanıcı Sorumlulukları</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Doğru ve güncel bilgi sağlamak</li>
                          <li>Hesap güvenliğini korumak</li>
                          <li>Hizmetleri yasal amaçlarla kullanmak</li>
                          <li>Diğer kullanıcıların haklarına saygı göstermek</li>
                          <li>Sistem güvenliğini tehlikeye atmamak</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Ödeme ve Faturalama</h3>
                        <p className="text-gray-700 mb-4">
                          Ödeme koşulları:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Aylık abonelik ödemeleri peşin tahsil edilir</li>
                          <li>14 günlük ücretsiz deneme süresi mevcuttur</li>
                          <li>İptal durumunda kalan süre için iade yapılmaz</li>
                          <li>Fiyat değişiklikleri 30 gün önceden bildirilir</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Hizmet Sınırlamaları</h3>
                        <p className="text-gray-700">
                          Hizmetimiz "olduğu gibi" sunulmaktadır. %99.9 uptime hedefliyoruz ancak 
                          kesintisiz hizmet garantisi vermiyoruz. Planlı bakımlar önceden duyurulur.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Fikri Mülkiyet</h3>
                        <p className="text-gray-700">
                          RandevuBot platformu ve tüm içeriği bizim fikri mülkiyetimizdir. 
                          Kullanıcılar sadece hizmet kullanım hakkına sahiptir.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Hesap İptali</h3>
                        <p className="text-gray-700">
                          Hesabınızı istediğiniz zaman iptal edebilirsiniz. İptal sonrası verileriniz 
                          30 gün boyunca saklanır, ardından kalıcı olarak silinir.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Değişiklikler</h3>
                        <p className="text-gray-700">
                          Bu şartları değiştirme hakkımızı saklı tutuyoruz. Önemli değişiklikler 
                          e-posta ile bildirilir.
                        </p>
                      </section>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* KVKK */}
              <TabsContent value="kvkk">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <UserCheck className="w-6 h-6 text-blue-600" />
                      <span>KVKK Aydınlatma Metni</span>
                    </CardTitle>
                    <CardDescription>
                      Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Veri Sorumlusu</h3>
                        <p className="text-gray-700">
                          RandevuBot, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") 
                          kapsamında veri sorumlusu sıfatıyla hareket etmektedir.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">2. İşlenen Kişisel Veriler</h3>
                        <p className="text-gray-700 mb-4">
                          Aşağıdaki kategorilerde kişisel verileriniz işlenmektedir:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li><strong>Kimlik Verileri:</strong> Ad, soyad, doğum tarihi</li>
                          <li><strong>İletişim Verileri:</strong> E-posta, telefon, adres</li>
                          <li><strong>Müşteri İşlem Verileri:</strong> Randevu bilgileri, hizmet geçmişi</li>
                          <li><strong>Finansal Veriler:</strong> Ödeme bilgileri, fatura adresi</li>
                          <li><strong>Teknik Veriler:</strong> IP adresi, çerez bilgileri</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">3. İşleme Amaçları</h3>
                        <p className="text-gray-700 mb-4">
                          Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Hizmet sözleşmesinin kurulması ve ifası</li>
                          <li>Müşteri memnuniyeti ve hizmet kalitesinin artırılması</li>
                          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                          <li>Meşru menfaatlerin korunması</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Haklarınız</h3>
                        <p className="text-gray-700 mb-4">
                          KVKK kapsamında sahip olduğunuz haklar:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                          <li>İşlenmişse, işlenme amacını ve buna uygun kullanılıp kullanılmadığını öğrenme</li>
                          <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                          <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                          <li>KVKK'da öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                          <li>Veri sorumlusuna başvurarak haklarınızı kullanabilirsiniz</li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Başvuru</h3>
                        <p className="text-gray-700">
                          KVKK kapsamındaki taleplerinizi yazılı olarak veya kayıtlı elektronik posta (KEP) adresi, 
                          güvenli elektronik imza, mobil imza ya da tarafınızca bize daha önce bildirilen ve 
                          sistemimizde kayıtlı bulunan elektronik posta adresini kullanmak suretiyle 
                          <strong> kvkk@randevubot.com</strong> adresine iletebilirsiniz.
                        </p>
                      </section>
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

export default LegalPage;