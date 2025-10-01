import Link from "next/link";
import type { paths } from "@/types/api";
import Image from "next/image";

type Profile = paths["/v1/profiles"] extends {
  get: { responses: { 200: { content: { "application/json": infer T } } } };
}
  ? T
  : never;

export default function ProfileCard({ profile }: { profile: Profile[number] }) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-6 flex flex-col hover:shadow-xl hover:border-[#FF6A00] transition">
      <div className="flex items-center mb-4">
        {profile.avatarUrl ? (
          <Image
            src={profile.avatarUrl || "/default-avatar.png"}
            alt={profile.username}
            width={56} // 14 * 4px tailwind spacing
            height={56}
            className="rounded-full border-2 border-[#FF6A00] object-cover"
            unoptimized
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
        {(profile.interests ?? []).map((interest, idx) => (
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
  );
}
