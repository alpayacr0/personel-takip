import { useState } from "react";

function PersonModal({ mode, person, onClose, onSave }) {
  const [form, setForm] = useState({
    name: person?.name || "",
    title: person?.title || "",
    email: person?.email || "",
    phone: person?.phone || "",
  });

  const isPermanent = person?.status === "Kalıcı";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleaned = {
      name: form.name.trim(),
      title: form.title.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    if (Object.values(cleaned).some((v) => !v)) return;

    onSave(cleaned);
  };

  const inputClass =
    "w-full border rounded px-3 py-2 disabled:bg-gray-100 disabled:text-gray-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          {mode === "add" ? "Yeni Çalışan Ekle" : "Bilgileri Güncelle"}
        </h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Ad Soyad</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={isPermanent}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Ünvan</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={isPermanent}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">E-posta</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Telefon</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonModal;
