import { NextRequest, NextResponse } from 'next/server'

// Routes autorisées par rôle
// const routeRoles: Record<string, string[]> = {
//   'STUDENT': ['/dashboard/student', '/dashboard/settings', '/dashboard/profile', '/dashboard/images', '/dashboard/feedback', '/dashboard/student/requests'],
//   'TEACHER': ['/dashboard/teacher', '/dashboard/support', '/dashboard/settings', '/dashboard/profile', '/dashboard/images', '/dashboard/requests'],
//   'ADMIN_SUPER': ['/dashboard/admin', '/dashboard/settings', '/dashboard/profile', '/dashboard/images', '/feedback-system', '/dashboard/admin/vacancy'],
//   'ADMIN_ACADEMIC': ['/dashboard/admin', '/dashboard/settings', '/dashboard/profile', '/dashboard/images', '/dashboard/feedback-system'],
//   'FINANCE': ['/dashboard/admin', '/dashboard/settings', '/dashboard/profile', '/dashboard/images', '/dashboard/admin/payment-management', '/dashboard/admin/payment-setup', '/dashboard/admin/expenses-tracking', '/dashboard/admin/teacher-hours'],
//   'ADMIN_HR': ['/dashboard/admin', '/dashboard/admin/vacancy', '/dashboard/admin/recrutement', '/dashboard/admin/teacher-hours', '/dashboard/admin/users', '/dashboard/admin/payment-setup', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
  

//   'DEPT_HEAD': ['/dashboard/admin', '/dashboard/admin/teachers', '/dashboard/admin/feedback-system', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
//   'STAFF': ['/dashboard/admin', '/dashboard/admin/vacancy', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
//   'FINANCIAL_AGENT': ['/dashboard/admin', '/dashboard/admin/payment-management', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
//   'FINANCIAL_MANAGER': ['/dashboard/admin', '/dashboard/admin/payment-management', '/dashboard/admin/payment-setup', '/dashboard/admin/expenses-tracking', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
//   'ATTENDANCE_ADMIN': ['/dashboard/admin', '/dashboard/admin/absences', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
//   'TIMESHEET_ADMIN': ['/dashboard/admin', '/dashboard/admin/teacher-hours', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
//   'GRADES_MANAGER': ['/dashboard/admin', '/dashboard/admin/grade-management', '/dashboard/admin/compilation', '/dashboard/admin/grade-publishment', '/dashboard/admin/exam-planning', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
//   'GRADES_AGENT': ['/dashboard/admin', '/dashboard/admin/grade-management', '/dashboard/settings', '/dashboard/admin/compilation', '/dashboard/profile', '/dashboard/images'],
//   'ACADEMIC_AGENT': ['/dashboard/admin', '/dashboard/admin/students', '/dashboard/admin/programs', '/dashboard/admin/planification', '/dashboard/admin/classroom', '/dashboard/admin/absences', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
//   'STUDENT_APPLICATION_MANAGER': ['/dashboard/admin', '/dashboard/admin/students', '/dashboard/admin/enrollment', '/dashboard/admin/annual-enrollment', '/dashboard/settings', '/dashboard/profile', '/dashboard/images'],
// };

// const publicRoutes = [
//   '/signin',
//   '/about',
//   '/actualites',
//   '/admission-request',
//   '/admissions',
//   '/contacts',
//   '/faq',
//   '/formations',
//   '/recrutement',
//   '/not-found',
//   '/unauthorized',
//   '/reset-password',
//   '/privacy'
// ];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Vérification des routes publiques (root inclus)
  // const isPublic = publicRoutes.some(publicPath => path.startsWith(publicPath)) || path === '/';
  // if (isPublic) {
  //   return NextResponse.next();
  // }

  // try {
  //   // 🔒 Lire et décrypter le cookie
  //   const cookie = (await cookies()).get('session')?.value;
  //   const session = await decrypt(cookie);

  //   // ⛔️ Pas de session
  //   if (!session) {
  //     return NextResponse.redirect(new URL('/signin', req.nextUrl));
  //   }

  //   // 🔐 Vérification des autorisations
  //   const userRoles: string[] = Array.isArray(session.roles) ? session.roles : [session.roles];

  //   // Agréger toutes les routes autorisées pour tous les rôles de l’utilisateur
  //   const userRoutes = userRoles.flatMap(role => routeRoles[role] || []);

  //   // Vérifier si l’utilisateur peut accéder à la route actuelle
  //   const isAuthorized = userRoutes.some(route => path.startsWith(route));

  //   if (!isAuthorized) {
  //     return NextResponse.redirect(new URL('/unauthorized', req.nextUrl));
  //   }

  //   return NextResponse.next();

  // } catch (error) {
  //   console.error('💥 Middleware error:', error);
  //   return NextResponse.redirect(new URL('/signin', req.nextUrl));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclut: api, _next/static, _next/image, favicon.ico et fichiers statiques
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|images).*)',
  ],
};
