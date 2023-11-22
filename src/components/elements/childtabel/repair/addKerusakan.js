"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import SelectInput from "@/components/form/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import LabelComp from "../../label/label";
export default function TambahKerusakan() {
  const [modal, setModal] = useState(false);
  const [repairData, setRepairData] = useState([]);
  const [inventory, setInventory] = useState(0);
  const [karyawanData, setKaryawanData] = useState([]);
  // const [karyawanId, setKaryawanId] = useState(0);
  const [tanggalKerusakan, setTanggalKerusakan] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  // const [tanggalPerbaikan, setTanggalPerbaikan] = useState(null);
  // const [biaya, setBiaya] = useState(0);
  // const [tanggalSelesaiPerbaikan, setTanggalSelesaiPerbaikan] = useState(null);
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);

  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:9000/api/kerusakan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        inventoryId: inventory,
        tanggalKerusakan: tanggalKerusakan,
        deskripsi: deskripsi,
        // karyawanId: karyawanId,
        // tanggalPerbaikan: tanggalPerbaikan,
        // biaya: biaya,
        // tanggalSelesaiPerbaikan: tanggalSelesaiPerbaikan,
      }),
    });
    setLoading(false);
    if (response.ok) {
      setModal(false);
      MySwal.fire("Berhasil menambahkan!", "Klik tombol!", "success").then(
        () => {
          router.refresh();
        }
      );
    } else {
      MySwal.fire("Gagal menambahkan", "Klik tombol!", "error");
    }
  }

  const fetchRepair = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/inventory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      console.log(response);

      const data = await response.json();
      setRepairData(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRepair();
  }, []);

  return (
    <div className="">
      <Button
        className="text-[12px] 2xl:text-[16px] px-4 rounded-[5px] p-1 hover:text-blue-700 border hover:bg-white border-blue-700 text-white bg-blue-700"
        type="submit"
        onClick={handleChange}
      >
        Add kerusakan
      </Button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white">
          <h1 className="font-bold text-[16px] text-black mb-3">
            Tambah Kerusakan
          </h1>
          <form onSubmit={handleSubmit} method="POST">
            <div className="mb-2">
              <SelectInput
                id="inventory"
                name="number"
                onChange={(e) => setInventory(e.target.value)}
                label="Nama Inventory"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="">Pilih Inventory</option>
                {repairData.map(
                  (repair) => (
                    console.log(repair),
                    (<option value={repair.id}>{repair.kodeAsset}</option>)
                  )
                )}
              </SelectInput>
            </div>
            <div className="mb-2">
              <FormComp
                id="tanggalKerusakan"
                type="date"
                onChange={(e) => setTanggalKerusakan(e.target.value)}
                placeholder="Masukan tanggal kerusakan"
                required
              >
                Tanggal Kerusakan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="deskripsi"
                type="text"
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Masukan deskripsi"
                required
              >
                Deskripsi
              </FormComp>
            </div>
            {/* <div className="mb-2">
              <SelectInput
                id="karyawan"
                name="number"
                onChange={(e) => setKaryawanId(e.target.value)}
                label="Pemakai Terakhir"
                className="px-[16px] py-1 w-full bg-white text-sm text-gray-700 border rounded-md focus:none outline-none"
              >
                <option value="">Pilih Pemakai</option>
                {repairData.map(
                  (repair) => (
                    console.log(repair),
                    (<option value={repair.id}>{repair.kodeAsset}</option>)
                  )
                )}
              </SelectInput>
            </div> */}
            {/* <div className="mb-2">
              <FormComp
                id="tanggalPerbaikan"
                type="date"
                onChange={(e) => setTanggalPerbaikan(e.target.value)}
                placeholder="Masukan tanggal perbaikan"
                required
              >
                Tanggal Perbaikan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="biaya"
                type="number"
                onChange={(e) => setBiaya(e.target.value)}
                placeholder="Masukan biaya"
                required
              >
                Biaya
              </FormComp>
            </div>
            <div className="mb-2">
              <div className="flex justify-center items-center">
                <LabelComp
                  htmlFor="tanggalSelesai"
                  className="text-gray-600 w-48 text-sm"
                >
                  Tanggal Selesai
                </LabelComp>
                <input
                  id="tanggaSelesaiPerbaikan"
                  className="px-[20px] py-1 w-full text-sm text-gray-700 border rounded-md focus:none outline-none bg-white"
                  type="date"
                  onChange={(e) => setTanggalSelesaiPerbaikan(e.target.value)}
                  placeholder="Masukan tanggal selesai"
                />
              </div>
            </div> */}
            <div className=" modal-action flex mt-4">
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                  type="submit"
                >
                  Add
                </Button>
              ) : (
                <div className=" w-[10%] bg-green-500 px-4 p-2 rounded-md flex justify-center">
                  <span className="loading loading-spinner text-neutral">
                    Add
                  </span>
                </div>
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
