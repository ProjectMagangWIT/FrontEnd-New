"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TambahKaryawan() {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nomorInduk, setNomorInduk] = useState("");
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [divisi, setDivisi] = useState("");
  const [alamat, setAlamat] = useState("");
  const router = useRouter();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(
      "https://functional-zinc-production.up.railway.app/api/karyawan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomorInduk: nomorInduk,
          nama: nama,
          gender: gender,
          email: email,
          telepon: telepon,
          jabatan: jabatan,
          divisi: divisi,
          alamat: alamat,
          gambar: selectedImage,
        }),
      }
    );
    setNomorInduk("");
    setNama("");
    setGender("");
    setJabatan("");
    setDivisi("");
    setEmail("");
    setTelepon("");
    setAlamat("");
    setSelectedImage(null);
    router.refresh();
    setModal(false);
  }
  return (
    <div className="">
      <Button
        className="text-[12px] px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
        type="submit"
        onClick={handleChange}
      >
        Add Data Karyawan
      </Button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Tambah Data Karyawan
          </h1>
          <form>
            <div className="mb-4 flex flex-row">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
              {/* Gambar yang ditampilkan ketika diunggah */}
              {selectedImage && (
                <Image
                  src=""
                  alt="Selected Image"
                  className="w-[50px] h-[50px]"
                  width={50}
                  height={50}
                />
              )}
            </div>
            <div className="mb-2">
              <FormComp
                id="nomorInduk"
                type="text"
                onChange={(e) => setNomorInduk(e.target.value)}
                placeholder="Masukan no induk"
              >
                No Induk
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="nama"
                type="text"
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukan nama"
              >
                Nama
              </FormComp>
            </div>
            <div className="mb-2">
              <SelectInput
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="">Pilih salah satu</option>
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </SelectInput>
            </div>
            <div className="mb-2">
              <FormComp
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukan Email"
              >
                Email
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="telepon"
                type="number"
                onChange={(e) => setTelepon(e.target.value)}
                placeholder="Masukan no telepon"
              >
                Telepon
              </FormComp>
            </div>
            <div className="mb-2">
              <SelectInput
                id="jabatan"
                name="jabatan"
                onChange={(e) => setJabatan(e.target.value)}
                label="Jabatan"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="">Pilih salah satu</option>
                <option value="manager">Manager</option>
                <option value="crm">CRM</option>
              </SelectInput>
            </div>
            <div className="mb-2">
              <SelectInput
                id="divisi"
                name="divisi"
                onChange={(e) => setDivisi(e.target.value)}
                label="Divisi"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="">Pilih salah satu</option>
                <option value="Marketing">Marketing</option>
                <option value="FrontEnd">FrontEnd</option>
                <option value="BackEnd">BackEnd</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Sistem Analis">System Analyst</option>
              </SelectInput>
            </div>
            <div className="mb-2">
              <FormComp
                id="alamat"
                type="text"
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Masukan alamat"
              >
                Alamat
              </FormComp>
            </div>
            <div className=" modal-action flex mt-4">
              <Button
                className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                type="submit"
              >
                Add
              </Button>
              <Button
                className=" text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
                onClick={handleChange}
              >
                Discard
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
