import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@app/ui/components/dialog";
import { Button } from "@app/components/ui/Button";
import Qrcode from "qrcode";
import Image from "next/image";
import generatePDF from "react-to-pdf";

import { useEffect, useRef, useState } from "react";
import type { Info } from "@app/hooks/api/user/useTickets";
import { format } from "date-fns";
import { useAuth } from "@app/hooks";
import { useReactToPrint } from "react-to-print";

type IModal = {
  isOpen: boolean;
  onClose: () => void;
  data: Info | undefined;
};

export const TicketModal = ({ isOpen, onClose, data }: IModal) => {
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState("");
  const { user } = useAuth();

  const generateQRCode = async () => {
    try {
      const dataText = data?.id || "test";
      const dataUrl = await Qrcode.toDataURL(dataText);
      setQRCodeDataUrl(dataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const componentRef = useRef<HTMLImageElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    generateQRCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[450px] h-[600px]">
        <DialogHeader>
          <DialogDescription className="mt-3" />
          <div
            ref={componentRef}
            className="border border-gray-400 rounded p-4 h-full"
          >
            <div className="flex items-center mb-4 rounded h-[100px]">
              <div className="w-1/2 pl-4">
                <p className="text-lg font-bold">{data?.name}</p>
                <p className="text-sm">
                  {data && format(new Date(data.eventDate), "dd/MM/yyyy")}
                </p>
                <p className="text-sm">VENUE: {data?.location} </p>
              </div>
            </div>

            <div className="w-full h-1/2 bg-gray-100 rounded mb-4">
              <div className="flex items-center h-full">
                <div className="w-1/2">
                  {qrCodeDataUrl && (
                    <Image
                      src={qrCodeDataUrl}
                      alt="QR Code"
                      height={400}
                      width={400}
                    />
                  )}
                </div>

                <div className="w-1/2 pl-4">
                  <p className="text-sm">ATTENDEE</p>
                  <p className="text-sm">{user?.display_name}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-2 mt-6">
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1 rounded-sm "
            >
              Print
            </Button>
            <Button
              onClick={() =>
                generatePDF(componentRef, { filename: "ticket.pdf" })
              }
              className="flex-1"
            >
              Download
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
