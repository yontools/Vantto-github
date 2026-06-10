export interface Usuario {
  id: string;
  nombre_completo: string;
  telefono: string | null;
  rol: 'admin' | 'chofer';
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClienteEmpresa {
  id: string;
  razon_social: string;
  cuit: string;
  email_facturacion: string | null;
  telefono_principal: string | null;
  notas: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ObraPunto {
  id: string;
  empresa_id: string; // Relacionado con clientes_empresas.id
  nombre_obra: string;
  direccion: string;
  coordenadas: string | null; // Guardado como string o tipo geográfico serializado
  nombre_referente: string | null;
  whatsapp_referente: string | null;
  condicion_pago: string | null;
  requiere_factura: boolean;
  notas: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ActivoVolquete {
  id: string;
  codigo_interno: string;
  patente: string | null;
  capacidad_m3: number;
  estado: 'disponible' | 'en_uso' | 'en_mantenimiento';
  notas: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface HistorialEstado {
  estado: 'pendiente' | 'en_camino' | 'entregado' | 'por_retirar' | 'urgente_retrasado' | 'cerrado';
  fecha: string;
  usuario_id: string;
  notas?: string;
}

export interface PedidoAlquiler {
  id: string;
  obra_id: string; // Relacionado con obras_puntos.id
  volquete_id: string | null; // Relacionado con activos_volquetes.id
  chofer_id: string | null; // Relacionado con usuarios.id (chofer)
  admin_creador_id: string; // Relacionado con usuarios.id (admin)
  estado: 'pendiente' | 'en_camino' | 'entregado' | 'por_retirar' | 'urgente_retrasado' | 'cerrado';
  fecha_entrega_pactada: string | null;
  fecha_retiro_pactada: string | null;
  fecha_entrega_real: string | null;
  fecha_retiro_real: string | null;
  metodo_pago: string | null;
  monto_pactado: number | null;
  cobrado: boolean;
  fecha_cobro: string | null;
  coordenadas_entrega: string | null;
  foto_interior_url: string | null;
  foto_panoramica_url: string | null;
  foto_remito_url: string | null;
  foto_retiro_url: string | null;
  historial_estados: HistorialEstado[] | null; // Guardado como JSONB
  notas_admin: string | null;
  created_at: string;
  updated_at: string;
}
