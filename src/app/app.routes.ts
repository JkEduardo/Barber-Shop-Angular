import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Dashboard },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin').then(m => m.Admin),
    children: [
      { path: '', loadComponent: () => import('./features/admin/dash-admin/dash-admin').then(m => m.DashAdmin) },
      { path: 'usuarios', loadComponent: () => import('./features/admin/adm-usuarios/adm-usuarios').then(m => m.AdmUsuarios) },
      { path: 'productos', loadComponent: () => import('./features/admin/adm-productos/adm-productos').then(m => m.AdmProductos) },
      { path: 'marcas', loadComponent: () => import('./features/admin/adm-marcas/adm-marcas').then(m => m.AdmMarcas) },
      { path: 'servicios', loadComponent: () => import('./features/admin/adm-servicios/adm-servicios').then(m => m.AdmServicios) },
      { path: 'historial', loadComponent: () => import('./features/admin/adm-historial/adm-historial').then(m => m.AdmHistorial) },
      { path: 'configuracion', loadComponent: () => import('./features/admin/adm-configuracion/adm-configuracion').then(m => m.AdmConfiguracion) }
    ]
  },
  { path: 'ventas', loadComponent: () => import('./features/ventas/ventas').then(m => m.Ventas) },
  { path: 'compras', loadComponent: () => import('./features/compras/compras').then(m => m.Compras) },
  { path: 'servicio', loadComponent: () => import('./features/servicios/servicios').then(m => m.Servicios) },
  { path: '**', redirectTo: '' }
];