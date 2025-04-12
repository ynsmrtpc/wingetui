import { useState } from "react";
import { CogIcon, Languages, MoonIcon, SunIcon, PowerIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { languages, changeLanguage } from "@/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            <Card className="shadow-lg rounded-lg">
                <CardHeader className="bg-gradient-to-r from-slate-500/10 to-slate-700/10">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <CogIcon className="h-6 w-6 text-slate-600" />
                        {t('settings.title')}
                    </CardTitle>
                    <CardDescription>
                        {t('settings.languageDescription')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {/* Dil Ayarları */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium">{t('settings.language')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('settings.languageDescription')}
                                </p>
                            </div>
                            <Languages className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div className="max-w-xs">
                            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.selectLanguage')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(languages).map(([code, { nativeName, flag }]) => (
                                        <SelectItem key={code} value={code}>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{flag}</span>
                                                <span>{nativeName}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Görünüm Ayarları */}
                    <div className="pt-4 border-t space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium">{t('settings.apperance')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('settings.theme')}
                                </p>
                            </div>
                            <MoonIcon className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div className="max-w-xs">
                            <Select value={selectedTheme} onValueChange={handleThemeChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('settings.theme')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">
                                        <div className="flex items-center gap-2">
                                            <SunIcon className="h-4 w-4" />
                                            <span>{t('settings.light')}</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="dark">
                                        <div className="flex items-center gap-2">
                                            <MoonIcon className="h-4 w-4" />
                                            <span>{t('settings.dark')}</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="system">
                                        <div className="flex items-center gap-2">
                                            <PowerIcon className="h-4 w-4" />
                                            <span>{t('settings.system')}</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Gelişmiş Ayarlar */}
                    <div className="pt-4 border-t space-y-4 hidden">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{t('settings.advanced')}</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="auto-check">{t('settings.autoCheckUpdates')}</Label>
                                </div>
                                <Switch id="auto-check" defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="system-startup">{t('settings.startAtSystemStartup')}</Label>
                                </div>
                                <Switch id="system-startup" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="notifications">{t('settings.enableNotifications')}</Label>
                                </div>
                                <Switch id="notifications" defaultChecked />
                            </div>
                        </div>
                    </div>

                    {/* Butonlar */}
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedLanguage(i18n.language);
                                setSelectedTheme("system");
                                setHasChanges(false);
                            }}
                            disabled={!hasChanges}
                        >
                            {t('common.cancel')}
                        </Button>
                        <Button
                            onClick={saveSettings}
                            disabled={!hasChanges}
                        >
                            {t('common.save')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Settings; 