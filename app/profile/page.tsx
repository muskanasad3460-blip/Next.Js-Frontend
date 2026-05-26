"use client";

import AddressCard from "@/components/profile/AddressCard";
import ProfileCard from "@/components/profile/ProfileCard";

export default function ProfilePage() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen p-4 md:p-6">
      {/* OUTER CONTAINER */}
      <div className="border border-[#E5E7EB] rounded-[28px] bg-white p-6 md:p-10 min-h-[85vh]">
        {/* PAGE TITLE */}
        <h1 className="text-[22px] md:text-[26px] font-semibold text-[#111827] mb-8">
          Profile
        </h1>

        {/* PROFILE SECTION */}
        <div className="border border-[#E5E7EB] rounded-[24px] p-5 md:p-7">
          <ProfileCard />
        </div>

        {/* ADDRESS SECTION */}
        <div className="border border-[#E5E7EB] rounded-[24px] p-5 md:p-7 mt-6">
          <AddressCard />
        </div>
      </div>
    </div>
  );
}
