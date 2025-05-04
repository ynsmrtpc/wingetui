# WingetUI

<div align="center">
  <img src="https://yunusemretopcu.com/uploads/wingetui/icon.svg" alt="WingetUI Logo" width="120" />
  <h1>WingetUI</h1>
  <p>Windows Paket Yöneticisi (winget) için Kullanıcı Arayüzü</p>
</div>

## 📋 İçindekiler

- [Genel Bakış](#-genel-bakış)
- [Özellikler](#-özellikler)
- [Sistem Gereksinimleri](#-sistem-gereksinimleri)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## 🔍 Genel Bakış

WingetUI, Microsoft'un resmi komut satırı paket yöneticisi olan Windows Package Manager (winget) için kullanıcı dostu bir grafik arayüzüdür. Bu uygulama, Windows işletim sisteminde yazılım yükleme, güncelleme ve kaldırma işlemlerini kolaylaştırmak için tasarlanmıştır.

WingetUI sayesinde, komut satırı kullanmadan Windows uygulamalarını yönetebilir, yeni uygulamalar arayabilir ve mevcut uygulamalarınızı güncel tutabilirsiniz.

## ✨ Özellikler

- **Yüklü Uygulamaları Görüntüleme**: Sisteminizde yüklü olan tüm uygulamaları listeleyin
- **Uygulama Arama**: Windows paket deposunda yeni uygulamalar arayın
- **Kolay Güncelleme**: Tek tıklamayla uygulamalarınızı güncelleyin
- **Toplu İşlemler**: Birden fazla uygulamayı aynı anda güncelleyin veya yükleyin
- **Sistem Bilgileri**: İşlemci, bellek, disk ve diğer sistem bileşenleri hakkında detaylı bilgiler görüntüleyin
- **Özelleştirilebilir Arayüz**: Koyu/açık tema ve dil seçenekleri
- **Bildirimler**: Önemli olaylar için bildirimler alın

## 💻 Sistem Gereksinimleri

- Windows 10 (1809) veya daha yeni
- Windows Package Manager (winget) yüklü olmalıdır
  - Winget yüklü değilse, uygulama sizin için yükleme seçeneği sunacaktır
- 4 GB RAM (minimum)
- 100 MB boş disk alanı

## 📥 Kurulum

1. En son sürümü [buradan](https://github.com/ynsmrtpc/wingetui/releases/) indirin
2. İndirilen `.exe` dosyasını çalıştırın
3. Uygulama otomatik olarak başlayacaktır

Alternatif olarak, kaynak koddan derlemek için:

```bash
# Depoyu klonlayın
git clone https://github.com/wingetui/wingetui.git

# Proje dizinine gidin
cd wingetui

# Bağımlılıkları yükleyin
npm install

# Uygulamayı derleyin
npm run build
```

## 🚀 Kullanım

### Yüklü Uygulamaları Görüntüleme

Ana ekranda, sisteminizde yüklü olan tüm uygulamaları görebilirsiniz. Bu liste, uygulama adı, sürümü ve yayıncısı gibi bilgileri içerir.

### Uygulama Arama

Arama çubuğunu kullanarak Windows paket deposunda yeni uygulamalar arayabilirsiniz. Arama sonuçlarından istediğiniz uygulamayı seçerek kolayca yükleyebilirsiniz.

### Uygulamaları Güncelleme

Güncelleme sekmesinde, güncellemesi mevcut olan uygulamaları görebilir ve tek tıklamayla güncelleyebilirsiniz. Ayrıca, tüm uygulamaları aynı anda güncellemek için "Tümünü Güncelle" seçeneğini kullanabilirsiniz.

### Sistem Bilgileri

Sistem sekmesinde, bilgisayarınızın donanımı ve yazılımı hakkında detaylı bilgiler bulabilirsiniz. Bu bilgiler arasında işlemci, bellek, disk, ekran çözünürlüğü ve işletim sistemi sürümü gibi bilgiler yer alır.

### Ayarlar

Ayarlar sekmesinde, uygulama dilini ve temayı değiştirebilir, bildirim ayarlarını yapılandırabilirsiniz.

## 🤝 Katkıda Bulunma

WingetUI'yi daha da geliştirmek için katkılarınızı bekliyoruz! Katkıda bulunmak için:

1. Bu depoyu forklayın
2. Yeni bir özellik dalı oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik: Açıklama'`)
4. Dalınızı uzak depoya gönderin (`git push origin yeni-ozellik`)
5. Bir Pull Request açın

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

---

<div align="center">
  <p>ynsmrtpc tarafından ❤️ ile geliştirilmiştir</p>
  <p>v0.1.1</p>
</div>
