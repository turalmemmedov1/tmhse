"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false, loading: () => <p className="text-xs text-gray-500">Yüklənir...</p> });

interface QuillInputProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function QuillInput({ name, defaultValue = "", placeholder }: QuillInputProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="bg-background rounded-lg border border-dark-bg/10 overflow-hidden text-sm">
      <input type="hidden" name={name} value={value} />
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue} 
        modules={modules}
        placeholder={placeholder}
        className="min-h-[200px]"
      />
    </div>
  );
}
