import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CrestLogo } from '../../components/Logos'
import ResourceManager from '../../components/admin/ResourceManager'
import AdminsManager from '../../components/admin/AdminsManager'
import { useAuth } from '../../context/AuthContext'
import { useContent } from '../../hooks/useContent'
import { formatDate } from '../../lib/utils'

const CATEGORY_OPTIONS = [
  { value: 'office_bearer', label: 'Office Bearer / Council' },
  { value: 'senior', label: 'Senior / Coordinator' },
  { value: 'board', label: 'Board of Directors' },
  { value: 'faculty', label: 'Faculty Coordinator' },
  { value: 'general', label: 'General Member' },
]

export default function Dashboard() {
  const { admin, isSuperAdmin, signOut, configured } = useAuth()
  const { tenures } = useContent()
  const [tab, setTab] = useState('events')

  const tenureOptions = useMemo(
    () =>
      [...tenures]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((t) => ({ value: t.id, label: t.label })),
    [tenures],
  )

  const TABS = [
    { id: 'events', label: 'Events' },
    { id: 'members', label: 'Members' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'tenures', label: 'Tenures' },
    { id: 'admins', label: 'Admins' },
  ]

  return (
    <div className="min-h-screen bg-night-950">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-night-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <CrestLogo className="h-10 w-10" />
            <div className="leading-tight">
              <p className="font-serif text-base font-semibold text-cream">Admin Dashboard</p>
              <p className="text-[11px] text-gold">Leo Club of REC</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-cream/60 sm:inline">
              {admin?.email}{' '}
              {isSuperAdmin && <span className="chip ml-1">super-admin</span>}
            </span>
            <Link to="/" className="btn-ghost !px-3 !py-1.5 text-sm">
              View site
            </Link>
            <button onClick={signOut} className="btn-outline !px-4 !py-1.5 text-sm">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl gap-8 px-5 py-8 lg:flex">
        {/* Sidebar */}
        <aside className="mb-6 lg:mb-0 lg:w-56 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm font-medium transition ${
                  tab === t.id
                    ? 'bg-gold/15 text-gold'
                    : 'text-cream/65 hover:bg-white/5 hover:text-cream'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {!configured && (
            <div className="mb-6 rounded-xl border border-gold/30 bg-gold/5 p-4 text-sm text-cream/75">
              <strong className="text-gold">Demo mode.</strong> Connect Supabase to persist changes.
            </div>
          )}

          {tab === 'events' && (
            <ResourceManager
              table="events"
              title="Events"
              sortBy={{ key: 'date', dir: 'desc' }}
              listColumns={[
                { key: 'name', label: 'Name' },
                { key: 'date', label: 'Date', render: (r) => formatDate(r.date, r.end_date) },
                { key: 'venue', label: 'Venue' },
                { key: 'featured', label: 'Signature' },
              ]}
              emptyRow={{
                name: '', date: '', end_date: '', venue: '', lead: '', tenure: '',
                description: '', highlights: [], poster_url: null, featured: false, slug: '',
              }}
              fields={[
                { key: 'name', label: 'Event name', type: 'text', placeholder: 'e.g. Shrestha 6.0' },
                { key: 'date', label: 'Date', type: 'date', half: true },
                { key: 'end_date', label: 'End date (optional)', type: 'date', half: true },
                { key: 'venue', label: 'Venue', type: 'text', half: true },
                { key: 'lead', label: 'Event lead', type: 'text', half: true },
                { key: 'tenure', label: 'Tenure', type: 'select', options: tenureOptions, half: true },
                { key: 'slug', label: 'Slug (for gallery grouping)', type: 'text', half: true, help: 'lowercase, e.g. shrestha-6' },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'highlights', label: 'Highlights', type: 'tags', help: 'One highlight per line' },
                { key: 'poster_url', label: 'Poster / photo', type: 'image', folder: 'events' },
                { key: 'featured', label: 'Signature event?', type: 'checkbox', checkboxLabel: 'Highlight as a signature event' },
              ]}
            />
          )}

          {tab === 'members' && (
            <ResourceManager
              table="members"
              title="Members"
              sortBy={{ key: 'sort_order', dir: 'asc' }}
              listColumns={[
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' },
                { key: 'category', label: 'Category' },
                { key: 'tenure', label: 'Tenure' },
              ]}
              emptyRow={{ name: '', role: '', category: 'general', tenure: tenureOptions[0]?.value || '', photo_url: null, sort_order: 100 }}
              fields={[
                { key: 'name', label: 'Name', type: 'text', half: true },
                { key: 'role', label: 'Role', type: 'text', half: true, placeholder: 'e.g. President' },
                { key: 'category', label: 'Category', type: 'select', options: CATEGORY_OPTIONS, half: true },
                { key: 'tenure', label: 'Tenure', type: 'select', options: tenureOptions, half: true },
                { key: 'sort_order', label: 'Display order', type: 'number', half: true, help: 'Lower shows first' },
                { key: 'photo_url', label: 'Photo', type: 'image', folder: 'members' },
              ]}
            />
          )}

          {tab === 'gallery' && (
            <ResourceManager
              table="gallery"
              title="Gallery photos"
              sortBy={{ key: 'sort_order', dir: 'asc' }}
              listColumns={[
                { key: 'title', label: 'Title' },
                { key: 'group', label: 'Group' },
                { key: 'year', label: 'Year' },
                { key: 'image_url', label: 'Image', render: (r) => (r.image_url ? '✓' : '—') },
              ]}
              emptyRow={{ title: '', group: '', year: '', image_url: null, sort_order: 100 }}
              fields={[
                { key: 'image_url', label: 'Photo', type: 'image', folder: 'gallery' },
                { key: 'title', label: 'Caption / title', type: 'text', half: true },
                { key: 'group', label: 'Group (event/album)', type: 'text', half: true, help: 'e.g. Shrestha ’25' },
                { key: 'year', label: 'Year', type: 'text', half: true, placeholder: '2025' },
                { key: 'sort_order', label: 'Display order', type: 'number', half: true },
              ]}
            />
          )}

          {tab === 'announcements' && (
            <ResourceManager
              table="announcements"
              title="Announcements"
              sortBy={{ key: 'date', dir: 'desc' }}
              listColumns={[
                { key: 'title', label: 'Title' },
                { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
                { key: 'active', label: 'Active' },
              ]}
              emptyRow={{ title: '', body: '', date: '', active: true }}
              fields={[
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'body', label: 'Message', type: 'textarea' },
                { key: 'date', label: 'Date', type: 'date', half: true },
                { key: 'active', label: 'Show on site?', type: 'checkbox', checkboxLabel: 'Active', half: true },
              ]}
            />
          )}

          {tab === 'achievements' && (
            <ResourceManager
              table="achievements"
              title="Achievements"
              sortBy={{ key: 'sort_order', dir: 'asc' }}
              listColumns={[
                { key: 'title', label: 'Title' },
                { key: 'value', label: 'Value' },
              ]}
              emptyRow={{ title: '', value: '', description: '', sort_order: 100 }}
              fields={[
                { key: 'title', label: 'Title', type: 'text', half: true },
                { key: 'value', label: 'Highlight value', type: 'text', half: true, placeholder: 'e.g. 5.0 or 8+' },
                { key: 'sort_order', label: 'Display order', type: 'number', half: true },
                { key: 'description', label: 'Description', type: 'textarea' },
              ]}
            />
          )}

          {tab === 'tenures' && (
            <ResourceManager
              table="tenures"
              title="Tenures"
              keepId
              sortBy={{ key: 'sort_order', dir: 'asc' }}
              listColumns={[
                { key: 'id', label: 'ID' },
                { key: 'label', label: 'Label' },
                { key: 'is_current', label: 'Current' },
              ]}
              emptyRow={{ id: '', label: '', is_current: false, sort_order: 1 }}
              fields={[
                { key: 'id', label: 'ID', type: 'text', half: true, placeholder: '2027-28', help: 'Used to tag members & events' },
                { key: 'label', label: 'Label', type: 'text', half: true, placeholder: '2027 – 28' },
                { key: 'sort_order', label: 'Display order', type: 'number', half: true },
                { key: 'is_current', label: 'Current tenure?', type: 'checkbox', checkboxLabel: 'This is the current tenure', half: true },
              ]}
            />
          )}

          {tab === 'admins' && <AdminsManager />}
        </div>
      </div>
    </div>
  )
}
