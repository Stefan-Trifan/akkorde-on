// Zonas de Madrid que el usuario puede elegir como punto de partida para calcular distancias
// (donde va a estar antes del plan: casa, trabajo, la cena...). Coordenadas aproximadas.

export const zonas = [
  { nombre: 'Sol', lat: 40.4169, lng: -3.7035 },
  { nombre: 'Plaza de España', lat: 40.4233, lng: -3.7122 },
  { nombre: 'Malasaña', lat: 40.4265, lng: -3.704 },
  { nombre: 'Chueca', lat: 40.4229, lng: -3.6973 },
  { nombre: 'Lavapiés', lat: 40.4089, lng: -3.701 },
  { nombre: 'La Latina', lat: 40.4111, lng: -3.7105 },
  { nombre: 'Atocha', lat: 40.4066, lng: -3.6892 },
  { nombre: 'Retiro', lat: 40.42, lng: -3.6888 },
  { nombre: 'Salamanca (Goya)', lat: 40.4245, lng: -3.676 },
  { nombre: 'Chamberí', lat: 40.433, lng: -3.7 },
  { nombre: 'Argüelles', lat: 40.43, lng: -3.7155 },
  { nombre: 'Moncloa', lat: 40.4349, lng: -3.719 },
  { nombre: 'Nuevos Ministerios', lat: 40.446, lng: -3.692 },
  { nombre: 'Legazpi', lat: 40.391, lng: -3.695 },
]

// Punto de partida al abrir la app
export const UBICACION_INICIAL = zonas[0]
