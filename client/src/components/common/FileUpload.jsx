import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Upload } from "lucide-react";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      setFileURL(URL.createObjectURL(file));
    } else {
      setFileURL(null);
    }
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="file-upload">Documents for Verification</Label>
      <div className="relative border border-gray-300 rounded-lg p-3 flex items-center gap-2 bg-white">
        <Upload className="text-gray-500" />
        <input
          id="file-upload"
          type="file"
          accept="application/pdf,image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload").click()}
        >
          {selectedFile ? selectedFile.name : "Choose File"}
        </Button>
      </div>
      {fileURL && (
        <div className="mt-2 border rounded-lg overflow-hidden">
          <iframe
            src={fileURL}
            className="w-full h-64"
            title="PDF Preview"
          ></iframe>
        </div>
      )}
    </div>
  );
}
