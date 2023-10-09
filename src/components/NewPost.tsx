"use client";
import { AuthUser } from "@/model/user";
import Image from "next/image";
import React, { useState } from "react";
import Button from "./ui/Button";
import FilesIcon from "./ui/icons/FilesIcon";
import UserAvatar from "./UserAvatar";

type Props = {
  user: AuthUser;
};
export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      <UserAvatar username={username} image={image ?? ""} />
      <form className="w-full flex flex-col mt-2">
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>이미지를 드래그 하거나 클릭해서 추가하세요</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border border-neutral-300"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder="텍스트를 입력하세요."
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
