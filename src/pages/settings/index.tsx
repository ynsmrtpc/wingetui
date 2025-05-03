import { useState } from "react";
import { 
    CogIcon, Languages, MoonIcon, SunIcon,
    Globe, Palette, Settings2, Bell, Laptop, 
    RefreshCw, Info, ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { languages, changeLanguage } from "@/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const [selectedTheme, setSelectedTheme] = useState("system");
    const [hasChanges, setHasChanges] = useState(false);

    // Dil seçildiğinde
    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value);
        setHasChanges(true);
    };

    // Tema seçildiğinde
    const handleThemeChange = (value: string) => {
        setSelectedTheme(value);
        setHasChanges(true);
    };

    // Ayarları kaydet
    const saveSettings = () => {
        // Dil değişikliğini uygula
        changeLanguage(selectedLanguage);

        // Başarılı bildirimi göster
        toast.success(t('settings.saveSuccess'));

        // Değişiklikler kaydedildi
        setHasChanges(false);
    };

    return (
        <div className="space-y-6 px-1">
            {/* Header Card with Title and Description */}
            <Card className="shadow-md border-none overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <CogIcon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold">{t('settings.title')}</CardTitle>
                            <CardDescription className="text-base">
                                {t('settings.languageDescription')}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Settings Tabs */}
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="general" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>{t('settings.language')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span>{t('settings.apperance')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="flex items-center gap-2">
                        <Settings2 className="h-4 w-4" />
                        <span>{t('settings.advanced')}</span>
                    </TabsTrigger>
                </TabsList>

                {/* General Settings Tab */}
                <TabsContent value="general" className="space-y-4">
                    <Card className="shadow-md border border-primary/10 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                            <div className="flex items-center gap-2">
                                <Languages className="h-5 w-5 text-primary" />
                                <CardTitle>{t('settings.language')}</CardTitle>
                            </div>
                            <CardDescription>
                                {t('settings.languageDescription')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="max-w-md">
                                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t('common.selectLanguage')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(languages).map(([code, { nativeName, flag }]) => (
                                            <SelectItem key={code} value={code}>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">{flag}</span>
                                                    <span>{nativeName}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Settings Tab */}
                <TabsContent value="appearance" className="space-y-4">
                    <Card className="shadow-md border border-primary/10 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                            <div className="flex items-center gap-2">
                                <Palette className="h-5 w-5 text-primary" />
                                <CardTitle>{t('settings.apperance')}</CardTitle>
                            </div>
                            <CardDescription>
                                {t('settings.theme')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div 
                                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer flex flex-col items-center gap-3 ${selectedTheme === 'light' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                                    onClick={() => handleThemeChange('light')}
                                >
                                    <div className="p-3 bg-background rounded-full shadow-sm">
                                        <SunIcon className="h-6 w-6 text-amber-500" />
                                    </div>
                                    <span className="font-medium">{t('settings.light')}</span>
                                </div>

                                <div 
                                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer flex flex-col items-center gap-3 ${selectedTheme === 'dark' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                                    onClick={() => handleThemeChange('dark')}
                                >
                                    <div className="p-3 bg-background rounded-full shadow-sm">
                                        <MoonIcon className="h-6 w-6 text-indigo-500" />
                                    </div>
                                    <span className="font-medium">{t('settings.dark')}</span>
                                </div>

                                <div 
                                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer flex flex-col items-center gap-3 ${selectedTheme === 'system' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                                    onClick={() => handleThemeChange('system')}
                                >
                                    <div className="p-3 bg-background rounded-full shadow-sm">
                                        <Laptop className="h-6 w-6 text-slate-500" />
                                    </div>
                                    <span className="font-medium">{t('settings.system')}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Advanced Settings Tab */}
                <TabsContent value="advanced" className="space-y-4">
                    <Card className="shadow-md border border-primary/10 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                            <div className="flex items-center gap-2">
                                <Settings2 className="h-5 w-5 text-primary" />
                                <CardTitle>{t('settings.advanced')}</CardTitle>
                            </div>
                            <CardDescription>
                                {t('settings.advanced')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div className="flex items-center gap-3">
                                        <RefreshCw className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <Label htmlFor="auto-check" className="font-medium">{t('settings.autoCheckUpdates')}</Label>
                                            <p className="text-sm text-muted-foreground">Automatically check for updates when the app starts</p>
                                        </div>
                                    </div>
                                    <Switch id="auto-check" defaultChecked />
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Laptop className="h-5 w-5 text-green-500" />
                                        <div>
                                            <Label htmlFor="system-startup" className="font-medium">{t('settings.startAtSystemStartup')}</Label>
                                            <p className="text-sm text-muted-foreground">Launch the application when your system starts</p>
                                        </div>
                                    </div>
                                    <Switch id="system-startup" />
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Bell className="h-5 w-5 text-amber-500" />
                                        <div>
                                            <Label htmlFor="notifications" className="font-medium">{t('settings.enableNotifications')}</Label>
                                            <p className="text-sm text-muted-foreground">Show notifications for important events</p>
                                        </div>
                                    </div>
                                    <Switch id="notifications" defaultChecked />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border border-primary/10 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                            <div className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                <CardTitle>{t('settings.about')}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <img src="/icon.svg" alt="WingetUI" className="h-10 w-10" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">WingetUI</h3>
                                        <p className="text-sm text-muted-foreground">{t('settings.version')}: 0.1.1</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <RefreshCw className="h-4 w-4" />
                                    {t('settings.checkForUpdates')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            {hasChanges && (
                <Card className="shadow-md border-none bg-muted/50 sticky bottom-4">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="h-5 w-5 text-green-500" />
                                <span>You have unsaved changes</span>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedLanguage(i18n.language);
                                        setSelectedTheme("system");
                                        setHasChanges(false);
                                    }}
                                >
                                    {t('common.cancel')}
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={saveSettings}
                                    className="gap-1"
                                >
                                    <ShieldCheck className="h-4 w-4" />
                                    {t('common.save')}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Settings; 
