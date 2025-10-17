import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'todo.items.v1'

export default function App() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [] } catch { return [] }
  })
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all') // all | open | done
  const left = useMemo(() => items.filter(i => !i.done).length, [items])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(e) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setItems(prev => [...prev, { id: crypto.randomUUID(), text: t, done: false }])
    setText('')
  }
  function toggle(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i))
  }
  function remove(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }
  function edit(id, newText) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, text: newText } : i))
  }
  function clearDone() {
    setItems(prev => prev.filter(i => !i.done))
  }

  const visible = items.filter(i =>
    filter === 'all' ? true : filter === 'open' ? !i.done : i.done
  )

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>To-Do</h1>
        <span style={styles.counter}>{left} restante(s)</span>
      </header>

      <form onSubmit={addItem} style={styles.addRow}>
        <input
          style={styles.input}
          placeholder="O que precisa fazer?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button style={styles.addBtn} type="submit">+</button>
      </form>

      <div style={styles.filters}>
        <FilterButton active={filter==='all'} onClick={()=>setFilter('all')}>Todos</FilterButton>
        <FilterButton active={filter==='open'} onClick={()=>setFilter('open')}>A fazer</FilterButton>
        <FilterButton active={filter==='done'} onClick={()=>setFilter('done')}>Feitos</FilterButton>
      </div>

      <ul style={styles.list}>
        {visible.map(item => (
          <li key={item.id} style={styles.item}>
            <label style={styles.itemLeft}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
              />
              <EditableText
                text={item.text}
                onChange={(t)=>edit(item.id, t)}
                done={item.done}
              />
            </label>
            <button onClick={() => remove(item.id)} style={styles.deleteBtn}>✕</button>
          </li>
        ))}
        {visible.length === 0 && (
          <li style={{textAlign:'center', opacity:.6, padding:'20px 0'}}>Nada por aqui…</li>
        )}
      </ul>

      <footer style={styles.footer}>
        <button onClick={clearDone} style={styles.clearBtn}>Limpar concluídos</button>
      </footer>
    </div>
  )
}

function EditableText({ text, onChange, done }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(text)
  useEffect(() => setValue(text), [text])

  if (!editing) {
    return (
      <span
        onDoubleClick={() => setEditing(true)}
        style={{...styles.text, ...(done ? styles.textDone : {})}}
      >
        {text}
      </span>
    )
  }

  return (
    <input
      autoFocus
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={() => { onChange(value.trim() || text); setEditing(false) }}
      onKeyDown={e => {
        if (e.key === 'Enter') { onChange(value.trim() || text); setEditing(false) }
        if (e.key === 'Escape') { setValue(text); setEditing(false) }
      }}
      style={styles.editInput}
    />
  )
}

function FilterButton({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      style={{...styles.filterBtn, ...(active ? styles.filterBtnActive : {})}}>
      {children}
    </button>
  )
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f6f7fb',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, -apple-system, Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  title: { margin: 0 },
  counter: { opacity: .7 },
  addRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 12
  },
  input: {
    flex: 1,
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid #ddd',
    outline: 'none',
    fontSize: 16
  },
  addBtn: {
    width: 48,
    border: 'none',
    borderRadius: 8,
    background: '#4f46e5',
    color: '#fff',
    fontSize: 24,
    cursor: 'pointer'
  },
  filters: {
    display: 'flex',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer'
  },
  filterBtnActive: {
    borderColor: '#4f46e5',
    color: '#4f46e5',
    fontWeight: 600
  },
  list: {
    listStyle: 'none',
    flex: 1,
    overflowY: 'auto',
    margin: 0,
    padding: 0,
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f2'
  },
  itemLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  text: { userSelect: 'none' },
  textDone: { textDecoration: 'line-through', opacity: .6 },
  deleteBtn: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 18,
    opacity: .6
  },
  editInput: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: '6px 8px',
    outline: 'none'
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 8
  },
  clearBtn: {
    border: '1px dashed #bbb',
    background: 'transparent',
    borderRadius: 8,
    padding: '8px 12px',
    cursor: 'pointer'
  }
}
