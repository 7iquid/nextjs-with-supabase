"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Profile {
  id: string;
  username: string;
  location: string;
  bio: string;
  interests: string[];
  avatarUrl?: string;
}

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("/api/profiles");
        if (!res.ok) throw new Error("Failed to fetch profiles");
        const data = await res.json();

        setProfiles(Array.isArray(data) ? data : data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-300">Loading profiles...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-400 mt-10">{error}</p>;
  }

  return (
    <main className="min-h-screen w-full bg-black text-gray-200 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#FF6A00]">
        Traveler Profiles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {profiles.map((profile, index) => (
          <div
            key={`profile-${profile.id}-${index}`} // unique profile card key
            className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-6 flex flex-col hover:shadow-xl hover:border-[#FF6A00] transition"
          >
            <div className="flex items-center mb-4">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.username}
                  className="w-14 h-14 rounded-full border-2 border-[#FF6A00] object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400 border border-[#FF6A00]">
                  N/A
                </div>
              )}
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-white">
                  {profile.username}
                </h2>
                <p className="text-sm text-gray-400">{profile.location}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-3">{profile.bio}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {profile.interests.map((interest, idx) => (
                <span
                  key={`profile-${profile.id}-interest-${idx}`}
                  className="px-2 py-1 text-xs rounded-full bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/30"
                >
                  {interest}
                </span>
              ))}
            </div>

            <div className="mt-auto">
              <Link
                href={`/profile/${profile.id}`}
                className="inline-block w-full text-center px-4 py-2 rounded-lg bg-[#FF6A00] text-black font-medium hover:bg-[#e65c00] transition"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
