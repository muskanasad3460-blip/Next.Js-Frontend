// "use client";

// import { useEffect, useState } from "react";
// import {
//   FiEdit2,
//   FiX,
//   FiMapPin,
//   FiGlobe,
//   FiHome,
//   FiCreditCard,
// } from "react-icons/fi";

// import { getAddress, updateAddress } from "@/src/lib/api";

// export default function AddressCard() {
//   const [open, setOpen] = useState(false);

//   const [address, setAddress] = useState<any>(null);

//   const [form, setForm] = useState({
//     country: "",
//     city: "",
//     postalCode: "",
//     taxId: "",
//   });

//   useEffect(() => {
//     async function load() {
//       const res = await getAddress();

//       if (res.address) {
//         setAddress(res.address);

//         setForm({
//           country: res.address.country || "",
//           city: res.address.city || "",
//           postalCode: res.address.postalCode || "",
//           taxId: res.address.taxId || "",
//         });
//       }
//     }

//     load();
//   }, []);

//   const handleSave = async () => {
//     const res = await updateAddress(form);

//     if (res.success) {
//       setAddress(res.address);
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* ADDRESS CARD */}
//       {/* HEADER */}
//       <div className="flex items-start justify-between mb-15">
//         <h2 className="text-[25px] font-semibold text-[#111827]">Address</h2>

//         {/* EDIT BUTTON */}
//         <button
//           onClick={() => setOpen(true)}
//           className="h-[48px] px-6 rounded-[14px] border border-[#D1D5DB] text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition shrink-0"
//         >
//           <FiEdit2 className="text-[15px]" />
//           Edit
//         </button>
//       </div>

//       {/* ADDRESS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
//         {/* COUNTRY */}
//         <div className="min-w-0">
//           <p className="text-[13px] text-[#6B7280] mb-1">Country</p>

//           <div className="flex items-center gap-2">
//             <FiGlobe className="text-[#374151] text-[15px] shrink-0" />

//             <p className="text-[15px] font-semibold text-[#111827] leading-5">
//               {address?.country || "—"}
//             </p>
//           </div>
//         </div>

//         {/* CITY */}
//         <div className="min-w-0">
//           <p className="text-[13px] text-[#6B7280] mb-1">City/State</p>

//           <div className="flex items-center gap-2">
//             <FiMapPin className="text-[#374151] text-[15px] shrink-0" />

//             <p className="text-[15px] font-semibold text-[#111827] leading-5">
//               {address?.city || "—"}
//             </p>
//           </div>
//         </div>

//         {/* POSTAL CODE */}
//         <div className="min-w-0">
//           <p className="text-[13px] text-[#6B7280] mb-1">Postal Code</p>

//           <div className="flex items-center gap-2">
//             <FiHome className="text-[#374151] text-[15px] shrink-0" />

//             <p className="text-[15px] font-semibold text-[#111827] leading-5">
//               {address?.postalCode || "—"}
//             </p>
//           </div>
//         </div>

//         {/* TAX ID */}
//         <div className="min-w-0">
//           <p className="text-[13px] text-[#6B7280] mb-1">TAX ID</p>

//           <div className="flex items-center gap-2">
//             <FiCreditCard className="text-[#374151] text-[15px] shrink-0" />

//             <p className="text-[15px] font-semibold text-[#111827] leading-5">
//               {address?.taxId || "—"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {open && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-5">
//           <div className="bg-white w-full max-w-2xl rounded-[28px] p-6 md:p-8 relative shadow-2xl">
//             {/* CLOSE */}
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
//             >
//               <FiX className="text-lg" />
//             </button>

//             {/* TITLE */}
//             <h2 className="text-[15px] font-semibold text-[#111827] mb-6">
//               Edit Address
//             </h2>

//             {/* FORM */}
//             <div className="grid md:grid-cols-2 gap-4">
//               {/* COUNTRY */}
//               <input
//                 value={form.country}
//                 onChange={(e) => setForm({ ...form, country: e.target.value })}
//                 placeholder="Country"
//                 className="w-full h-[52px] px-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
//               />

//               {/* CITY */}
//               <input
//                 value={form.city}
//                 onChange={(e) => setForm({ ...form, city: e.target.value })}
//                 placeholder="City"
//                 className="w-full h-[52px] px-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
//               />

//               {/* POSTAL CODE */}
//               <input
//                 value={form.postalCode}
//                 onChange={(e) =>
//                   setForm({ ...form, postalCode: e.target.value })
//                 }
//                 placeholder="Postal Code"
//                 className="w-full h-[52px] px-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
//               />

//               {/* TAX ID */}
//               <input
//                 value={form.taxId}
//                 onChange={(e) => setForm({ ...form, taxId: e.target.value })}
//                 placeholder="Tax ID"
//                 className="w-full h-[52px] px-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
//               />
//             </div>

//             {/* SAVE BUTTON */}
//             <button
//               onClick={handleSave}
//               className="mt-6 w-full h-[52px] rounded-[16px] bg-blue-600 hover:bg-blue-700 text-white text-[16px] font-medium transition"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiX,
  FiMapPin,
  FiGlobe,
  FiHome,
  FiCreditCard,
} from "react-icons/fi";

import toast from "react-hot-toast";

import { getAddress, updateAddress } from "@/src/lib/api";

export default function AddressCard() {
  const [open, setOpen] = useState(false);

  const [address, setAddress] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const [form, setForm] = useState({
    country: "",
    city: "",
    postalCode: "",
    taxId: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await getAddress();

        if (res.address) {
          setAddress(res.address);

          setForm({
            country: res.address.country || "",
            city: res.address.city || "",
            postalCode: res.address.postalCode || "",
            taxId: res.address.taxId || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load address");
      }
    }

    load();
  }, []);

  // HANDLE INPUT
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [field]: "",
    }));
  };

  // SAVE ADDRESS
  const handleSave = async () => {
    setLoading(true);
    setErrors({});

    try {
      const res = await updateAddress(form);

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

      // SUCCESS
      if (res.success) {
        setAddress(res.address);

        toast.success("Address updated successfully");

        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-start justify-between mb-15">
        <h2 className="text-[25px] font-semibold text-[#111827]">Address</h2>

        {/* EDIT BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="h-[48px] px-6 rounded-[14px] border border-[#D1D5DB] text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition shrink-0"
        >
          <FiEdit2 className="text-[15px]" />
          Edit
        </button>
      </div>

      {/* ADDRESS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
        {/* COUNTRY */}
        <div className="min-w-0">
          <p className="text-[13px] text-[#6B7280] mb-1">Country</p>

          <div className="flex items-center gap-2">
            <FiGlobe className="text-[#374151] text-[15px] shrink-0" />

            <p className="text-[15px] font-semibold text-[#111827] leading-5">
              {address?.country || "—"}
            </p>
          </div>
        </div>

        {/* CITY */}
        <div className="min-w-0">
          <p className="text-[13px] text-[#6B7280] mb-1">City/State</p>

          <div className="flex items-center gap-2">
            <FiMapPin className="text-[#374151] text-[15px] shrink-0" />

            <p className="text-[15px] font-semibold text-[#111827] leading-5">
              {address?.city || "—"}
            </p>
          </div>
        </div>

        {/* POSTAL CODE */}
        <div className="min-w-0">
          <p className="text-[13px] text-[#6B7280] mb-1">Postal Code</p>

          <div className="flex items-center gap-2">
            <FiHome className="text-[#374151] text-[15px] shrink-0" />

            <p className="text-[15px] font-semibold text-[#111827] leading-5">
              {address?.postalCode || "—"}
            </p>
          </div>
        </div>

        {/* TAX ID */}
        <div className="min-w-0">
          <p className="text-[13px] text-[#6B7280] mb-1">TAX ID</p>

          <div className="flex items-center gap-2">
            <FiCreditCard className="text-[#374151] text-[15px] shrink-0" />

            <p className="text-[15px] font-semibold text-[#111827] leading-5">
              {address?.taxId || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="bg-white w-full max-w-2xl rounded-[28px] p-6 md:p-8 relative shadow-2xl">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              <FiX className="text-lg" />
            </button>

            {/* TITLE */}
            <h2 className="text-[20px] font-semibold text-[#111827] mb-6">
              Edit Address
            </h2>

            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* COUNTRY */}
              <div>
                <input
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  placeholder="Country"
                  className={`w-full h-[52px] px-4 rounded-[16px] border outline-none focus:ring-2 text-[15px]
                  ${
                    errors.country
                      ? "border-red-500 focus:ring-red-200"
                      : "border-[#E5E7EB] focus:ring-blue-500"
                  }`}
                />

                {errors.country && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors.country}
                  </p>
                )}
              </div>

              {/* CITY */}
              <div>
                <input
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="City"
                  className={`w-full h-[52px] px-4 rounded-[16px] border outline-none focus:ring-2 text-[15px]
                  ${
                    errors.city
                      ? "border-red-500 focus:ring-red-200"
                      : "border-[#E5E7EB] focus:ring-blue-500"
                  }`}
                />

                {errors.city && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.city}</p>
                )}
              </div>

              {/* POSTAL CODE */}
              <div>
                <input
                  value={form.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  placeholder="Postal Code"
                  className={`w-full h-[52px] px-4 rounded-[16px] border outline-none focus:ring-2 text-[15px]
                  ${
                    errors.postalCode
                      ? "border-red-500 focus:ring-red-200"
                      : "border-[#E5E7EB] focus:ring-blue-500"
                  }`}
                />

                {errors.postalCode && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors.postalCode}
                  </p>
                )}
              </div>

              {/* TAX ID */}
              <div>
                <input
                  value={form.taxId}
                  onChange={(e) => handleChange("taxId", e.target.value)}
                  placeholder="Tax ID"
                  className="w-full h-[52px] px-4 rounded-[16px] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                />

                {errors.taxId && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors.taxId}
                  </p>
                )}
              </div>
            </div>

            {/* SAVE BUTTON */}
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
