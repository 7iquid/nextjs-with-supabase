"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Profile {
  id: string;
  username: string;
  email: string;
  bio: string;
  interests: string[];
  location: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form states
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/profiles/${id}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const json = await res.json();

        const data: Profile = json.data;
        setProfile(data);
        setBio(data.bio || "");
        setInterests(data.interests?.join(", ") || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleSave = async () => {
    if (!profile) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/profiles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bio,
          interests: interests.split(",").map((s) => s.trim()),
        }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const json = await res.json();

      const updated: Profile = json.data;
      setProfile(updated);
      alert("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-300">Loading...</p>;
  if (error) return <p className="text-center text-red-400 mt-10">{error}</p>;
  if (!profile)
    return <p className="text-center mt-10 text-gray-400">No profile found.</p>;

  return (
    <div className="min-h-screen bg-black text-gray-200 px-4 py-8">
      {/* Header */}
      <header className="mb-8 text-center relative">
        <h1 className="text-3xl font-bold text-[#FF6A00]">Travejor</h1>

        {/* Back / Close button */}
        <button
          onClick={() => router.back()}
          className="absolute left-0 top-0 text-gray-400 hover:text-white px-3 py-2"
        >
          ← Back
        </button>
      </header>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt="avatar"
              className="w-24 h-24 rounded-full border-2 border-[#FF6A00] object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-sm text-gray-400 border border-[#FF6A00]">
              No Avatar
            </div>
          )}
          <h2 className="mt-4 text-2xl font-semibold text-white">
            {profile.username}
          </h2>
          <p className="text-gray-400">{profile.location}</p>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-white">Bio</h3>
          <p className="text-gray-300">{profile.bio}</p>
        </div>

        {/* Interests */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-white">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests?.map((interest, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/40 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Edit Form */}
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Edit Profile
          </h3>

          <label className="block mb-4">
            <span className="text-sm font-medium">Bio</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full mt-1 p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:border-[#FF6A00]"
            />
          </label>

          <label className="block mb-6">
            <span className="text-sm font-medium">
              Interests (comma separated)
            </span>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full mt-1 p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:border-[#FF6A00]"
            />
          </label>

          <button
            onClick={handleSave}
            className="w-full bg-[#FF6A00] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#e65c00] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
