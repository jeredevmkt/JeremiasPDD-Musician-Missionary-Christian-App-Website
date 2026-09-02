'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Song = { id: string; title: string; artist: string; album: string; audio_url: string; cover_url: string }
type Performance = { id: string; title: string; date: string; hebrew_date: string | null; location: string; ticket_url: string }
type Playback = { id: string; title: string; genre: string; price: number; audio_url: string }
type Message = { id: string; name: string; email: string; subject: string; message: string; created_at: string }

function formatGregorianDate(dateStr: string) {
  const d = new Date(dateStr)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${dd}.${mm}.${d.getFullYear()}`
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('songs')
  const [songs, setSongs] = useState<Song[]>([])
  const [performances, setPerformances] = useState<Performance[]>([])
  const [playbacks, setPlaybacks] = useState<Playback[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState<any>({})
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const tabs = [
    { id: 'songs', label: 'שירים' },
    { id: 'performances', label: 'הופעות' },
    { id: 'playbacks', label: 'פליבקים' },
    { id: 'messages', label: 'הודעות' },
  ]

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true'
    if (!isAuth) router.push('/admin')
    else setAuthenticated(true)
  }, [router])

  useEffect(() => {
    if (authenticated) fetchData()
  }, [authenticated, activeTab])

  const fetchData = async () => {
    setLoading(true)
    if (activeTab === 'songs') {
      const { data } = await supabase.from('songs').select('*').order('created_at', { ascending: false })
      setSongs(data || [])
    } else if (activeTab === 'performances') {
      const { data } = await supabase.from('performances').select('*').order('date', { ascending: true })
      setPerformances(data || [])
    } else if (activeTab === 'playbacks') {
      const { data } = await supabase.from('playbacks').select('*').order('created_at', { ascending: false })
      setPlaybacks(data || [])
    } else if (activeTab === 'messages') {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
      setMessages(data || [])
    }
    setLoading(false)
  }

  const handleUploadAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const fileExtension = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`

    const { error: uploadError } = await supabase.storage
      .from('songs')
      .upload(fileName, file, { upsert: true })

    if (uploadError) {
      alert('שגיאה: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('songs')
      .getPublicUrl(fileName)

    // שמירת ה-URL ישירות ב-form state
    setForm((prev: any) => {
      const updated = { ...prev, audio_url: urlData.publicUrl }
      return updated
    })

    alert('✅ הקובץ עלה! עכשיו לחצי שמור.')
    setUploading(false)
  }

  const handleSave = async () => {
    setLoading(true)
    const table = activeTab
    if (editItem?.id) {
      await supabase.from(table).update(form).eq('id', editItem.id)
    } else {
      await supabase.from(table).insert(form)
    }
    setShowForm(false)
    setEditItem(null)
    setForm({})
    fetchData()
  }

  /*const handleDelete = async (id: string) => {
    if (!confirm('למחוק?')) return
    const table = activeTab === 'songs' ? 'songs' : activeTab === 'performances' ? 'performances' : 'playbacks'
    await supabase.from(table).delete().eq('id', id)
    fetchData()
  }*/
  const handleDelete = async (id: string) => {
    if (!confirm('למחוק?')) return
    await supabase.from(activeTab).delete().eq('id', id)
    fetchData()
  }

  const handleEdit = (item: any) => {
    setEditItem(item)
    setForm(item)
    setShowForm(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    router.push('/admin')
  }

  if (!authenticated) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-[#0f0f1e] text-white">

      {/* Header + Tabs */}
      <header className="bg-[#0f0f1e]/95 border-b border-white/10 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-[#FF4B6E]">Site Management</h1>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition">
              Logout
            </button>
          </div>
          <div className="flex gap-8">
            {tabs.map(t => (
              <button key={t.id} onClick={() => { setActiveTab(t.id); setShowForm(false) }}
                className={`pb-3 font-semibold text-sm transition border-b-2 ${activeTab === t.id
                    ? 'text-[#FF4B6E] border-[#FF4B6E]'
                    : 'text-gray-400 border-transparent hover:text-white'
                  }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Add button */}
        {activeTab !== 'messages' && !showForm && (
          <button onClick={() => { setShowForm(true); setEditItem(null); setForm({}) }}
            className="mb-6 px-6 py-2.5 bg-[#FF4B6E] hover:bg-[#e03d5f] rounded-xl text-sm font-semibold transition">
            + Add New
          </button>
        )}

        {/* Form */}
        {showForm && activeTab !== 'messages' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold mb-5">{editItem?.id ? 'Edit Item' : 'Add New Item'}</h3>

            {activeTab === 'songs' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Song Title *</label>
                  <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Artist</label>
                  <input value={form.artist || ''} onChange={e => setForm({ ...form, artist: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Album</label>
                  <input value={form.album || ''} onChange={e => setForm({ ...form, album: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Song Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const fileExt = file.name.split('.').pop()
                      const fileName = `${Date.now()}.${fileExt}`
                      const { data, error } = await supabase.storage
                        .from('images')
                        .upload(fileName, file)
                      if (error) { alert('Upload error'); return }
                      const { data: urlData } = supabase.storage
                        .from('images')
                        .getPublicUrl(fileName)
                      setForm({ ...form, cover_url: urlData.publicUrl })
                    }}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]"
                  />
                  {form.cover_url && (
                    <img src={form.cover_url} className="mt-2 w-16 h-16 rounded-lg object-cover" alt="Preview" />
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Upload Song File (MP3)</label>
                  <input type="file" accept="audio/*" onChange={handleUploadAudio}
                    className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#FF4B6E] file:text-white file:cursor-pointer" />
                  {uploading && <p className="text-[#FF4B6E] text-xs mt-1">Uploading file...</p>}
                  {form.audio_url && <p className="text-green-400 text-xs mt-1">✓ File uploaded successfully</p>}
                </div>
              </div>
            )}

            {activeTab === 'performances' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Performance Name *</label>
                  <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date *</label>
                  <input type="date" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Hebrew Date (e.g., 14 Av)</label>
                  <input value={form.hebrew_date || ''} onChange={e => setForm({ ...form, hebrew_date: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Location</label>
                  <input value={form.location || ''} onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Ticket Link</label>
                  <input value={form.ticket_url || ''} onChange={e => setForm({ ...form, ticket_url: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
              </div>
            )}

            {activeTab === 'playbacks' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Backing Track Name *</label>
                  <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Genre</label>
                  <input value={form.genre || ''} onChange={e => setForm({ ...form, genre: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price ($)</label>
                  <input type="number" value={form.price || ''} onChange={e => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Upload Backing Track File (MP3)</label>
                  <input type="file" accept="audio/*" onChange={handleUploadAudio}
                    className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#FF4B6E] file:text-white file:cursor-pointer" />
                  {uploading && <p className="text-[#FF4B6E] text-xs mt-1">Uploading file...</p>}
                  {form.audio_url && <p className="text-green-400 text-xs mt-1">✓ File uploaded successfully</p>}
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Project Title *</label>
                  <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <input value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm outline-none focus:border-[#FF4B6E]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Upload Audio File (MP3)</label>
                  <input type="file" accept="audio/*" onChange={handleUploadAudio}
                    className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#FF4B6E] file:text-white file:cursor-pointer" />
                  {uploading && <p className="text-[#FF4B6E] text-xs mt-1">Uploading file...</p>}
                  {form.audio_url && <p className="text-green-400 text-xs mt-1">✓ File uploaded successfully</p>}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={uploading}
                className="px-6 py-2 bg-[#FF4B6E] hover:bg-[#e03d5f] rounded-lg text-sm font-semibold transition disabled:opacity-50">
                Save
              </button>
              <button onClick={() => { setShowForm(false); setEditItem(null); setForm({}) }}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading && <p className="text-gray-400">Loading...</p>}

        {/* Songs */}
        {activeTab === 'songs' && !loading && (
          <div className="space-y-3">
            {songs.length === 0 && <p className="text-gray-400">No songs available yet</p>}
            {songs.map(s => (
              <div key={s.id} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {s.cover_url && <img src={s.cover_url} className="w-12 h-12 rounded-lg object-cover" alt={s.title} />}
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-gray-400 text-sm">{s.artist}{s.album && ` • ${s.album}`}</p>
                    {s.audio_url && (
                      <audio controls src={s.audio_url} className="mt-2 h-8" />
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(s)} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-sm transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Performances */}
        {activeTab === 'performances' && !loading && (
          <div className="space-y-3">
            {performances.length === 0 && <p className="text-gray-400">No shows available yet</p>}
            {performances.map(p => (
              <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-gray-400 text-sm">
                    {[p.hebrew_date?.trim(), formatGregorianDate(p.date)].filter(Boolean).join(' | ')}
                    {p.location && ` • ${p.location}`}
                  </p>
                  {p.ticket_url && <a href={p.ticket_url} target="_blank" className="text-[#FF4B6E] text-xs">Ticket Link ↗</a>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-sm transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Playbacks */}
        {activeTab === 'playbacks' && !loading && (
          <div className="space-y-3">
            {playbacks.length === 0 && <p className="text-gray-400">No backing tracks available yet</p>}
            {playbacks.map(p => (
              <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-gray-400 text-sm">{p.genre && `${p.genre} • `}{p.price && `$${p.price}`}</p>
                  {p.audio_url && <audio controls src={p.audio_url} className="mt-2 h-8" />}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-sm transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Messages */}
        {activeTab === 'messages' && !loading && (
          <div className="space-y-3">
            {messages.length === 0 && <p className="text-gray-400">No messages available yet</p>}
            {messages.map(m => (
              <div key={m.id} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-start justify-between gap-4">

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold">{m.name}</p>
                    {/* Cambiado de 'he-IL' a 'en-US' para internacionalizar la fecha del mensaje */}
                    <p className="text-gray-400 text-xs">{new Date(m.created_at).toLocaleDateString('en-US')}</p>
                  </div>
                  <p className="text-[#FF4B6E] text-sm mb-1">{m.email}</p>
                  {m.subject && <p className="text-gray-300 text-sm font-medium mb-1">{m.subject}</p>}
                  <p className="text-gray-400 text-sm">{m.message}</p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="px-3 py-1 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}