'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://TU_PROJECT_ID.supabase.co",
  "TU_PUBLIC_ANON_KEY"
)

export default function Home() {
  const [ventas, setVentas] = useState([])
  const [producto, setProducto] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [precio, setPrecio] = useState('')

  async function cargarVentas() {
    const { data } = await supabase
      .from('ventas')
      .select('*')
      .order('created_at', { ascending: false })

    setVentas(data || [])
  }

  async function agregarVenta() {
    if (!producto || !cantidad || !precio) return

    await supabase.from('ventas').insert([
      {
        producto,
        cantidad: Number(cantidad),
        precio: Number(precio)
      }
    ])

    setProducto('')
    setCantidad('')
    setPrecio('')
    cargarVentas()
  }

  useEffect(() => {
    cargarVentas()
  }, [])

  const total = ventas.reduce(
    (sum, v) => sum + v.cantidad * v.precio,
    0
  )

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>Sistema de Ventas - Tortas Elio</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Producto"
          value={producto}
          onChange={e => setProducto(e.target.value)}
        />
        <input
          placeholder="Cantidad"
          type="number"
          value={cantidad}
          onChange={e => setCantidad(e.target.value)}
        />
        <input
          placeholder="Precio"
          type="number"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
        />
        <button onClick={agregarVenta}>Agregar</button>
      </div>

      <h2>Ventas</h2>
      <ul>
        {ventas.map(v => (
          <li key={v.id}>
            {v.producto} - {v.cantidad} x ${v.precio}
          </li>
        ))}
      </ul>

      <h2>Total: ${total}</h2>
    </div>
  )
}
