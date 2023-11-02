"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function TambahInventory() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [karyawanId, setKaryawanId] = useState(0);
  const [nama, setNama] = useState("");
  const [kodeAset, setKodeAset] = useState("");
  const [merk, setMerk] = useState("");
  const [vendor, setVendor] = useState("");
  const [tanggalPembelian, setTanggalPembelian] = useState(null);
  const [harga, setHarga] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [masaManfaat, setMasaManfaat] = useState(0);
  const [idKategori, setIdKategori] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const [idRuangan, setIdRuangan] = useState(0);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  function handleChange(e) {
    setModal(!modal);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("gambar", selectedImage);
    formData.append("kodeAsset", kodeAset);
    formData.append("nama", nama);
    formData.append("merk", merk);
    formData.append("masaManfaat", masaManfaat);
    formData.append("tanggalPembelian", tanggalPembelian);
    formData.append("harga", harga);
    formData.append("vendor", vendor);
    formData.append("deskripsi", deskripsi);
    formData.append("kategoriId", idKategori);
    formData.append("karyawanId", karyawanId);
    formData.append("ruanganId", idRuangan);
    try {
      const response = await fetch("http://localhost:9000/api/inventory", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });
      setLoading(false);
      if (response.ok) {
        setModal(false);
        MySwal.fire("Berhasil menambahkan!", "Klik tombol!", "success").then(
          () => {
            router.push("/inventory");
          }
        );
      } else {
        MySwal.fire("Gagal menambahkan", "Klik tombol!", "error");
      }
    } catch (error) {
      console.error("Terjadi kesalahan dalam permintaan: " + error.message);
    }
  };
  return (
    <div className="">
      <Button
        className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
        type="submit"
        onClick={handleChange}
      >
        Add Data Inventory
      </Button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[60rem] px-11 bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Tambah Data Inventory
          </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            method="POST"
          >
            <div className="mb-4 flex justify-center w-28 h-24 bg-slate-200 rounded-md border-dashed border-2 border-gray-400">
              <div className="relative w-full h-full">
                {imagePreview ? (
                  <div>
                    <Image
                      src={imagePreview}
                      alt="preview"
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      className="absolute top-0 text-[8px] right-0 text-black rounded-sm bg-gray-300 p-1"
                      onClick={() => {
                        setImagePreview(null);
                        document.getElementById("imageInput").value = ""; // Clear the file input
                      }}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-full text-center text-gray-600">
                    <label
                      htmlFor="imageInput"
                      className="cursor-pointer text-[12px]"
                    >
                      <div>Drag & Drop or</div>
                      <div>Click to Choose Image</div>
                    </label>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="imageInput"
                className="hidden"
                onChange={(e) => onImageUpload(e)}
                ref={imageInputRef}
              />
            </div>
            <div className="flex flex-row gap-[55px]">
              <div>
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
                  <FormComp
                    id="kodeAsset"
                    type="text"
                    onChange={(e) => setKodeAset(e.target.value)}
                    placeholder="Masukan Kode Aset"
                  >
                    Kode Aset
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="merk"
                    type="text"
                    onChange={(e) => setMerk(e.target.value)}
                    placeholder="Masukan merk"
                  >
                    Merk
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="tanggalPembelian"
                    type="date"
                    onChange={(e) => setTanggalPembelian(e.target.value)}
                    placeholder="Masukan tanggal"
                  >
                    Tanggal Pembelian
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="harga"
                    type="number"
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Masukan harga"
                  >
                    Harga
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="KaryawanId"
                    type="number"
                    onChange={(e) => setKaryawanId(e.target.value)}
                    placeholder="Masukan nomor induk"
                  >
                    ID Karyawan
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="deskripsi"
                    type="text"
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Masukkan deskripsi"
                  >
                    Deskripsi
                  </FormComp>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <FormComp
                    id="vendor"
                    type="text"
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder="Masukan vendor"
                  >
                    Vendor
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="masaManfaat"
                    type="number"
                    onChange={(e) => setMasaManfaat(e.target.value)}
                    placeholder="Masukan masa manfaat"
                  >
                    Masa Manfaat
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="idKategori"
                    type="number"
                    onChange={(e) => setIdKategori(e.target.value)}
                    placeholder="Masukan id kategori"
                  >
                    ID Kategori
                  </FormComp>
                </div>
                <div className="mb-2">
                  <FormComp
                    id="idRuangan"
                    type="number"
                    onChange={(e) => setIdRuangan(e.target.value)}
                    placeholder="Masukan id ruangan"
                  >
                    ID Ruangan
                  </FormComp>
                </div>
              </div>
            </div>
            <div className=" modal-action flex mt-4">
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                  type="submit"
                >
                  Add
                </Button>
              ) : (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-6 text-blue text-sm px-4 py-1 hover:bg-green-700 loading btn-primary"
                  type="button"
                >
                  Add...
                </Button>
              )}
              <Button
                className=" text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
                onClick={handleChange}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
