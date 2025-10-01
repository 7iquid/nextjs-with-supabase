import { EmptyCard, ProfileCard } from "@/components/cards";
import { fetchSSRV1 } from "@/utils/fetchSSRV1";

export default async function Home() {
  const profiles = await fetchSSRV1("/v1/profiles");

  return (
    <main className="min-h-screen w-full bg-black text-gray-200 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#FF6A00]">
        Traveler Profiles
      </h1>

      {profiles && profiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={`profile-${profile.id}-${index}`}
              profile={profile}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <EmptyCard />
        </div>
      )}
    </main>
  );
}
