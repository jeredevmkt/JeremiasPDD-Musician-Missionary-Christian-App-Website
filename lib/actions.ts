"use server" // Enlaza el código para que corra estrictamente en el servidor

import { neon } from '@neondatabase/serverless'
import { Song } from '../app/songs/page' // Importa la interfaz Song desde el archivo de canciones
import { TestimonyItem } from '../app/testimonies/page'
import { Performance } from '../app/performances/page'

const sql = neon(process.env.DATABASE_URL || '')

// Función segura para traer los playbacks
export async function getPlaybacksAction() {
  try {
    const data = await sql`
      SELECT * FROM playbacks 
      ORDER BY created_at DESC
    `
    return { success: true, data } // Devuelve directamente el arreglo limpio
  } catch (error) {
    console.error("Error en el servidor:", error)
    return { success: false, data: [] }
  }
}

export async function getSongsAction() {
  try {
    // 1. Ejecutamos la consulta de forma normal
    const result = await sql`
      SELECT * FROM songs 
      ORDER BY created_at DESC
    `
    
    // 2. Le decimos a TypeScript que trate a "result" como un arreglo de tipo Song
    const data = result as Song[]
    
    return { success: true, data }
  } catch (error) {
    console.error("Error al obtener canciones en el servidor:", error)
    return { success: false, data: [] }
  }
}

export async function getTestimoniesAction() {
  try {
    // Traemos la tabla completa limpia desde Neon
    const result = await sql`
      SELECT * FROM testimonies
    `
    const data = result as TestimonyItem[]
    return { success: true, data }
  } catch (error) {
    console.error("Error crítico leyendo Neon en el servidor:", error)
    return { success: false, data: [] }
  }
}

export async function subscribeNewsletterAction(email: string, phone: string | null) {
  try {
    await sql`
      INSERT INTO newsletter_subscribers (email, phone)
      VALUES (${email}, ${phone})
    `
    return { success: true, errorCode: null }
  } catch (error: any) {
    console.error("Error en el servidor al suscribir:", error)
    // Pasamos el código de error para detectar si es un correo duplicado (23505)
    return { success: false, errorCode: error?.code || null }
  }
}

export async function getPerformancesAction() {
  try {
    // Consultamos la tabla performances ordenada por fecha de forma ascendente (ASC)
    const result = await sql`
      SELECT * FROM performances 
      ORDER BY date ASC
    `
    const data = result as Performance[]
    return { success: true, data }
  } catch (error) {
    console.error("Error al obtener presentaciones en el servidor:", error)
    return { success: false, data: [] }
  }
}

export async function sendContactMessageAction(formData: { name: string; email: string; subject: string; message: string }) {
  try {
    await sql`
      INSERT INTO messages (name, email, subject, message)
      VALUES (${formData.name}, ${formData.email}, ${formData.subject}, ${formData.message})
    `
    return { success: true }
  } catch (error) {
    console.error("Error en el servidor al guardar mensaje de contacto:", error)
    return { success: false }
  }
}