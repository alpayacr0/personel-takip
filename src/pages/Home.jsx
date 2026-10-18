import { useState, useEffect } from "react";
import axios from "axios";
import StatCard from "../Components/StatCard";
import StaffTable from "../Components/StaffTable";
import PersonModal from "../Components/PersonModal";
import { logAction } from "../utils/logger";

const TRIAL_KEY = "trialStaff";
const API_URL = "/staff.json";
const OVERRIDES_KEY = "staffOverrides";

function Home() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);

  const [trialStaff, setTrialStaff] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(TRIAL_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(TRIAL_KEY, JSON.stringify(trialStaff));
  }, [trialStaff]);

  const [overrides, setOverrides] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(OVERRIDES_KEY)) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
  }, [overrides]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setStaff(res.data);
        logAction("Veri alındı", { adet: res.data.length });
      })
      .catch(() => {
        setError("Veri alınamadı.");
        logAction("Veri çekme hatası", { url: API_URL });
      })
      .finally(() => setLoading(false));
  }, []);

  const visiblePermanentStaff = staff.filter((s) => !overrides[s.id]?.deleted);

  const people = [
    ...visiblePermanentStaff.map((s) => ({
      ...s,
      ...overrides[s.id],
      status: "Kalıcı",
    })),
    ...trialStaff.map((t) => ({ ...t, status: "Deneme" })),
  ];

  const handleEdit = (person) => {
    setModal({
      mode: "edit",
      person,
    });
  };

  const handleAdd = () => {
    setModal({
      mode: "add",
      person: null,
    });
  };

  const handleSave = (data) => {
    const { mode, person } = modal;

    if (mode === "add") {
      const newPerson = { id: Date.now(), ...data };
      setTrialStaff([...trialStaff, newPerson]);
      logAction("Yeni çalışan eklendi", newPerson);
    } else if (person.status === "Kalıcı") {
      setOverrides({
        ...overrides,
        [person.id]: { email: data.email, phone: data.phone },
      });
      logAction("Kalıcı çalışan güncellendi", {
        id: person.id,
        ad: person.name,
        email: data.email,
        phone: data.phone,
      });
    } else {
      setTrialStaff(
        trialStaff.map((t) => (t.id === person.id ? { ...t, ...data } : t)),
      );
      logAction("Deneme sürecindeki çalışan güncellendi", {
        id: person.id,
        ...data,
      });
    }

    setModal(null);
  };

  const handleDelete = (person) => {
    if (window.confirm(`${person.name} silinsin mi?`)) {
      if (person.status === "Kalıcı") {
        setOverrides({
          ...overrides,
          [person.id]: { ...overrides[person.id], deleted: true },
        });
      } else {
        setTrialStaff(trialStaff.filter((t) => t.id !== person.id));
      }
      logAction("Çalışan silindi", {
        id: person.id,
        ad: person.name,
        durum: person.status,
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Personel Takip
        </h1>

        {loading && <p className="text-center text-gray-500">Yükleniyor...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                title="Toplam Kadro"
                value={visiblePermanentStaff.length + trialStaff.length}
                color="text-gray-800"
              />
              <StatCard
                title="Kalıcı Kadro"
                value={visiblePermanentStaff.length}
                color="text-green-600"
              />
              <StatCard
                title="Deneme Sürecinde"
                value={trialStaff.length}
                color="text-amber-500"
              />
            </div>

            <StaffTable
              people={people}
              onEdit={handleEdit}
              onAdd={handleAdd}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
      {modal && (
        <PersonModal
          mode={modal.mode}
          person={modal.person}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </main>
  );
}

export default Home;
