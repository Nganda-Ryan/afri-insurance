import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileInfoForm from "@/components/Profile/ProfileInfoForm";
import ProfilePasswordForm from "@/components/Profile/ProfilePasswordForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      passwordHash: true,
      isGuest: true,
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName ?? ""}`.trim()
    : (session.user.email?.split("@")[0] ?? "utilisateur");

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Mon profil
      </h3>

      <div className="space-y-6">
        {/* ── Carte avatar ── */}
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col items-center gap-5 xl:flex-row xl:justify-between">
            <div className="flex flex-col items-center gap-5 xl:flex-row">
              {/* Avatar initiale */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-50 dark:border-gray-700 dark:bg-orange-900/30 text-3xl font-bold text-orange-600 dark:text-orange-400 select-none">
                {initial}
              </div>

              <div className="text-center xl:text-left">
                <h4 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
                  {displayName}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
                    user.isGuest
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  }`}
                >
                  {user.isGuest ? "Invité" : "Membre"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="informations-personnelles" className="w-full">
          <TabsList className="h-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-800/60 w-full">
            <TabsTrigger
              value="informations-personnelles"
              className="w-1/2 px-6 py-1.5 rounded-lg font-medium text-gray-900 dark:text-white transition-all duration-200 data-[state=active]:bg-linear-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Informations
            </TabsTrigger>
            <TabsTrigger
              value="mot-de-passe"
              className="w-1/2 px-6 py-1.5 rounded-lg font-medium text-gray-900 dark:text-white transition-all duration-200 data-[state=active]:bg-linear-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Mot de passe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="informations-personnelles">
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="w-full">
                  <h4 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                    Informations personnelles
                  </h4>
                  <ProfileInfoForm
                    initialValues={{
                      email: user.email ?? "",
                      firstName: user.firstName ?? "",
                      lastName: user.lastName ?? "",
                      phone: user.phone ?? "",
                    }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mot-de-passe">
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="w-full">
                  <h4 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                    Mot de passe
                  </h4>
                  <ProfilePasswordForm hasPassword={!!user.passwordHash} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
