import { useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import Button from "../../button/button";
import { BiSearch } from "react-icons/bi";
import { useRef } from "react";
export default function TabelDataRepairHistoryById(inventoryData) {
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
              <tr className="2xl:text-[16px] py-3 border">
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  No
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Kode Aset
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Tanggal Perbaikan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Biaya
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Tanggal Selesai Diperbaiki
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Yang Memperbaiki
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-[16px] text-gray-800 text-center">
                  Tempat Perbaikan
                </th>
              </tr>
            </thead>
            <tbody className="">
              {Object.keys(inventoryData).map((key, index) => {
                const data = inventoryData[key];
                console.log(data?.inventoryId.kodeAsset);
                return (
                  <tr
                    key={key}
                    className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 px-1">
                      {data?.inventoryId.kodeAsset || "-"}
                    </td>
                    <td className="py-2 px-1">
                      {data?.tanggalPerbaikan || "-"}
                    </td>
                    <td className="py-2 px-1">Rp. {data?.biaya || "-"}</td>
                    <td className="py-2 px-1">
                      {data.tanggalSelesaiPerbaikan || "-"}
                    </td>
                    <td className="py-2 px-1">{data?.nama || "-"}</td>
                    <td className="py-2 px-1">{data.tempat || "-"}</td>
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
