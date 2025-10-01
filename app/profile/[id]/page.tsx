"use client";

import { useFetchClientV1 } from "@/hooks/useFetchClientV1";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { id } = useParams() as { id: string };
  const {
    data: profile,
    loading,
    error,
    setData,
  } = useFetchClientV1("/v1/profiles/{id}", { params: { id } });

  const router = useRouter();

  // form states
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");

  // Initialize form values when profile loads
  useEffect(() => {
    if (profile) {
      setBio(profile.bio || "");
      setInterests(profile.interests?.join(", ") || "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;
    try {
      const res = await fetch(`/api/v1/profiles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bio,
          interests: interests.split(",").map((s) => s.trim()),
        }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const json = await res.json();
      setData(json.data);
      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.message);
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
            <div className="relative w-24 h-24 rounded-full border-2 border-[#FF6A00] overflow-hidden">
              <Image
                src={profile.avatarUrl}
                width={96}
                height={96}
                alt="Avatar"
                className="rounded-full"
                unoptimized
              />
            </div>
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
