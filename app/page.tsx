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
        const res = await fetch("/api/profiles"); // rewrites will map this
        if (!res.ok) throw new Error("Failed to fetch profiles");
        const data = await res.json();
        setProfiles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading profiles...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">
        Traveler Profiles
      </h1>

      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Avatar</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Bio</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.data.map((profile) => (
              <tr key={profile.id} className="border-t">
                <td className="px-4 py-2">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                      N/A
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 font-medium">{profile.username}</td>
                <td className="px-4 py-2">{profile.location}</td>
                <td className="px-4 py-2 max-w-xs truncate">{profile.bio}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/profile/${profile.id}`}
                    className="text-orange-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
