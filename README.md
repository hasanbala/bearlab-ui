# 🐻 BearLab Component Library

Modern React component kütüphanesi - Lerna tabanlı monorepo mimarisi ile geliştirilmiştir.

## 🚀 Hızlı Başlangıç

### İlk Kurulum

```bash
# Projeyi tamamen temizle
npm run clean:all

# Tüm bağımlılıkları yükle
npm run bootstrap

# Tüm paketleri build et
npm run build:all
```

## 📦 Build Komutları

### Temel Build İşlemleri

```bash
# Tüm paketleri build et (core + components)
npm run build:all

# Sadece core paketini build et
npm run build:core

# Sadece component paketlerini build et
npm run build:components
```

### Gelişmiş Build Seçenekleri

```bash
# Temizle + build
./scripts/build.sh --clean

# Paralel build (hızlı)
./scripts/build.sh --parallel

# Sadece core'u build et
./scripts/build.sh --core-only

# Sadece componentları build et
./scripts/build.sh --components-only

# Belirli paketleri build et
./scripts/build.sh button input card
```

## 🚢 Publish Komutları

### 🌟 Önerilen Yöntem: Otomatik Version + Publish

```bash
# Patch version bump + publish (1.0.0 → 1.0.1)
./scripts/quick-publish.sh -v patch

# Minor version bump + publish (1.0.0 → 1.1.0)
./scripts/quick-publish.sh -v minor

# Major version bump + publish (1.0.0 → 2.0.0)
./scripts/quick-publish.sh -v major
```

**Bu yöntemi neden tercih etmelisiniz?**

- ✅ Otomatik olarak tüm paketlerin versiyonunu artırır
- ✅ Git tag'leri oluşturur ve değişiklikleri commit'ler
- ✅ Paketleri doğru sırada publish eder
- ✅ Conventional commits standardını kullanır

### 🎯 Alternatif: Sadece Değişen Paketler

```bash
# Sadece değişiklik yapılan paketleri publish et
npm run publish:changed

# Script ile sadece değişenleri publish et
./scripts/quick-publish.sh -c
```

**Bu seçenek şunları yapar:**

- Sadece değişiklik yapılan paketleri otomatik tespit eder
- Sadece onların versiyonlarını artırır
- Conventional commits kullanarak changelog oluşturur

## 🧹 Temizlik Komutları

```bash
# Paket build dosyalarını temizle
npm run clean

# Her şeyi tamamen temizle (node_modules, package-lock.json)
npm run clean:all
```

## 📋 Version Yönetimi

```bash
# Otomatik version belirleme (conventional commits)
npm run version

# Manuel version bump
npm run version:patch   # 1.0.0 → 1.0.1
npm run version:minor   # 1.0.0 → 1.1.0
npm run version:major   # 1.0.0 → 2.0.0
```

## ⚠️ Dikkat Edilmesi Gerekenler

### ❌ Kullanmamanız Gereken Komutlar

```bash
# Bu komutları manuel kullanımda tercih etmeyin:
npm run publish:all     # Version kontrolü yapmaz, tüm paketleri zorla publish eder
npm run publish:ci      # CI/CD ortamı için tasarlanmış, manuel kullanım için değil
```

### ✅ Önerilen İş Akışı

1. **Geliştirme öncesi:**

   ```bash
   npm run clean:all && npm run bootstrap
   ```

2. **Geliştirme sırasında:**

   ```bash
   npm run build:all
   ```

3. **Publish öncesi:**
   ```bash
   ./scripts/quick-publish.sh -v patch
   ```

## 🔧 Proje Yapısı

```
.
├── packages/
│   ├── core/           # Temel utility ve hook'lar
│   └── components/     # React componentleri
├── scripts/
│   ├── build.sh        # Build script'i
│   ├── publish.sh      # Publish script'i
│   └── quick-publish.sh # Hızlı publish script'i
└── lerna.json          # Lerna konfigürasyonu
```

## 📝 Script Referansı

### Kurulum & Temizlik

- `bootstrap`: Tüm bağımlılıkları yükle
- `install:all`: Yükle + core'u build et
- `clean`: Paket build dosyalarını temizle
- `clean:all`: Her şeyi tamamen temizle

### Build İşlemleri

- `build`: Tüm paketleri build et (stream mode)
- `build:all`: Core + tüm paketleri build et
- `build:core`: Sadece @bearlab/core paketini build et
- `build:components`: Core hariç tüm paketleri build et
- `build:clean`: Temizle + build et
- `build:parallel`: Paralel build
- `build:selective`: Seçmeli build

### Version & Publish

- `version`: Otomatik version (conventional commits)
- `version:patch/minor/major`: Manuel version bump
- `publish:ci`: CI ortamı için publish
- `publish:all`: Build + tüm paketleri publish
- `publish:changed`: Build + sadece değişenleri publish

---

💡 **İpucu:** Geliştirme sırasında `npm run build:all` komutunu kullanarak tüm paketlerinizin düzgün build olduğunu kontrol edin. Publish etmeden önce mutlaka test edin!

chmod +x scripts/\*.sh
