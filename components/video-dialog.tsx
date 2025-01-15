"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

export function VideoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="accent" className="h-12 px-6 mt-8">
          View Full Walkthrough Video <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl p-0 bg-transparent border-0">
        <div className="w-full mx-auto">
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundImage: 'url("/background-min.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <video
              src="/landing-page-assets/tutorial-generation-gif-2025-01-15.mp4"
              controls
              autoPlay
              className="w-full h-full rounded-xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}