"use client";
import Button from "@/components/elements/button/button";
import FormComp from "@/components/form/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UpdateRoom(room) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kodeRuangan, setKodeRuangan] = useState(room.kode);
  const [namaRuangan, setNamaRuangan] = useState(room.nama);
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  console.log(namaRuangan);
  console.log(kodeRuangan);
  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `http://localhost:9000/api/ruangan/${room.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          kode: kodeRuangan,
          nama: namaRuangan,
        }),
      }
    );
    console.log(response);
    setLoading(false);
    if (response.ok) {
      setModal(false);
      MySwal.fire("Updated!", "Klik tombol!", "success").then(() => {
        router.refresh();
      });
    } else {
      MySwal.fire("Update Gagal", "Klik tombol!", "error");
    }
  }
  return (
    <div className="">
      <Link className="text-[#10A760]" href="" onClick={handleChange}>
        <PiPencilSimpleLineFill />
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white">
          <h1 className="font-bold text-lg text-black mb-3">
            Edit Ruangan {room.nama}
          </h1>
          <div>
            <div className="mb-2">
              <FormComp
                id="kodeRuangan"
                type="text"
                onChange={(e) => setKodeRuangan(e.target.value)}
                placeholder={room.kode}
                value={kodeRuangan}
              >
                Kode Ruangan
              </FormComp>
            </div>
            <div className="mb-2">
              <FormComp
                id="namaRuangan"
                type="text"
                onChange={(e) => setNamaRuangan(e.target.value)}
                placeholder={room.nama}
                value={namaRuangan}
              >
                Nama Ruangan
              </FormComp>
            </div>
            <div className=" modal-action flex mt-4">
              {!loading ? (
                <Button
                  className="bg-blue-600 rounded-[5px] mx-6 text-white text-sm px-4 py-1 hover:bg-green-700"
                  onClick={handleUpdate}
                >
                  Add
                </Button>
              ) : (
                <div className=" w-[10%] bg-green-500  p-2 rounded-md flex justify-center">
                  <span className="loading loading-spinner text-neutral"></span>
                </div>
              )}
              <Button
                className=" text-black rounded-[5px] text-sm shadow-lg px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
                onClick={handleChange}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
