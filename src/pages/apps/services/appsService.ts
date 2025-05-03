import { AppInfo } from "@/components/AppList/columns";

// Uygulama listesini getiren fonksiyon
export async function getData(): Promise<{ data: AppInfo[], error?: string }> {
    try {
        const data = await window.ipcRenderer.invoke('get-installed-apps');

        // Başarılı cevap kontrolü
        if (!data || !Array.isArray(data)) {
            console.error('Unexpected response format from getAppList:', data);
            return {
                data: [],
                error: 'Unexpected response format from getAppList'
            };
        }
        // Her uygulamaya benzersiz bir ID atayalım
        return {
            data: data.map((app) => ({
                ...app,
                selected: false,
            }))
        };
    } catch (error) {
        console.error('Error fetching app list:', error);
        return {
            data: [],
            error: error instanceof Error ? error.message : 'Unknown error fetching app list'
        };
    }
}

// Seçilen uygulamaları güncelleyen fonksiyon
export async function updateSelectedApps(selectedApps: AppInfo[]): Promise<{ success: boolean, results: any[] }> {
    try {
        const results = [];

        // Tüm uygulamalar için isUpdating bayrağını true olarak ayarla
        selectedApps.forEach(app => {
            app.isUpdating = true;
        });

        // Tüm uygulamaları paralel olarak güncelle
        const updatePromises = selectedApps.map(async (app) => {
            try {
                const result = await window.ipcRenderer.invoke('update-app', app.id || app.name);
                return { 
                    app, 
                    result,
                    success: result && result.success
                };
            } catch (error) {
                return { 
                    app, 
                    result: { 
                        success: false, 
                        message: error instanceof Error ? error.message : String(error)
                    },
                    success: false
                };
            } finally {
                // Bu finally bloğu her uygulama için çalışacak, ama isUpdating bayrağını
                // hemen temizlemiyoruz, tüm işlemler bitince temizleyeceğiz
            }
        });

        // Tüm güncelleme işlemlerinin tamamlanmasını bekle
        const updateResults = await Promise.all(updatePromises);

        // Sonuçları işle ve döndür
        updateResults.forEach(({ app, result }) => {
            // Güncelleme tamamlandığında isUpdating bayrağını temizle
            app.isUpdating = false;
            results.push({
                id: app.id,
                name: app.name,
                ...result
            });
        });

        return { 
            success: updateResults.some(r => r.success), 
            results 
        };
    } catch (error) {
        // Genel bir hata durumunda tüm uygulamaların isUpdating bayrağını temizle
        selectedApps.forEach(app => {
            app.isUpdating = false;
        });

        console.error('Error updating apps:', error);
        return { 
            success: false, 
            results: [{ 
                id: 'batch', 
                message: error instanceof Error ? error.message : String(error) 
            }] 
        };
    }
}

// Winget ile uygulama arama
export async function searchApps(keyword: string): Promise<{ data: AppInfo[], error?: string }> {
    if (!keyword || keyword.trim().length < 2) {
        return { data: [] };
    }

    try {
        const data = await window.ipcRenderer.invoke('search-apps', keyword);

        // Başarılı cevap kontrolü
        if (!data || !Array.isArray(data)) {
            console.error('Unexpected response format from searchApps:', data);
            return {
                data: [],
                error: 'Unexpected response format from searchApps'
            };
        }

        return {
            data: data.map((app) => ({
                ...app,
                selected: false,
                isInstalled: false // Başlangıçta yüklü olup olmadığı bilinmiyor
            }))
        };
    } catch (error) {
        console.error('Error searching apps:', error);
        return {
            data: [],
            error: error instanceof Error ? error.message : 'Unknown error searching apps'
        };
    }
}

// Bulunan uygulamalarda hangilerinin zaten yüklü olduğunu işaretler
export function markInstalledApps(searchResults: AppInfo[], installedApps: AppInfo[]): AppInfo[] {
    if (!searchResults || !installedApps) return searchResults;

    // Yüklü uygulamaların ID ve adlarını bir set'e ekle
    const installedIds = new Set();
    const installedNames = new Set();

    installedApps.forEach(app => {
        if (app.id) installedIds.add(app.id.toLowerCase());
        if (app.name) installedNames.add(app.name.toLowerCase());
    });

    // Arama sonuçlarını kontrol et
    return searchResults.map(app => {
        const isInstalled =
            Boolean(app.id && installedIds.has(app.id.toLowerCase())) ||
            Boolean(app.name && installedNames.has(app.name.toLowerCase()));

        return {
            ...app,
            isInstalled
        };
    });
}

// Seçilen uygulamaları yükleyen fonksiyon
export async function installSelectedApps(selectedApps: AppInfo[]): Promise<{ success: boolean, results: any[] }> {
    try {
        const results = [];

        // Tüm uygulamalar için isInstalling bayrağını true olarak ayarla
        selectedApps.forEach(app => {
            app.isInstalling = true;
        });

        // Tüm uygulamaları paralel olarak yükle
        const installPromises = selectedApps.map(async (app) => {
            try {
                const result = await window.ipcRenderer.invoke('install-app', app.id || app.name);
                return { 
                    app, 
                    result,
                    success: result && result.success
                };
            } catch (error) {
                return { 
                    app, 
                    result: { 
                        success: false, 
                        message: error instanceof Error ? error.message : String(error)
                    },
                    success: false
                };
            } finally {
                // Bu finally bloğu her uygulama için çalışacak, ama isInstalling bayrağını
                // hemen temizlemiyoruz, tüm işlemler bitince temizleyeceğiz
            }
        });

        // Tüm yükleme işlemlerinin tamamlanmasını bekle
        const installResults = await Promise.all(installPromises);

        // Sonuçları işle ve döndür
        installResults.forEach(({ app, result}) => {
            // Yükleme tamamlandığında isInstalling bayrağını temizle
            app.isInstalling = false;
            results.push({
                id: app.id,
                name: app.name,
                ...result
            });
        });

        return { 
            success: installResults.some(r => r.success), 
            results 
        };
    } catch (error) {
        // Genel bir hata durumunda tüm uygulamaların isInstalling bayrağını temizle
        selectedApps.forEach(app => {
            app.isInstalling = false;
        });

        console.error('Error installing apps:', error);
        return { 
            success: false, 
            results: [{ 
                id: 'batch', 
                message: error instanceof Error ? error.message : String(error) 
            }] 
        };
    }
}

// Seçilen uygulamaları kaldıran fonksiyon
export async function uninstallApp(app: AppInfo): Promise<any> {
    try {
        if (!app || !app.id) {
            throw new Error('Geçersiz uygulama. Kaldırma işlemi yapılamadı.');
        }

        // Kaldırma işlemi başlamadan önce isUpdating bayrağını ayarla (kaldırma için de aynı animasyonu kullanıyoruz)
        app.isUpdating = true;

        try {
            const result = await window.ipcRenderer.invoke('uninstall-app', app.id);
            return result;
        } finally {
            // İşlem tamamlandığında veya hata oluştuğunda bayrağı temizle
            app.isUpdating = false;
        }
    } catch (error) {
        console.error('Error uninstalling app:', error);
        return Promise.reject(error);
    }
}

// Filtreleme fonksiyonları
export function filterBySearchTerm(apps: AppInfo[], searchTerm: string): AppInfo[] {
    if (!apps) return [];
    if (!searchTerm) return apps;

    return apps.filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

export function filterForUpdates(apps: AppInfo[]): AppInfo[] {
    if (!apps) return [];

    return apps.filter(app => 
        app.newVersion && app.newVersion !== app.version
    );
}

// Winget'i yükleyen fonksiyon
export async function installWinget(): Promise<any> {
    try {
        const result = await window.ipcRenderer.invoke('install-winget');
        return result;
    } catch (error) {
        console.error('Error installing winget:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error installing winget'
        };
    }
}
