function StaffTable({ people, onEdit, onAdd, onDelete }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Personel Listesi
        </h2>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          + Yeni Çalışan Ekle
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">Ad Soyad</th>
              <th className="px-4 py-3">Ünvan</th>
              <th className="px-4 py-3">E-posta</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {people.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  Kayıtlı çalışan yok.
                </td>
              </tr>
            )}
            {people.map((p) => (
              <tr key={`${p.status}-${p.id}`} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {p.name}
                </td>
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3">{p.email}</td>
                <td className="px-4 py-3">{p.phone}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.status === "Kalıcı"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffTable;
