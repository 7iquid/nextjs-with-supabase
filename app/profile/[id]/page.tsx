"use client";

import { useParams } from "next/navigation";
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
        const data: Profile = await res.json();
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
      const updated = await res.json();
      setProfile(updated);
      alert("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!profile) return <p className="text-center mt-10">No profile found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-orange-600">Travejor</h1>
      </header>

      {/* Profile Info */}
      <div className="flex flex-col items-center mb-6">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
            <span className="text-gray-600">No Avatar</span>
          </div>
        )}
        <h2 className="text-xl font-semibold">{profile.username}</h2>
        <p className="text-gray-500">{profile.location}</p>
      </div>

      {/* Bio */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Bio</h3>
        <p className="text-gray-700">{profile.bio}</p>
      </div>

      {/* Interests */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {profile.interests?.map((interest, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Edit Form */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-3">Edit Profile</h3>
        <label className="block mb-2">
          <span className="text-sm font-medium">Bio</span>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm font-medium">
            Interests (comma separated)
          </span>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <button
          onClick={handleSave}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
