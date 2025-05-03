import { Package } from "lucide-react";
import TableSkeletonLoader from "@/components/skeletons/TableSkeletonLoader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useTranslation } from "react-i18next";
import { useAppContext } from './AppContext';
import SelectedAppsActions from './SelectedAppsActions';

const AllAppsTab = () => {
    const { t } = useTranslation();
    const { loading, filteredData, columns, onRowSelectionChange } = useAppContext();

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-slate-600" />
                    {t('apps.allApps')}
                </CardTitle>
                <CardDescription>
                    {t('apps.allInstalledApps')}
                </CardDescription>
            </CardHeader>

            <CardContent className="p-3">
                <SelectedAppsActions />

                {loading ? (
                    <TableSkeletonLoader rowCount={10} columnCount={5} />
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        onRowSelectionChange={onRowSelectionChange}
                        rowSelection={true}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default AllAppsTab; 
