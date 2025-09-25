// verification model
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function VerificationModal({ isOpen, onClose, onSubmit, action }) {
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onSubmit(notes);
    setNotes(""); // Reset for next use
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">{action} Report</DialogTitle>
          <DialogDescription>
            {action === "verify"
              ? "Add optional notes before marking this report as verified."
              : "Please provide a reason for rejecting this report."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
              placeholder={
                action === "reject"
                  ? "e.g., Duplicate report, insufficient evidence, not a hazard..."
                  : "e.g., Confirmed by local authorities, team dispatched..."
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className={
              action === "verify"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }
          >
            Confirm {action}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}