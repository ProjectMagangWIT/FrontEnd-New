import { useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import Button from "../../button/button";
import { BiSearch } from "react-icons/bi";
import { useRef } from "react";
export default function TabelDataUsageHistoryById(inventoryData) {
  console.log(inventoryData);

  return (
    <div className="flex flex-col h-full bg-white">
      <div
        className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
        style={{
          height: "65vh",
          width: "100%",
          scrollSnapType: "x mandatory",
        }}
      >
        <div>
          <table className="w-full">
            <thead className="bg-slate-200">
              <tr className="2xl:text-lg py-3 border">
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  No
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Nama/Nomor Induk Lama
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Nomor Induk/Nama
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Tanggal
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Ruangan Lama
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Ruangan Baru
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  kode Aset
                </th>
              </tr>
            </thead>
            <tbody className="">
              {Object.keys(inventoryData).map((key, index) => {
                const data = inventoryData[key];
                console.log(data?.nomorIndukNew);
                return (
                  <tr
                    key={key}
                    className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 px-1">{data?.nomorIndukOld || "-"}</td>
                    <td className="py-2 px-1">{data?.nomorIndukNew || "-"}</td>
                    <td className="py-2 px-1">
                      {data?.tanggalPemakaian || "-"}
                    </td>
                    <td className="py-2 px-1">{data?.ruanganOld || "-"}</td>
                    <td className="py-2 px-1">{data?.ruanganNew || "-"}</td>
                    <td className="py-2 px-1">{data?.inventoryId || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
