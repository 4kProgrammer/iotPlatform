import Chart from './Dashboard/Chart';
import Widget from './Dashboard/Widget';

const Dashboard = () => {
  return (
    <div className="w-3/4 p-4">
      <h2 className="mb-4 text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Widget title="Widget 1" value={50} />
        <Widget title="Widget 2" value={100} />
        <Widget title="Widget 3" value={200} />
      </div>
      <div className="mt-8">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;