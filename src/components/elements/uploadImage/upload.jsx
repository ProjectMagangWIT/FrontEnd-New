import Image from "next/image";
export default function Upload({ img, ...rest }) {
  return (
    <div>
      {img && (
        <Image
          className="preview"
          src={img}
          alt="preview"
          width={50}
          height={50}
        />
      )}
      <input type="file" {...rest} />
    </div>
  );
}
