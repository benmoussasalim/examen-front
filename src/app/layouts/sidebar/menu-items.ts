import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/app/dashboard',
    title: 'Dashboard',
    icon: 'mdi mdi-dots-horizontal',
    class: '',
    extralink: false,
    submenu: [],
    role: ['ROLE_ADMIN', 'ROLE_ENTREPRISE', 'ROLE_CANDIDAT']
  },
  {
    path: '',
    title: 'Personnes',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: [],
    role: ['ROLE_ADMIN']
  },
  {
    path: '/app/user/candidat',
    title: 'Candidats',
    icon: 'icon-Student-Male',
    class: '',
    extralink: false,
    submenu: [],
    role: ['ROLE_ADMIN']
  },
  {
    path: '/app/user/entreprise',
    title: 'Entreprises',
    icon: 'icon-Teacher',
    class: '',
    extralink: false,
    submenu: [],
    role: ['ROLE_ADMIN']
  },
  {
    path: '',
    title: 'Fonctionalités',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: [],
    role: ['ROLE_ADMIN', 'ROLE_ENTREPRISE', 'ROLE_CANDIDAT']
  },
  {
    path: '/app/features/question',
    title: 'Questions',
    icon: 'fas fa-book',
    class: '',
    extralink: false,
    submenu: [],
    role: ['ROLE_ADMIN']
  },
  {
    path: '/app/features/examen',
    title: 'Examens',
    icon: 'fas fa-file-alt',
    class: '',
    extralink: false,
    submenu: [],
    role: ['ROLE_ENTREPRISE']
  },
  {
    path: '/app/features/participation-entreprise',
    title: 'Participations',
    icon: 'fas fa-clipboard-list',
    class: '',
    extralink: false,
    submenu: [],
    role: ['ROLE_ENTREPRISE']
  },
  {
    path: '/app/features/examen/not-expired',
    title: 'Examens',
    icon: 'fas fa-file-alt',
    class: '',
    extralink: false,
    submenu: [],
    role: ['ROLE_CANDIDAT']
  },
  {
    path: '/app/features/participation-candidat',
    title: 'Mes participations',
    icon: 'fas fa-clipboard-list',
    class: '',
    extralink: false,
    submenu: [],
    role: ['ROLE_CANDIDAT']
  },
  {
    path: '',
    title: 'Paramètrages',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: [],
    role: ['ROLE_ADMIN']
  },
  {
    path: '/app/settings/theme',
    title: 'Thèmes',
    icon: ' sl-icon-book-open',
    class: '',
    extralink: false,
    submenu: [],
    role: ['ROLE_ADMIN']
  },
];
