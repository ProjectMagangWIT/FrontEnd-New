import { useState, useEffect, useRef } from "react";
import { CgMoreO } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import Button from "../../button/button";
import ReactToPrint from "react-to-print";
import UpdateRoom from "../../childtabel/room/updateRoom";
import DeleteRoom from "../../childtabel/room/deleteRoom";

export default function TabelDataRoom({ modal }) {
  const [roomData, setRoomData] = useState([]);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(10);
  const [searchParam, setSearchParam] = useState("nama");

  const screenSizes = {
    "2xl": 15,
    md: 10,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRoom(currentPage, searchQuery, searchParam); // Gunakan searchQuery
  };

  useEffect(() => {
    fetchRoom(currentPage, searchQuery, searchParam);
  }, [currentPage, searchQuery, searchParam]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.matchMedia("(min-width: 1536px)").matches
        ? "2xl"
        : "md";

      setScreenSize(newSize);

      // Setel ukuran yang sesuai
      if (screenSizes[newSize]) {
        setPageSize(screenSizes[newSize]);
      }
    };

    // Panggil handleResize saat komponen dimuat
    handleResize();

    // Tambahkan event listener untuk memantau perubahan ukuran layar
    window.addEventListener("resize", handleResize);

    // Hapus event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fetchRoom = async (page, query = "", param) => {
    try {
      const url = query
        ? `http://localhost:9000/api/ruangan/search?${param}=${query}`
        : `http://localhost:9000/api/ruangan?page=${page}&size=${pageSize}`;
      const response = await fetch(url, {
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
      setRoomData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoom(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 pt-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="md:flex md:gap-2 md:space-y-0 space-y-2">
          {modal}
          <ReactToPrint
            trigger={() => (
              <Button
                className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
                href="#"
                type="submit"
              >
                Download All
              </Button>
            )}
            content={() => componentRef.current} // Gunakan componentRef.current
            documentTitle="Data"
            pageStyle="print"
          />
        </div>
        <form
          className="hidden md:flex border bg-white rounded-[5px] shadow-md py-1 px-3 items-center"
          role="search"
          onSubmit={handleSearch}
        >
          <button className="mr-2">
            <BiSearch className="w-4 h-4 2xl:w-6 2xl:h-6 text-gray-400" />
          </button>
          <input
            className="text-[12px] 2xl:text-lg outline-none bg-white"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            className="px-[16px] py-1 w-full bg-white text-[12px] text-gray-700 focus:none outline-none"
          >
            <option value="nama">Nama</option>
            <option value="kode">Kode Ruangan</option>
          </select>
        </form>
      </div>
      <div
        ref={componentRef}
        className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
        style={{
          height: "100%",
          width: "100%",
          scrollSnapType: "x mandatory",
        }}
      >
        <div>
          <table className="w-full">
            <thead className=" bg-slate-200 border border-gray-300">
              <tr className="text-[12px] 2xl:text-lg py-3">
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  ID Ruangan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Kode Ruangan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Nama Ruangan
                </th>
                <th className="px-2 py-3 text-[12px] 2xl:text-lg text-gray-800 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {roomData.data && roomData.data.length > 0 ? (
                roomData.data.map((room, index) => (
                  <tr
                    key={index}
                    className="text-center border  text-[12px] text-black border-gray-300"
                  >
                    <td className="py-2 px-1">{index + 1}</td>
                    <td className="py-2 px-1">{room.kode}</td>
                    <td className="py-2 px-1">{room.nama}</td>
                    <td className="py-2">
                      <div className="flex justify-center gap-2">
                        <div className="flex items-center justify-center">
                          <UpdateRoom {...room} />
                        </div>
                        <div className="flex items-center justify-center">
                          <DeleteRoom id={room.id} nama={room.nama} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="join bg-white">
        <button
          className="join-item bg-transparent hover:bg-blue-700 hover:text-white p-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          «
        </button>
        <button className="join-item bg-transparent text-[12px] p-2">
          Page {currentPage + 1}
        </button>
        <button
          className="join-item bg-transparent hover:bg-blue-700 hover:text-white p-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === roomData.totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
