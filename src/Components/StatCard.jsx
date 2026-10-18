function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

export default StatCard;
