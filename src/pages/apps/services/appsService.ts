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
export async function updateSelectedApps(selectedApps: AppInfo[]): Promise<void> {
    try {
        // Her bir seçili uygulama için update çağrısı yapabiliriz
        for (const app of selectedApps) {
            await window.ipcRenderer.invoke('update-app', app.id || app.name);
        }

        return Promise.resolve();
    } catch (error) {
        console.error('Error updating apps:', error);
        return Promise.reject(error);
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
            (app.id && installedIds.has(app.id.toLowerCase())) || 
            (app.name && installedNames.has(app.name.toLowerCase()));
        
        return {
            ...app,
            isInstalled
        };
    });
}

// Seçilen uygulamaları yükleyen fonksiyon
export async function installSelectedApps(selectedApps: AppInfo[]): Promise<void> {
    try {
        // Her bir seçili uygulama için install çağrısı yapabiliriz
        for (const app of selectedApps) {
            await window.ipcRenderer.invoke('install-app', app.id || app.name);
        }

        return Promise.resolve();
    } catch (error) {
        console.error('Error installing apps:', error);
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