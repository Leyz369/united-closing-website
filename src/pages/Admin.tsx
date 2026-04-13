import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  availability: string;
  goals: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function loadSubmissions() {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      loadSubmissions();
    } catch (err) {
      alert('Fehler beim Aktualisieren');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06070A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#7AA2FF] border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-white/70">Lade Anfragen...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06070A] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Kontaktanfragen</h1>
            <p className="text-white/60 mt-1">Alle eingegangenen Anfragen im Überblick</p>
          </div>
          <button
            onClick={loadSubmissions}
            className="px-4 py-2 bg-[#7AA2FF] hover:bg-[#6b92e8] text-white rounded-xl transition"
          >
            Aktualisieren
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-white/50">
              Noch keine Anfragen vorhanden
            </div>
          ) : (
            submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{sub.name}</h3>
                    <div className="text-sm text-white/60 mt-1">
                      {new Date(sub.created_at).toLocaleString('de-DE')}
                    </div>
                  </div>
                  <select
                    value={sub.status}
                    onChange={(e) => updateStatus(sub.id, e.target.value)}
                    className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white"
                  >
                    <option value="new">Neu</option>
                    <option value="contacted">Kontaktiert</option>
                    <option value="completed">Abgeschlossen</option>
                  </select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="text-xs text-[#7AA2FF] mb-1">E-Mail</div>
                    <a
                      href={`mailto:${sub.email}`}
                      className="text-sm text-white hover:text-[#7AA2FF] transition"
                    >
                      {sub.email}
                    </a>
                  </div>
                  {sub.phone && (
                    <div>
                      <div className="text-xs text-[#7AA2FF] mb-1">Telefon</div>
                      <a
                        href={`tel:${sub.phone}`}
                        className="text-sm text-white hover:text-[#7AA2FF] transition"
                      >
                        {sub.phone}
                      </a>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-[#7AA2FF] mb-1">Verfügbarkeit</div>
                    <div className="text-sm text-white">{sub.availability}</div>
                  </div>
                </div>

                {sub.goals && (
                  <div className="mt-3">
                    <div className="text-xs text-[#7AA2FF] mb-1">Ziele</div>
                    <div className="text-sm text-white/80 bg-white/5 rounded-lg p-3">
                      {sub.goals}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
