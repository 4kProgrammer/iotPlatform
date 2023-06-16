import Chart from './Dashboard/Chart';
import Widget from './Dashboard/Widget';
import { useLanguage } from '../context/LanguageContext';
import translate from './utils/i18n';

const Dashboard = () => {
  const { currentLocale } = useLanguage();
  return (
    <div className="w-3/4 p-4">
      <h2 className="mb-4 text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Widget title={translate('sanitaryTemperature', currentLocale)} value={50} />
        <Widget title={translate('returnTemperature', currentLocale)} value={100} />
        <Widget title={translate('wentTemperature', currentLocale)} value={200} />
      </div>
      <div className="mt-8">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;