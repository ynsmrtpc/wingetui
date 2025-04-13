import { Cog, Home, LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SidebarData = () => {
  const { t } = useTranslation();
  
    return {
        nav: [
      {
        title: t('common.home'),
        href: "/",
        icon: Home,
      },
      {
        title: t('common.apps'),
        href: "/apps",
        icon: LayoutGrid,
      },
      {
        title: t('common.settings'),
        href: "/settings",
        icon: Cog,
    }
    ]
  };
};