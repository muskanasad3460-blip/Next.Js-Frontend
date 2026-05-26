"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiX,
  FiCamera,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
} from "react-icons/fi";

import { getProfile, updateProfile } from "@/src/lib/api";

export default function ProfileCard() {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    async function load() {
      const res = await getProfile();

      setUser(res.user);

      setForm({
        name: res.user?.name || "",
        email: res.user?.email || "",
        phone: res.user?.phone || "",
        bio: res.user?.bio || "",
      });
    }

    load();
  }, []);

  const handleSave = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("bio", form.bio);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await updateProfile(formData);

      if (res.success) {
        setUser(res.user);

        // UPDATE CHECKOUT DATA
        const existingData = JSON.parse(
          localStorage.getItem("checkoutData") || "{}"
        );

        localStorage.setItem(
          "checkoutData",
          JSON.stringify({
            ...existingData,
            firstName: res.user?.name || "",
            phone: res.user?.phone || "",
            email: res.user?.email || "",
          })
        );

        setOpenProfileModal(false);
        setAvatarFile(null);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <>
      {/* CARD */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        {/* LEFT */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* IMAGE */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden relative border border-gray-200">
              <Image
                src={
                  user?.avatar
                    ? `http://localhost:5000${user.avatar}?t=${Date.now()}`
                    : "/c1.jpg"
                }
                alt="profile"
                fill
                className="object-cover"
              />
            </div>

            {/* CAMERA */}
            <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700 transition">
              <FiCamera className="text-[13px]" />

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setAvatarFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          {/* USER INFO */}
          <div className="flex-1">
            {/* NAME */}
            <h2 className="text-[24px] md:text-[28px] font-semibold text-[#111827] leading-tight">
              {user?.name || "Loading..."}
            </h2>

            {/* SUBTEXT */}
            {/* NAME DETAILS (FIRST + LAST NAME) */}
            {/* NAME DETAILS (FIXED LAYOUT) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-7 mt-4 w-fit">
              {/* FIRST NAME */}
              <div>
                <p className="text-[13px] text-[#6B7280] mb-1">First Name</p>

                <div className="flex items-center gap-2">
                  {/* <FiUser className="text-[#374151] text-[14px] shrink-0" /> */}

                  <p className="text-[15px] font-semibold text-[#111827] leading-tight">
                    {user?.name || "N/A"}
                  </p>
                </div>
              </div>

              {/* LAST NAME */}
              <div>
                <p className="text-[13px] text-[#6B7280] mb-1">Last Name</p>

                <div className="flex items-center gap-2">
                  {/* <FiUser className="text-[#374151] text-[14px] shrink-0" /> */}

                  <p className="text-[15px] font-semibold text-[#111827] leading-tight">
                    {user?.lastName || "Ali"}
                  </p>
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mt-8">
              {/* EMAIL */}
              <div className="min-w-0">
                <p className="text-[13px] text-[#6B7280] mb-1">Email address</p>

                <div className="flex items-start gap-2">
                  <FiMail className="text-[#374151] text-[15px] mt-1 shrink-0" />

                  <p className="text-[15px] font-semibold text-[#111827] break-all leading-5">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="min-w-0">
                <p className="text-[13px] text-[#6B7280] mb-1">Phone</p>

                <div className="flex items-center gap-2">
                  <FiPhone className="text-[#374151] text-[15px] shrink-0" />

                  <p className="text-[15px] font-semibold text-[#111827] leading-5">
                    {user?.phone || "No phone"}
                  </p>
                </div>
              </div>

              {/* BIO */}
              <div className="min-w-0">
                <p className="text-[13px] text-[#6B7280] mb-1">Bio</p>

                <p className="text-[15px] font-semibold text-[#111827] leading-5">
                  {user?.bio || "Team Manager"}
                </p>
              </div>

              {/* LOCATION */}
              <div className="min-w-0">
                <p className="text-[13px] text-[#6B7280] mb-1">Location</p>

                <div className="flex items-center gap-2">
                  <FiMapPin className="text-[#374151] text-[15px] shrink-0" />

                  <p className="text-[15px] font-semibold text-[#111827] leading-5">
                    Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EDIT BUTTON */}
        <button
          onClick={() => setOpenProfileModal(true)}
          className="h-[48px] px-6 rounded-[14px] border border-[#D1D5DB] text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition shrink-0"
        >
          <FiEdit2 className="text-[15px]" />
          Edit
        </button>
      </div>
      {/* </div> */}

      {/* MODAL */}
      {openProfileModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="bg-white w-full max-w-2xl rounded-[28px] p-6 md:p-8 relative shadow-2xl">
            {/* CLOSE */}
            <button
              onClick={() => setOpenProfileModal(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              <FiX className="text-lg" />
            </button>

            {/* TITLE */}
            <h2 className="text-[15px] font-semibold text-[#111827] mb-6">
              Edit Profile
            </h2>

            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* NAME */}
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full Name"
                className="w-full h-[52px] px-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              />

              {/* EMAIL */}
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email Address"
                className="w-full h-[52px] px-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              />

              {/* PHONE */}
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone Number"
                className="w-full h-[52px] px-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              />

              {/* BIO */}
              <input
                type="text"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Profession / Bio"
                className="w-full h-[52px] px-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
              />

              {/* ABOUT */}
              <textarea
                rows={4}
                placeholder="About yourself..."
                className="md:col-span-2 w-full p-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px] resize-none"
              />
            </div>

            {/* SAVE */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="mt-6 w-full h-[52px] rounded-[16px] bg-blue-600 hover:bg-blue-700 text-white text-[16px] font-medium transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
