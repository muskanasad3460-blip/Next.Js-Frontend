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
} from "react-icons/fi";

import toast from "react-hot-toast";

import { getProfile, updateProfile } from "@/src/lib/User";

export default function ProfileCard() {
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<any>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  // =========================
  // LOAD PROFILE
  // =========================
  useEffect(() => {
    async function load() {
      try {
        const res = await getProfile();

        if (res.success) {
          setUser(res.user);

          setForm({
            name: res.user?.name || "",
            email: res.user?.email || "",
            phone: res.user?.phone || "",
            bio: res.user?.bio || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load profile");
      }
    }

    load();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // REMOVE ERROR WHEN USER TYPES
    setErrors((prev: any) => ({
      ...prev,
      [field]: "",
    }));
  };

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSave = async () => {
    setLoading(true);

    setErrors({});

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

      // VALIDATION ERRORS
      if (!res.success && res.errors) {
        const newErrors: any = {};

        res.errors.forEach((err: any) => {
          newErrors[err.path] = err.msg;
        });

        setErrors(newErrors);

        toast.error("Please fix the form errors");

        setLoading(false);

        return;
      }

      // SUCCESSxa
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

        toast.success("Profile updated successfully");

        setOpenProfileModal(false);

        setAvatarFile(null);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
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
              <img
                src={
                  user?.avatar
                    ? `${process.env.NEXT_PUBLIC_API_URL}${
                        user.avatar
                      }?t=${Date.now()}`
                    : "/c1.jpg"
                }
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
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

            {/* NAME DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-7 mt-4 w-fit">
              {/* FIRST NAME */}
              <div>
                <p className="text-[13px] text-[#6B7280] mb-1">First Name</p>

                <p className="text-[15px] font-semibold text-[#111827] leading-tight">
                  {user?.name || "N/A"}
                </p>
              </div>

              {/* LAST NAME */}
              <div>
                <p className="text-[13px] text-[#6B7280] mb-1">Last Name</p>

                <p className="text-[15px] font-semibold text-[#111827] leading-tight">
                  {user?.lastName || "Ali"}
                </p>
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
            <h2 className="text-[18px] font-semibold text-[#111827] mb-6">
              Edit Profile
            </h2>

            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* NAME */}
              <div>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Full Name"
                  className={`w-full h-[52px] px-4 rounded-[16px] border outline-none focus:ring-2 text-[15px]
                  ${
                    errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-[#E5E7EB] focus:ring-blue-500"
                  }`}
                />

                {errors.name && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Email Address"
                  className={`w-full h-[52px] px-4 rounded-[16px] border outline-none focus:ring-2 text-[15px]
                  ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-[#E5E7EB] focus:ring-blue-500"
                  }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PHONE */}
              <div>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Phone Number"
                  className={`w-full h-[52px] px-4 rounded-[16px] border outline-none focus:ring-2 text-[15px]
                  ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-200"
                      : "border-[#E5E7EB] focus:ring-blue-500"
                  }`}
                />

                {errors.phone && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* BIO */}
              <div>
                <input
                  type="text"
                  value={form.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  placeholder="Profession / Bio"
                  className={`w-full h-[52px] px-4 rounded-[16px] border outline-none focus:ring-2 text-[15px]
                  ${
                    errors.bio
                      ? "border-red-500 focus:ring-red-200"
                      : "border-[#E5E7EB] focus:ring-blue-500"
                  }`}
                />

                {errors.bio && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.bio}</p>
                )}
              </div>

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
              className="mt-6 w-full h-[52px] rounded-[16px] bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-[16px] font-medium transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
