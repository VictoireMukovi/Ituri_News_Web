// Mock data for Ituri News platform

import { Domain, Author, Post, User, Comment } from '../types';

export const mockDomains: Domain[] = [
  { id: '1', name: 'Sport', slug: 'sport', color: 'emerald' },
  { id: '2', name: 'Politique', slug: 'politique', color: 'rose' },
  { id: '3', name: 'Éducation', slug: 'education', color: 'indigo' },
  { id: '4', name: 'Culture', slug: 'culture', color: 'purple' },
  { id: '5', name: 'Économie', slug: 'economie', color: 'amber' },
  { id: '6', name: 'Divers', slug: 'divers', color: 'slate' },
];

export const mockAuthors: Author[] = [
  {
    id: 'a1',
    fullName: 'Jane K. Mateso',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Journaliste sportive passionnée',
    email: 'jane.mateso@example.com'
  },
  {
    id: 'a2',
    fullName: 'David K. Irumva',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Correspondant politique senior',
    email: 'david.irumva@example.com'
  },
  {
    id: 'a3',
    fullName: 'Marie L. Nkusi',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Spécialiste en éducation et société',
    email: 'marie.nkusi@example.com'
  },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    slug: 'derby-de-bunia-tension',
    title: 'Derby de Bunia: un final sous haute tension',
    coverImageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop',
    domain: mockDomains[0],
    htmlContent: `
      <p>Le derby tant attendu entre les Lions de Bunia et l'AS Mahagi s'est terminé dans une atmosphère électrique hier soir au stade municipal.</p>
      
      <p>Après 90 minutes de jeu intense, les équipes se sont quittées sur un score de parité (2-2), mais c'est surtout la fin de match qui a marqué les esprits.</p>
      
      <h3>Un match équilibré</h3>
      <p>Les deux équipes se sont rendues coup pour coup pendant toute la rencontre. Les Lions ont ouvert le score à la 23e minute par l'intermédiaire de leur attaquant vedette Mukama, avant que Mahagi n'égalise juste avant la pause.</p>
      
      <p>La seconde période a été tout aussi disputée, avec un second but de chaque côté dans les 20 dernières minutes.</p>
      
      <h3>Incidents en fin de match</h3>
      <p>C'est dans les arrêts de jeu que la tension a atteint son paroxysme. Un contact litigieux dans la surface a provoqué les protestations des joueurs et du public, forçant l'arbitre à interrompre momentanément la partie.</p>
      
      <p>Heureusement, le calme est rapidement revenu grâce à l'intervention des capitaines des deux équipes.</p>
    `,
    excerpt: 'Le derby tant attendu entre les Lions de Bunia et l\'AS Mahagi s\'est terminé dans une atmosphère électrique hier soir au stade municipal...',
    author: mockAuthors[0],
    createdAt: '2025-01-10T15:30:00Z',
    status: 'published',
    viewCount: 1247,
    commentCount: 8,
    comments: [
      {
        id: 'c1',
        postId: 'p1',
        author: {
          name: 'Marc Kabila',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        content: 'Quel match ! J\'étais au stade et l\'ambiance était électrique du début à la fin.',
        createdAt: '2025-01-10T16:45:00Z',
      },
      {
        id: 'c2',
        postId: 'p1',
        author: {
          name: 'Sarah Uwimana',
          avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        },
        content: 'Les deux équipes ont montré un très bon niveau. Vivement le match retour !',
        createdAt: '2025-01-10T17:20:00Z',
      },
      {
        id: 'c3',
        postId: 'p1',
        author: {
          name: 'Jean-Baptiste Mukundi'
        },
        content: 'L\'arbitrage était discutable sur plusieurs phases. Mais bon match quand même.',
        createdAt: '2025-01-10T18:10:00Z',
      }
    ]
  },
  {
    id: 'p2',
    slug: 'nouveau-gouverneur-ituri',
    title: 'Nouveau gouverneur de l\'Ituri: les enjeux d\'un mandat crucial',
    coverImageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=400&fit=crop',
    domain: mockDomains[1],
    htmlContent: `
      <p>L'installation du nouveau gouverneur de la province de l'Ituri marque le début d'une nouvelle ère politique dans la région.</p>
      
      <p>Lors de sa cérémonie d'investiture, le gouverneur a présenté ses priorités pour les prochaines années, mettant l'accent sur la sécurité, le développement économique et la cohésion sociale.</p>
      
      <h3>Défis sécuritaires</h3>
      <p>La question sécuritaire reste au cœur des préoccupations. Le nouveau gouverneur a annoncé la mise en place d'un plan d'action renforcé en collaboration avec les forces de sécurité.</p>
      
      <h3>Développement économique</h3>
      <p>Sur le plan économique, plusieurs projets d'infrastructure sont prévus, notamment dans les secteurs de l'agriculture et des mines.</p>
      
      <p>Un accent particulier sera mis sur l'amélioration des voies de communication pour faciliter les échanges commerciaux.</p>
    `,
    excerpt: 'L\'installation du nouveau gouverneur de la province de l\'Ituri marque le début d\'une nouvelle ère politique dans la région...',
    author: mockAuthors[1],
    createdAt: '2025-01-09T08:15:00Z',
    status: 'published',
    viewCount: 892,
    commentCount: 5,
    comments: [
      {
        id: 'c4',
        postId: 'p2',
        author: {
          name: 'Amina Kalonda',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        content: 'Espérons que ce nouveau mandat apportera vraiment les changements attendus par la population.',
        createdAt: '2025-01-09T10:30:00Z',
      },
      {
        id: 'c5',
        postId: 'p2',
        author: {
          name: 'Paul Bintu'
        },
        content: 'Les promesses sont belles, maintenant il faut les actes concrets.',
        createdAt: '2025-01-09T14:15:00Z',
      }
    ]
  },
  {
    id: 'p3',
    slug: 'rentree-scolaire-defis',
    title: 'Rentrée scolaire 2025: entre espoirs et défis persistants',
    coverImageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop',
    domain: mockDomains[2],
    htmlContent: `
      <p>La rentrée scolaire 2025 dans la province de l'Ituri s'annonce sous de meilleurs auspices, malgré les défis qui persistent dans le secteur éducatif.</p>
      
      <h3>Améliorations notables</h3>
      <p>Cette année, plusieurs écoles ont bénéficié de rénovations importantes. De nouveaux manuels scolaires ont également été distribués dans la plupart des établissements.</p>
      
      <p>Le recrutement d'enseignants supplémentaires a permis de réduire significativement le nombre d'élèves par classe dans certaines zones.</p>
      
      <h3>Défis persistants</h3>
      <p>Cependant, des défis importants demeurent. L'accès à l'éducation reste difficile dans les zones rurales, et le problème des frais scolaires continue d'être un obstacle pour de nombreuses familles.</p>
      
      <p>Les autorités éducatives travaillent sur des solutions pour rendre l'école plus accessible à tous les enfants de la province.</p>
    `,
    excerpt: 'La rentrée scolaire 2025 dans la province de l\'Ituri s\'annonce sous de meilleurs auspices, malgré les défis qui persistent...',
    author: mockAuthors[2],
    createdAt: '2025-01-08T12:00:00Z',
    status: 'published',
    viewCount: 634,
    commentCount: 12,
    comments: [
      {
        id: 'c6',
        postId: 'p3',
        author: {
          name: 'Esperance Mukamana',
          avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        },
        content: 'En tant qu\'enseignante, je confirme les améliorations mais il reste encore beaucoup à faire.',
        createdAt: '2025-01-08T13:45:00Z',
      },
      {
        id: 'c7',
        postId: 'p3',
        author: {
          name: 'Robert Kasongo'
        },
        content: 'Mes enfants ont enfin reçu des livres neufs cette année. C\'est un bon début.',
        createdAt: '2025-01-08T15:20:00Z',
      },
      {
        id: 'c8',
        postId: 'p3',
        author: {
          name: 'Divine Mwangi'
        },
        content: 'Le problème des frais scolaires reste majeur pour les familles modestes comme la nôtre.',
        createdAt: '2025-01-08T16:10:00Z',
      }
    ]
  },
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    email: 'jane.mateso@example.com',
    name: 'Jane K. Mateso',
    role: 'journalist',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    googleId: 'google123'
  },
  {
    id: 'u2',
    email: 'david.irumva@example.com',
    name: 'David K. Irumva',
    role: 'journalist',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    googleId: 'google456'
  },
  {
    id: 'u3',
    email: 'marie.nkusi@example.com',
    name: 'Marie L. Nkusi',
    role: 'superadmin',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    googleId: 'google789'
  },
  {
    id: 'u4',
    email: 'reader@example.com',
    name: 'Pierre Lecteur',
    role: 'reader',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    googleId: 'google000'
  },
];